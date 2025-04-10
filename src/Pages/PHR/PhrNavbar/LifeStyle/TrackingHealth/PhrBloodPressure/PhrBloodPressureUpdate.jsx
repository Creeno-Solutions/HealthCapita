import { PhrAssets } from "../../../../../../assets/PHR/assets";
import PhrUpdateHeader from "../../../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import SubmitButton from "../../../../../../CommonComponents/SubmitButton/SubmitButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../../../../../utils/HraApis";

import UserInfo from "../../../../../../utils/UserInfo";
import MedicationAndreminders from "../../../../../../CommonComponents/MedicationAndReminders/MedicationAndreminders";
import PhrProtectwithPassword from "../../../../../../CommonComponents/PhrUpdateHeader/PhrProtectwithPassword";

const PhrBloodPressureUpdate = () => {
  const location = useLocation();
  const [bloodPressureId, setBloodPressureId] = useState(
    location.state?.BloodPressureId || null
  );
  const [showFields, setShowFields] = useState(false);
  const userId = UserInfo();
  const [formData, setFormData] = useState({
    userId: userId,
    testDate: "",
    testTime: "",
    systolic: "",
    diastolic: "",
    physicianSpecialist: "",
    primaryCarePhysician: "",
    comments: "",
    isPasswordProtected: false,
    isdisplayUnderSummaryPage: false,
    recStatus: "",
  });

  // const user = UserInfo
  console.log('bloodpressureid',bloodPressureId)
  const ToggleFields = () => {
    setShowFields((prevState) => !prevState);
  };
  useEffect(() => {
    if (bloodPressureId) {
      axios
        .get(
          `https://service.healthcapita.com/api/PHR/GetPhrBloodPressureById/${bloodPressureId}/${userId}`
          
        )
        .then((response) => {
          setFormData(response?.data?.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [bloodPressureId]);
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = async () => {
    try {
      const response = await axios.post(
        "https://service.healthcapita.com/api/PHR/SavePhrBloodPressure",
        formData
      );
      console.log("bloodpressureresopnse", response?.data?.status);
      if (response?.data?.status) {
        setBloodPressureId(response?.data?.bloodPressureid);
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
          Title="Blood Pressure"
          isProtected={formData.isPasswordProtected}
          isDisplayed={formData.isdisplayUnderSummaryPage}
          onProtectChange={handleChange}
          onDisplayChange={handleChange}
        />

        {/* Form Section */}
        <div className="py-4 px-4 sm:px-6 md:px-4 lg:px-12">
          <div className=" w-[100%] flex gap-10">
            <form className=" p-4 w-[50%] ">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold">Systolic (Upper)</label>
                  <input
                    type="number"
                    name="systolic"
                    value={formData.systolic}
                    onChange={handleChange}
                    placeholder="eg.150"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold">Diastolic (Lower)</label>
                  <input
                    type="number"
                    name="diastolic"
                    value={formData.diastolic}
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
                  <label className="font-semibold">Pysician Specialist</label>
                  <input
                    type="text"
                    name="physicianSpecialist"
                    value={formData.physicianSpecialist}
                    onChange={handleChange}
                    placeholder="Enter Physician Specialist"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none "
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
                    placeholder="Enter primary Care Physician"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />    
                </div> 
              </div>
            </form>
            {bloodPressureId && (
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

          {bloodPressureId && (
            <MedicationAndreminders
              showFields={showFields}
              recordId={bloodPressureId}
              recordIdKey={"bloodPressureId"}
              fetchDataUrl={`${BASE_URL}/api/PHR/GetPrescribedMedicationsByBloodPressureId`}
              saveUrl={`${BASE_URL}/api/PHR/SaveBloodPressurePrescribedMedications`}
              editUrl={`${BASE_URL}/api/PHR/GetPhrBloodPressurePrescribedMedication?prescribedMedicationsId`}
              deleteUrl={`${BASE_URL}/api/PHR/DeletePhrBloodPressurePrescribedMedication?prescribedMedicationsId`}
              
            />
          )}
        </div>
      </div>

      <SubmitButton onClick={submit} />
    </>
  );
};

export default PhrBloodPressureUpdate;
