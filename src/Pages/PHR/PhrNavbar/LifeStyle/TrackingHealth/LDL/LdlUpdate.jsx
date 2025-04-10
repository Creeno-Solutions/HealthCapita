import { PhrAssets } from "../../../../../../assets/PHR/assets";
import PhrUpdateHeader from "../../../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import SubmitButton from "../../../../../../CommonComponents/SubmitButton/SubmitButton";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PhrProtectwithPassword from "../../../../../../CommonComponents/PhrUpdateHeader/PhrProtectwithPassword";
import MedicationAndreminders from "../../../../../../CommonComponents/MedicationAndReminders/MedicationAndreminders";

const LdlUpdate = () => {
  const [showFields, setShowFields] = useState(false);

  const ToggleFields = () => {
    setShowFields((prevState) => !prevState);
  };

  const location = useLocation();
  const [ldlId, setLdlId] = useState(location.state?.LDLId || null);
  const userId = 10;
  const [formData, setFormData] = useState({
    userId: userId,
    testDate: "",
    testTime: "",
    ldllevel: "",
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
        "https://service.healthcapita.com/api/PHR/SavePhrLdl",
        formData
      );
      console.log("ldl", response);
      if (response?.data?.status) {
        setLdlId(response?.data?.ldlid);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (ldlId) {
      axios
        .get(
          ` https://service.healthcapita.com/api/PHR/GetPhrLdlById/${ldlId}/${userId}`
        )

        .then((response) => {
          console.log("responseeeeeeeeee", response);
          setFormData(response?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [ldlId]);

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <PhrUpdateHeader />
        <PhrProtectwithPassword
          Title="LDL"
          isProtected={formData.isPasswordProtected}
          isDisplayed={formData.isDisplayUnderSummaryPage}
          onProtectChange={handleChange}
          onDisplayChange={handleChange}
        />
        {/* Form Section */}
        <div className="py-4 px-4 sm:px-6 md:px-4 lg:px-12">
          <div className=" w-[100%] flex gap-10">
            <form className=" p-4 w-[50%] ">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold">LDL Level</label>
                  <input
                    type="number"
                    name="ldllevel"
                    value={formData.ldllevel}
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
                    <label className="font-semibold">Pysician Specialist</label>
                    <input
                      type="text"
                      name="physicianSpecialist"
                      value={formData.physicianSpecialist}
                      onChange={handleChange}
                      placeholder="Enter Physician Specailist"
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
                <div className="flex flex-col gap-1 col-span-3 w-full">
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
            {ldlId && (
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
                  className="bg-[#EBF8FF] py-4 w-[330px] rounded-xl font-semibold text-[#004EBA]"
                  onClick={ToggleFields}
                >
                  Medications & Reminders
                </button>
            
            </div>
             )}
          </div>
          {ldlId && (
            <MedicationAndreminders
              showFields={showFields}
              recordId={ldlId}
              recordIdKey={"ldlID"}
              fetchDataUrl="https://service.healthcapita.com/api/PHR/GetPrescribedMedicationsLdlId"
              saveUrl="https://service.healthcapita.com/api/PHR/SavephrLdlPrescribedMedications"
              editUrl="https://service.healthcapita.com/api/PHR/GetLdlPrescribedMedication?prescribedMedicationsId"
              deleteUrl="https://service.healthcapita.com/api/PHR/DeletePhrLdlPrescribedMedication?prescribedMedicationsId"
            />
          )}
        </div>
      </div>

      <SubmitButton onClick={handleSubmit} />
    </>
  );
};

export default LdlUpdate;
