import { useEffect, useState } from "react";
import { PhrAssets } from "../../assets/PHR/assets";
import axios from "axios";

const MedicationAndreminders = ({ showFields,recordIdKey,recordId,fetchDataUrl,saveUrl,editUrl,deleteUrl}) => {
  const [data, setData] = useState([]);
  const [openReminders, setOpenReminders] = useState(false);
  const id = 10;
  const [formData, setFormData] = useState({
    prescribedMedicationsId: 0,
    [recordIdKey]: recordId,
    prescribedBy: "",
    nameofDrug: "",
    frequency: "",
    medicationType: "",
    pharmacy: "",
    dosage: "",
    strength: "",
    startDate: "",
    endDate: "",
    duration: "",
    remindOnSms: true,
    remindOnEmail: true,
    voiceRemainder: true,
    recStatus: "",
    reminderId: 0,
    userId: id,
    morning: "",
    afternoon: "",
    evening: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const HandleEdit = async (prescribedMedicationsId) => {
    try {
      const response = await axios.get(`${editUrl}=${prescribedMedicationsId}&userId=${id}`);


      console.log(response?.data?.data);

      if (response?.data?.status) {
        const fetchedData = response?.data?.data;

        // Check if morning, afternoon, or evening has any value
        const hasReminders = fetchedData.morning || fetchedData.afternoon || fetchedData.evening;

        console.log("hasreminders...", hasReminders);

        if (hasReminders) {
          setOpenReminders(true);
        }

        // Update form data
        setFormData(fetchedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleDelete = async (prescribedMedicationsId) => {
    try {
      const deleteResponse = await axios.post(`${deleteUrl}=${prescribedMedicationsId}&userId=${id}`);
   console.log('bloodsugar',deleteResponse?.data?.success)
      if (deleteResponse?.data?.success) {
        const fetchResponse = await axios.get(`${fetchDataUrl}?userId=${id}&${recordIdKey}=${recordId}`);
        console.log('fetch response...',fetchResponse)
        setData(fetchResponse?.data?.data || []);
        setFormData({
            prescribedMedicationsId: 0,
            [recordIdKey]: recordId,
            prescribedBy: "",
            nameofDrug: "",
            frequency: "",
            medicationType: "",
            pharmacy: "",
            dosage: "",
            strength: "",
            startDate: "",
            endDate: "",
            duration: "",
            remindOnSms: true,
            remindOnEmail: true,
            voiceRemainder: true,
            recStatus: "",
            reminderId: 0,
            userId: id,
            morning: "",
            afternoon: "",
            evening: "",
          });
      }
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };

  const handleCheckboxChange = (timeSlot, period) => {
    setFormData((prevState) => {
      const currentPeriod = prevState[period];
      let updatedPeriod;

      if (currentPeriod.includes(timeSlot)) {
        updatedPeriod = currentPeriod.replace(timeSlot, "").replace(/^,|,$/g, "");
      } else {
        updatedPeriod = currentPeriod ? `${currentPeriod},${timeSlot}` : timeSlot; // Add timeSlot, with a comma if there is already data
      }

      return { ...prevState, [period]: updatedPeriod };
    });
  };
  const SubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(saveUrl, formData);

      if (response?.data?.status) {
        setFormData({
            prescribedMedicationsId: 0,
            [recordIdKey]: recordId,
            prescribedBy: "",
            nameofDrug: "",
            frequency: "",
            medicationType: "",
            pharmacy: "",
            dosage: "",
            strength: "",
            startDate: "",
            endDate: "",
            duration: "",
            remindOnSms: true,
            remindOnEmail: true,
            voiceRemainder: true,
            recStatus: "",
            reminderId: 0,
            userId: id,
            morning: "",
            afternoon: "",
            evening: "",
          });

        const fetchResponse = await axios.get(`${fetchDataUrl}?userId=${id}&${recordIdKey}=${recordId}`);

        setData(fetchResponse?.data?.data || []);
      } else {
        console.error("Error: Unexpected API response", response?.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save medication. Please try again.");
    }
  };
  // Run this effect whenever bloodid changes

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${fetchDataUrl}?userId=${id}&${recordIdKey}=${recordId}`);
      console.log("getmedical", response?.data?.data);
      setData(response?.data?.data || []);
    };
    getData();
  }, []);

  fetchDataUrl

  const toggleOpenReminders = () => {
    setOpenReminders((prevState) => !prevState);
  };

  return (
    <>
      {showFields && (
        <div>
          <h2 className="font-semibold text-lg">Medications And Reminders</h2>
          {data.length > 0 && (
            <div className="rounded-lg overflow-hidden border  mt-4 w-full">
              <table className="w-full">
                <thead className="bg-[#BDBDBD] border-b border-[#BDBDBD]">
                  <tr>
                    <th className="font-semibold py-2 px-4 text-left border-r border-[#BDBDBD]">Prescribed by</th>
                    <th className="font-semibold py-2 px-4 text-left border-r border-[#BDBDBD]">Name of Drug</th>
                    <th className="font-semibold py-2 px-4 text-left border-r border-[#BDBDBD]">Frequency</th>
                    <th className="font-semibold py-2 px-4 text-left">Start and End date</th>
                    <th className="font-semibold py-2 px-4 text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr className="border-b">
                      <td className="py-2 px-4 border-r border-b">{item.prescribedBy}</td>
                      <td className="py-2 px-4 border-r border-b">{item.nameofDrug}</td>
                      <td className="py-2 px-4 border-r border-b">{item.frequency}</td>
                      <td className="py-2 px-4">{item.startDate && item.endDate ? `${item.startDate} - ${item.endDate}` : ""}</td>
                      <td className="px-4 py-4 text-base text-gray-900 border-b">
                        <div className="flex gap-4 items-center">
                          <button onClick={() => HandleEdit(item.prescribedMedicationsId)}>
                            <img src={PhrAssets.Edit} alt="Edit" />
                          </button>
                          <button onClick={() => HandleDelete(item.prescribedMedicationsId)} className="flex gap-1 items-center text-[#1C9401] font-semibold">
                            <img src={PhrAssets.Delete} alt="Delete" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="border  border-b  border-gray-100 my-12"></p>

          <div className="bg-[#F9FAFB] p-5 rounded-md">
            <div>
              <form onSubmit={SubmitHandler}>
                <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <label>Prescribed By</label>
                    <input
                      type="text"
                      value={formData.prescribedBy}
                      name="prescribedBy"
                      onChange={handleChange}
                      placeholder="Enter Prescribed By"
                      className="border border-gray-300 p-2 rounded-md focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>Name of Drug</label>
                    <input
                      type="text"
                      value={formData.nameofDrug}
                      name="nameofDrug"
                      onChange={handleChange}
                      placeholder="Enter name of drug"
                      className="border border-gray-300 p-2 rounded-md focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>Dosage</label>
                    <input type="text" value={formData.dosage} name="dosage" onChange={handleChange} placeholder="Enter Dosage" className="border border-gray-300 p-2 rounded-md focus:outline-none" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>Strength</label>
                    <input
                      type="text"
                      value={formData.strength}
                      name="strength"
                      onChange={handleChange}
                      placeholder="Enter Strength"
                      className="border border-gray-300 p-2 rounded-md focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>Frequency</label>
                    <input
                      type="text"
                      value={formData.frequency}
                      name="frequency"
                      onChange={handleChange}
                      placeholder="Enter frequency"
                      className="border border-gray-300 p-2 rounded-md focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>Medication Type</label>
                    <input
                      type="text"
                      value={formData.medicationType}
                      name="medicationType"
                      onChange={handleChange}
                      placeholder="Enter Medication type"
                      className="border border-gray-300 p-2 rounded-md focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>Start Date</label>
                    <input type="date" value={formData.startDate} name="startDate" onChange={handleChange} className="border border-gray-300 p-2 rounded-md focus:outline-none" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label>End Date</label>
                    <input type="date" value={formData.endDate} name="endDate" onChange={handleChange} className="border border-gray-300 p-2 rounded-md focus:outline-none" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="duration">Duration(Days)</label>
                    <input type="text" value={formData.duration} name="duration" onChange={handleChange} className="border border-gray-300 p-2 rounded-md focus:outline-none" />
                  </div>
                </div>
                <div className="flex flex-col my-3">
                  <button type="button" className="my-2 flex gap-2 text-[#007183] font-semibold" onClick={toggleOpenReminders}>
                    <img src={PhrAssets.AddReminders} alt="" />
                    Add Reminders
                  </button>
                  <div className="w-full flex flex-col items-start gap-4">
                    {openReminders && (
                      <div>
                        <div className="flex gap-6 bg-[#F9FAFB] border rounded-md py-3 px-4 my-3 w-full">
                          <img src={PhrAssets.AMicon} alt="" />
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5">
                            <div className="bg-white border border-gray-200 rounded-md flex items-center gap-2 py-2 px-3">
                              <input type="checkbox" checked={formData.morning.includes("10:00 AM")} onChange={() => handleCheckboxChange("10:00 AM", "morning")} />
                              <label>10:00 AM</label>
                            </div>

                            <div className="bg-white py-2 px-3 border border-gray-200 rounded-md flex items-center gap-2">
                              <input type="checkbox" checked={formData.morning.includes("10:30 AM")} onChange={() => handleCheckboxChange("10:30 AM", "morning")} />
                              <label>10:30 AM</label>
                            </div>

                            <div className="bg-white py-2 px-4 border border-gray-200 rounded-md flex items-center gap-2">
                              <input type="checkbox" checked={formData.morning.includes("11:00 AM")} onChange={() => handleCheckboxChange("11:00 AM", "morning")} />
                              <label>11:00 AM</label>
                            </div>

                            <div className="bg-white py-2 px-4 border border-gray-200 rounded-md flex items-center gap-2">
                              <input type="checkbox" checked={formData.morning.includes("11:30 AM")} onChange={() => handleCheckboxChange("11:30 AM", "morning")} />
                              <label>11:30 AM</label>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-6 bg-[#F9FAFB] border rounded-md py-3 px-4 my-3 w-full">
                          <img src={PhrAssets.Afternoon} alt="" />
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                            <div className="bg-white border border-gray-200 rounded-md flex items-center gap-2 py-2 px-3">
                              <input type="checkbox" checked={formData.afternoon.includes("12:00 PM")} onChange={() => handleCheckboxChange("12:00 PM", "afternoon")} />
                              <label>12:00 PM</label>
                            </div>

                            <div className="bg-white py-2 px-3 border border-gray-200 rounded-md flex items-center gap-2">
                              <input type="checkbox" checked={formData.afternoon.includes("01:30 PM")} onChange={() => handleCheckboxChange("01:30 PM", "afternoon")} />
                              <label>01:30 PM</label>
                            </div>

                            <div className="bg-white py-2 px-3 border border-gray-200 rounded-md flex items-center gap-2">
                              <input type="checkbox" checked={formData.afternoon.includes("02:00 PM")} onChange={() => handleCheckboxChange("02:00 PM", "afternoon")} />
                              <label>02:00 PM</label>
                            </div>

                            <div className="bg-white py-2 px-4 border border-gray-200 rounded-md flex items-center gap-2">
                              <input type="checkbox" checked={formData.afternoon.includes("02:30 PM")} onChange={() => handleCheckboxChange("02:30 PM", "afternoon")} />
                              <label>02:30 PM</label>
                            </div>

                            <div className="bg-white py-2 px-4 border border-gray-200 rounded-md flex items-center gap-2">
                              <input type="checkbox" checked={formData.afternoon.includes("03:30 PM")} onChange={() => handleCheckboxChange("03:30 PM", "afternoon")} />
                              <label>03:30 PM</label>
                            </div>
                            <div className="bg-white py-2 px-4 border border-gray-200 rounded-md flex items-center gap-2">
                              <input type="checkbox" checked={formData.afternoon.includes("04:00 PM")} onChange={() => handleCheckboxChange("04:00 PM", "afternoon")} />
                              <label>04:00 PM</label>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-6 bg-[#F9FAFB] border rounded-md py-3 px-4 my-3 w-full">
                          <img src={PhrAssets.Night} alt="" />
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5">
                            <div className="bg-white border border-gray-200 rounded-md flex items-center gap-2 py-2 px-3">
                              <input type="checkbox" checked={formData.evening.includes("06:30 PM")} onChange={() => handleCheckboxChange("06:30 PM", "evening")} />
                              <label>06:30 PM</label>
                            </div>

                            <div className="bg-white py-2 px-3 border border-gray-200 rounded-md flex items-center gap-2">
                              <input type="checkbox" checked={formData.evening.includes("07:00 PM")} onChange={() => handleCheckboxChange("07:00 PM", "evening")} />
                              <label>07:00 PM</label>
                            </div>

                            <div className="bg-white py-2 px-3 border border-gray-200 rounded-md flex items-center gap-2">
                              <input type="checkbox" checked={formData.evening.includes("07:30 PM")} onChange={() => handleCheckboxChange("07:30 PM", "evening")} />
                              <label>07:30 PM</label>
                            </div>

                            <div className="bg-white py-2 px-4 border border-gray-200 rounded-md flex items-center gap-2">
                              <input type="checkbox" checked={formData.evening.includes("08:00 PM")} onChange={() => handleCheckboxChange("08:00 PM", "evening")} />
                              <label htmlFor="">08:00 PM</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" className="border border-[#EF5728] text-[#EF5728] font-semibold rounded-full py-2 px-8">
                  Save Medication
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MedicationAndreminders;
