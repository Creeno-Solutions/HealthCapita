import { PhrAssets } from "../../../../../../assets/PHR/assets";
import PhrUpdateHeader from "../../../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import SubmitButton from "../../../../../../CommonComponents/SubmitButton/SubmitButton";
import { useState, useEffect } from "react";
import MedicationAndreminders from "../../../../../../CommonComponents/MedicationAndReminders/MedicationAndreminders";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PhrProtectwithPassword from "../../../../../../CommonComponents/PhrUpdateHeader/PhrProtectwithPassword";

const BloodTestInfoUpdate = () => {
  const [showFields, setShowFields] = useState(false);
  const location = useLocation();

  const [bloodTestInfoId, setBloodTestInfoId] = useState(
    location.state?.BloodTestInformationId || null
  );
  console.log("bloodTestInfoId", bloodTestInfoId);

  const ToggleFields = () => {
    setShowFields((prevState) => !prevState);
  };

  const userId = 10;
  const [formData, setFormData] = useState({
    userId: userId,
    testDate: "",
    testTime: "",
    hemoglobin: "",
    wbc: "",
    rbc: "",
    physicianSpecialist: "",
    primaryCarePhysician: "",
    comments: "",
    isPasswordProtected: false,
    isdisplayUnderSummaryPage: false,
    isDisplayUnderOtherHealthRecord: true,
    isdisplayUnderImpHealthRecord: true,
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
        "https://service.healthcapita.com/api/PHR/SavePhrBloodTestInformation",
        formData
      );

      if (response?.data?.status) {
        setBloodTestInfoId(response?.data?.bloodTestInformationId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (bloodTestInfoId) {
      axios
        .get(
          `https://service.healthcapita.com/api/PHR/GetPhrBloodTestInformationById/${bloodTestInfoId}/${userId}`
        )
        .then((response) => {
          setFormData(response?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [bloodTestInfoId]);

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <PhrUpdateHeader />
        <PhrProtectwithPassword
          Title="Blood Test Info"
          isProtected={formData.isPasswordProtected}
          isDisplayed={formData.isdisplayUnderSummaryPage}
          onProtectChange={handleChange}
          onDisplayChange={handleChange}
        />
        {/* Form Section */}
        <div className="py-4 px-4 sm:px-6 md:px-4 lg:px-12">
          <div className=" w-[100%] flex gap-10">
            <form className=" p-4 w-[50%] ">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* First Row: Haemoglobin, WBC, RBC */}
                <div className="flex flex-col">
                  <label className="font-semibold">Haemoglobin</label>
                  <input
                    type="number"
                    name="hemoglobin"
                    value={formData.hemoglobin}
                    onChange={handleChange}
                    placeholder="eg.150"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">WBC</label>
                  <input
                    type="number"
                    name="wbc"
                    value={formData.wbc}
                    onChange={handleChange}
                    placeholder="eg.150"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">RBC</label>
                  <input
                    type="number"
                    name="rbc"
                    value={formData.rbc}
                    onChange={handleChange}
                    placeholder="eg.150"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>

                {/* Second Row: Test Date and Test Time in One Line with Equal Width */}
                <div className="grid grid-cols-2 gap-4 sm:col-span-3">
                  <div className="flex flex-col">
                    <label className="font-semibold">Test Date</label>
                    <input
                      type="date"
                      name="testDate"
                      value={formData.testDate}
                      onChange={handleChange}
                      className="border border-gray-300 p-1 rounded-md focus:outline-none w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">Test Time</label>
                    <input
                      type="time"
                      name="testTime"
                      value={formData.testTime}
                      onChange={handleChange}
                      className="border border-gray-300 p-1 rounded-md focus:outline-none w-full"
                    />
                  </div>
                </div>

                {/* Third Row: Physician Speciality, Primary Care Physician */}
                <div className="grid grid-cols-2 gap-4 sm:col-span-3">
                  <div className="flex flex-col">
                    <label className="font-semibold">
                      Physician Speciality
                    </label>
                    <input
                      type="text"
                      name="physicianSpecialist"
                      value={formData.physicianSpecialist}
                      onChange={handleChange}
                      placeholder="Enter Physician Speciality"
                      className="border border-gray-300 p-1 rounded-md focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col">
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
                {/* Last Row: Comments (Full Width) */}
                <div className="flex flex-col sm:col-span-3">
                  <label className="font-semibold">Comments</label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Enter Comments"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none w-full"
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
              {bloodTestInfoId && (
                <button
                  className="bg-[#EBF8FF] py-4 px-14 rounded-xl font-semibold text-[#004EBA]"
                  onClick={ToggleFields}
                >
                  Medications & Reminders
                </button>
              )}
            </div>
          </div>
          {bloodTestInfoId && (
            <MedicationAndreminders
              showFields={showFields}
              recordId={bloodTestInfoId}
              recordIdKey={"bloodTestInformationId"}
              fetchDataUrl="https://service.healthcapita.com/api/PHR/GetPrescribedMedicationsByBloodTestInformationId"
              saveUrl="https://service.healthcapita.com/api/PHR/SaveBloodTestInformationPrescribedMedications"
              editUrl="https://service.healthcapita.com/api/PHR/GetBloodTestInformationPrescribedMedication?prescribedMedicationsId"
              deleteUrl="https://service.healthcapita.com/api/PHR/DeletePhrBloodTestInformationPrescribedMedication?prescribedMedicationsId"
            />
          )}
        </div>
      </div>

      <SubmitButton onClick={handleSubmit} />
    </>
  );
};

export default BloodTestInfoUpdate;