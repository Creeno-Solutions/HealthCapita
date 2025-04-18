import { PhrAssets } from "../../../../../../assets/PHR/assets";
import PhrUpdateHeader from "../../../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import SubmitButton from "../../../../../../CommonComponents/SubmitButton/SubmitButton";
import { useState, useEffect } from "react";
import MedicationAndreminders from "../../../../../../CommonComponents/MedicationAndReminders/MedicationAndreminders";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PhrProtectwithPassword from "../../../../../../CommonComponents/PhrUpdateHeader/PhrProtectwithPassword";

const CholestrolUpdate = () => {
  const [showFields, setShowFields] = useState(false);

  const ToggleFields = () => {
    setShowFields((prevState) => !prevState);
  };

  const location = useLocation();
  const [cholesterolId, setCholesterolId] = useState(
    location.state?.CholesterolId || null
  );


  const userId = 10;
  const [formData, setFormData] = useState({
    userId: userId,
    testDate: "",
    testTime: "",
    cholestrolLevel: "",
    physicianSpecialist: "",
    primaryCarePhysician: "",
    comments: "",
    isPasswordProtected: false,
    isDisplayUnderSummaryPage: false,
    recStatus: "",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://service.healthcapita.com/api/PHR/SavePhrCholesterol",
        formData
      );
      console.log("postDatacholestrol", response);
      if (response?.data?.status) {
        setCholesterolId(response?.data?.cholesterolId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cholesterolId) {
      axios
        .get(
          `https://service.healthcapita.com/api/PHR/GetPhrCholesterolById/${cholesterolId}/${userId}`
        )

        .then((response) => {
          console.log("response", response);
          setFormData(response?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [cholesterolId]);

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <PhrUpdateHeader />
        <PhrProtectwithPassword
          Title="Cholesterol"
          isProtected={formData.isPasswordProtected}
          isDisplayed={formData.isDisplayUnderSummaryPage}
          onProtectChange={handleChange}
          onDisplayChange={handleChange}
        />
        {/* Form Section */}
        <div className="py-4 px-4 sm:px-6 md:px-4 lg:px-12">
          <div className=" w-[100%] flex gap-10">
            <form className=" p-4 w-[50%] ">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold">
                    Blood Cholesterol Level
                  </label>
                  <input
                    type="number"
                    name="cholestrolLevel"
                    value={formData.cholestrolLevel}
                    onChange={handleChange}
                    placeholder="eg.150"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold">Test Date</label>
                  <input
                    type="date"
                    name="testDate"
                    value={formData.testDate}
                    onChange={handleChange}
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold">Test Time</label>
                  <input
                    type="time"
                    name="testTime"
                    value={formData.testTime}
                    onChange={handleChange}
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 sm:col-span-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">Pysician Speciality</label>
                    <input
                      type="text"
                      name="physicianSpecialist"
                      value={formData.physicianSpecialist}
                      onChange={handleChange}
                      placeholder="Enter Pysician Speciality"
                      className="border border-gray-300 p-1 rounded-md focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold">
                      Primary Care Physician
                    </label>
                    <input
                      type="text"
                      name="primaryCarePhysician"
                      value={formData.primaryCarePhysician}
                      onChange={handleChange}
                      placeholder="Enter Primary Care Physician"
                      className="border border-gray-300 p-1 rounded-md focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 md:col-span-3">
                  <label className="font-semibold">Comments</label>
                  <textarea
                    type="text"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Enter Comments"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>
              </div>
              {/* prescibed_Medication */}
            </form>
            {cholesterolId && (
            <div className="flex flex-col items-end justify-center gap-3 w-[50%]">
              <div className="bg-[#EBF8FF] py-4 px-4 rounded-xl">
                <h2 className="text-lg font-semibold text-[#004EBA] mb-2 py-2">
                  Upload Reports
                </h2>
                <div className="p-2 rounded-lg shadow-sm border border-gray-400 border-dashed py-2">
                  <label className="flex items-center justify-center space-x-2 mb-2 cursor-pointer">
                    <img
                      src={PhrAssets.Report}
                      alt="Upload Icon"
                      className="w-6 h-6"
                    />
                    <span className="text-gray-600 font-medium py-2">
                      Upload Reports
                    </span>
                    <input type="file" className="hidden" />
                  </label>
                  <div className="flex items-center justify-center space-x-2 pt-1">
                    <img
                      src={PhrAssets.InfoCircle}
                      alt="Info Icon"
                      className="w-3 h-3"
                    />
                    <span className="text-[#004EBA] text-sm py-2">
                      You can upload 1 file, not exceeding 10MB
                    </span>
                  </div>
                </div>
              </div>
           
                <button
                  className="bg-[#EBF8FF] py-4 px-14 rounded-xl font-semibold text-[#004EBA]"
                  onClick={ToggleFields}
                >
                  Medications & Reminders
                </button>
            
            </div>
          )}
          </div>
          {cholesterolId && (
            <MedicationAndreminders
              showFields={showFields}
              recordId={cholesterolId}
              recordIdKey={"cholesterolId"}
              fetchDataUrl="https://service.healthcapita.com/api/PHR/GetPrescribedMedicationsCholesterolId"
              saveUrl="https://service.healthcapita.com/api/PHR/SaveCholesterolPrescribedMedications"
              editUrl="https://service.healthcapita.com/api/PHR/GetBloodCholesterolPrescribedMedication?prescribedMedicationsId"
              deleteUrl="https://service.healthcapita.com/api/PHR/DeletePhrBloodCholesterolPrescribedMedication?prescribedMedicationsId"
            />
          )}
        </div>
      </div>

      <SubmitButton onClick={handleSubmit} />
    </>
  );
};

export default CholestrolUpdate;