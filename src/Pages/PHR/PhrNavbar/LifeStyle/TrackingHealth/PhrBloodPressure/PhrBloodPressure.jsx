import { PhrAssets } from "../../../../../../assets/PHR/assets";
import AddBtn from "../../../../../../CommonComponents/AddBtn/AddBtn";
import { useNavigate } from "react-router-dom";
import UpdateDetailsBtn from "../../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";
import { useState, useEffect } from "react";
import axios from "axios";
import UserInfo from "../../../../../../utils/UserInfo";

const PhrBloodPressure = () => {
  let navigate = useNavigate();
  const userId = UserInfo();
  const [contactsUpdateForm, setContactsUpdateForm] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  const openPhrBloodUpdatePage = (BloodPressureId) => {
    navigate("/PhrBloodPressureUpdatePage", { state: { BloodPressureId } });
  };

  const openPhrBloodPressureAddpage = () => {
    navigate("/PhrBloodPressureUpdatePage");
  };

  const openBloodPressureForm = async (BloodPressureId) => {
    setContactsUpdateForm(true);
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetPhrBloodPressureById/${BloodPressureId}/${userId}`
      );
      setSelectedContact(response?.data?.data);
    } catch (error) {
      console.error("Error fetching blood pressure data:", error);
    }
  };

  const closeBloodPressureForm = () => {
    setContactsUpdateForm(false);
    setSelectedContact(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetPhrBloodPressure?userId=${userId}`
        );
        if (response?.data?.status === true) {
          setData(response?.data?.data);
        }
      } catch (err) {
        console.error("Error fetching blood pressure list:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (BloodPressureId) => {
    try {
      const response = await axios.post(
        `https://service.healthcapita.com/api/PHR/bloodpressure/delete/${BloodPressureId}/${userId}`
      );
      if (response?.data?.success) {
        const deletedData = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetPhrBloodPressure?userId=${userId}`
        );
        setData(deletedData?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-3 px-2 bg-[#F9FAFB] rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            className="p-2 rounded-full bg-[#6938EF]"
            src={PhrAssets.BloodPressure}
            alt=""
          />
          <p className="font-medium leading-5 text-lg text-[#111928]">
            Blood Pressure
          </p>
        </div>
        <AddBtn onClick={openPhrBloodPressureAddpage} />
      </div>
      <p className="border border-gray-300 px-2 my-4"></p>

      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[#D1D5DB]">
              <th className="py-3 text-left text-base font-medium pl-1"></th>
              <th className="py-3 text-left text-base font-medium px-4">
                Date of Test
              </th>
              <th className="py-3 text-left text-base font-medium px-4">
                Systolic
              </th>
              <th className="py-3 text-left text-base font-medium px-4">
                Diastolic
              </th>
              <th className="py-3 text-left text-base font-medium px-4"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.BloodPressureId}>
                  <td className="pl-1 py-4 text-sm text-gray-900 border-b cursor-pointer">
                    <img
                      src={PhrAssets.ThreeDotted}
                      onClick={() =>
                        openBloodPressureForm(item.BloodPressureId)
                      }
                      alt="Options"
                      className="w-6 h-6 cursor-pointer"
                    />
                  </td>
                  <td
                    onClick={() => openBloodPressureForm(item.BloodPressureId)}
                    className="px-4 py-4 text-base text-[#004EBA] border-b font-semibold cursor-pointer"
                  >
                    {item.TestDate}
                  </td>
                  <td className="px-4 py-4 text-base text-gray-900 border-b">
                    {item.Systolic}
                  </td>
                  <td className="px-4 py-4 text-base text-gray-900 border-b">
                    {item.Diastolic}
                  </td>
                  <td className="px-4 py-4 text-base text-gray-900 border-b">
                    <div className="flex gap-4 items-center">
                      <button
                        onClick={() =>
                          openPhrBloodUpdatePage(item.BloodPressureId)
                        }
                      >
                        <img src={PhrAssets.Edit} alt="Edit" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.BloodPressureId)}
                        className="flex gap-1 items-center text-[#1C9401] font-semibold"
                      >
                        <img src={PhrAssets.Delete} alt="Delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {contactsUpdateForm && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[50%] relative overflow-y-auto h-[95%] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <div className="pt-2 px-6 mx-auto h-96 pb-52">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-2xl">
                  Blood Pressure Information
                </h2>
                <img
                  src={PhrAssets.Close}
                  alt="Close"
                  onClick={closeBloodPressureForm}
                  className="cursor-pointer"
                />
              </div>
              <p className="border border-b-1 border-gray-400 my-6"></p>

              <div className="grid sm:grid-cols-3 gap-8 mb-4">
                <div className="flex flex-col gap-1">
                  <p>Systolic (Upper)</p>
                  <p className="font-semibold">
                    {selectedContact.systolic} mmHg
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p>Diastolic (Lower)</p>
                  <p className="font-semibold">
                    {selectedContact.diastolic} mmHg
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p>Date of Entry</p>
                  <p className="font-semibold">{selectedContact.testDate}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p>Physician Specialist</p>
                  <p className="font-semibold">
                    {selectedContact.physicianSpecialist}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p>Primary Care Physician</p>
                  <p className="font-semibold">
                    {selectedContact.primaryCarePhysician}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p>Comments</p>
                  <p className="font-semibold">{selectedContact.comments}</p>
                </div>
              </div>

              <div className="mt-20">
                <UpdateDetailsBtn
                  onClick={() =>
                    openPhrBloodUpdatePage(selectedContact.bloodPressureId)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhrBloodPressure;
