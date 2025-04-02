import { PhrAssets } from "../../../../../../assets/PHR/assets";
import PhrUpdateHeader from "../../../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import SubmitButton from "../../../../../../CommonComponents/SubmitButton/SubmitButton";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import MedicationAndreminders from "../../../../../../CommonComponents/MedicationAndReminders/MedicationAndreminders";
import PhrProtectwithPassword from "../../../../../../CommonComponents/PhrUpdateHeader/PhrProtectwithPassword";

const BloodSugarUpdate = () => {
  const [showFields, setShowFields] = useState(false);
  const location = useLocation();

  const [bloodSugarId, setBloodSugarId] = useState(
    location.state?.BloodSugarId || null
  );

  const ToggleFields = () => {
    setShowFields((prevState) => !prevState);
  };
  const id = 10;
  const [formData, setFormData] = useState({
    userId: id,
    testDate: "",
    testTime: "",
    fasting: "",
    postPrandial: "",
    random: "",
    hbac: "",
    physicianSpecialist: "",
    primaryCarePhysician: "",
    comments: "",
    isPasswordProtected: false,
    isDisplayUnderSummaryPage: false,
    recStatus: "",
  });

  useEffect(() => {
    if (bloodSugarId) {
      axios
        .get(
          `https://service.healthcapita.com/api/PHR/GetPhrBloodSugarById/${bloodSugarId}/${id}`
        )
        .then((response) => {
          setFormData(response?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [bloodSugarId]);

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
        "https://service.healthcapita.com/api/PHR/SavePhrBloodSugar",
        formData
      );
      console.log("postDataaaaaa", response);
      if (response?.data?.status) {
        setBloodSugarId(response?.data?.bloodSugarid);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <PhrUpdateHeader />
        <PhrProtectwithPassword
          Title="BloodSugar"
          isProtected={formData.isPasswordProtected}
          isDisplayed={formData.isDisplayUnderSummaryPage}
          onProtectChange={handleChange}
          onDisplayChange={handleChange}
        />
        {/* Form Section */}
        <div className=" px-4 sm:px-6 md:px-4 lg:px-12">
          <div className=" w-[100%] flex gap-10">
            <form className=" p-4 w-[50%] ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold">Fasting (mg/dl)</label>
                  <input
                    type="number"
                    name="fasting"
                    value={formData.fasting}
                    onChange={handleChange}
                    placeholder="eg.150"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold">
                    Post prandial (mg/dl) (after food)
                  </label>
                  <input
                    type="number"
                    name="postPrandial"
                    value={formData.postPrandial}
                    onChange={handleChange}
                    placeholder="eg.150"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold">Random (mg/dl)</label>
                  <input
                    type="number"
                    name="random"
                    value={formData.random}
                    onChange={handleChange}
                    placeholder="eg.150"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold">HbA1C (%)</label>
                  <input
                    type="number"
                    name="hbac"
                    value={formData.hbac}
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
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="font-semibold">Comments</label>
                  <textarea
                    type="text"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Enter Comments"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none row-span-3"
                  />
                </div>
              </div>
              {/* prescibed_Medication */}
            </form>

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
              {bloodSugarId && (
                <button
                  className="bg-[#EBF8FF] py-4 px-14 rounded-xl font-semibold text-[#004EBA]"
                  onClick={ToggleFields}
                >
                  Medications & Reminders
                </button>
              )}
            </div>
          </div>
          {bloodSugarId && (
            <MedicationAndreminders
              showFields={showFields}
              recordId={bloodSugarId}
              recordIdKey={"BloodSugarId"}
              fetchDataUrl="https://service.healthcapita.com/api/PHR/GetPrescribedMedicationsByBloodSugarId"
            saveUrl="https://service.healthcapita.com/api/PHR/SaveBloodSugarPrescribedMedications"
              editUrl="https://service.healthcapita.com/api/PHR/GetPhrBloodSugarPrescribedMedication?prescribedMedicationsId"
              deleteUrl="https://service.healthcapita.com/api/PHR/DeletePhrBloodSugarPrescribedMedication?prescribedMedicationsId"
            />
          )}
        </div>
      </div>

      <SubmitButton onClick={handleSubmit} />
    </>
  );
};

export default BloodSugarUpdate;