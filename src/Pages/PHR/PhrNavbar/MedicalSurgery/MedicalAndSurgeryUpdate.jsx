import { PhrAssets } from "../../../../assets/PHR/assets";
import PhrUpdateHeader from "../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import SubmitButton from "../../../../CommonComponents/SubmitButton/SubmitButton";
import { useState, useEffect } from "react";
import MedicationAndreminders from "../../../../CommonComponents/MedicationAndReminders/MedicationAndreminders";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PhrProtectwithPassword from "../../../../CommonComponents/PhrUpdateHeader/PhrProtectwithPassword";

const MedicalAndSurgeryUpdate = () => {
  const [showFields, setShowFields] = useState(false);
  const location = useLocation();

  const [medicalHistoryid, setmedicalHistoryid] = useState(location.state?.BloodTestInformationId || null);
  console.log("medicalHistoryid", medicalHistoryid);

  const ToggleFields = () => {
    setShowFields((prevState) => !prevState);
  };

  const userId = 10;
  const [formData, setFormData] = useState({
    medicalHistoryId: 0,
    userId: userId,
    subSpecialityId: "",
    specialityId: 0,
    dateofEntry: "",
    time: "string",
    dateofDiagnosis: "",
    physicianSpecialist: "",
    primaryCarePhysician: "",
    comments: "",
    isPasswordProtected: true,
    isDisplayUnderSummaryPage: true,
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
      const response = await axios.post("https://service.healthcapita.com/api/PHR/SavePhrMedicalHistory", formData);

      if (response?.data?.status) {
        setmedicalHistoryid(response?.data?.medicalHistoryid);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (medicalHistoryid) {
      axios
        .get(`https://service.healthcapita.com/api/PHR/GetPhrMedicalHistoryById/${medicalHistoryid}/${userId}`)
        .then((response) => {
          setFormData(response?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [medicalHistoryid]);

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <PhrUpdateHeader />
        <PhrProtectwithPassword
          Title="Medical&Surgery"
          isProtected={formData.isPasswordProtected}
          isDisplayed={formData.isDisplayUnderSummaryPage}
          onProtectChange={handleChange}
          onDisplayChange={handleChange}
        />
        {/* Form Section */}
        <div className="py-4 px-4 sm:px-6 md:px-4 lg:px-12">
          <div className=" w-[100%] flex gap-10">
          <form className=" p-4 w-[50%] ">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-1">
                  <label  className="font-semibold">
                    Speciality
                  </label>
                  <select onChange={handleChange} name="specialityId" value={formData.specialityId} className="border border-gray-300 p-1 rounded-md focus:outline-none">
                    <option value="Cancer">Cancer</option>
                    <option value="Diabetes">Diabetes</option>
                    <option value="ENT">ENT</option>
                    <option value="Heart & Circulations">Heart & Circulations</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label  className="font-semibold">
                    Sub Speciality
                  </label>
                  <select onChange={handleChange} value={formData.subSpecialityId} name="subSpecialityId" className="border border-gray-300 p-1 rounded-md focus:outline-none">
                    <option value="LungCancer">Lung Cancer</option>
                    <option value="BloodCancer">Blood Cancer</option>
                    <option value="LiverCancer">Liver Cancer</option>
                    <option value="MouthCancer">Mouth Cancer</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label  className="font-semibold">
                    Date
                  </label>
                  <input
                    type="date"
                    onChange={handleChange} value={formData.dateofEntry} name="dateofEntry" 
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold">
                    Time Of Entry
                  </label>
                  <input
                    type="time"
                    onChange={handleChange} value={formData.time} name="time" 
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold">
                    Date of Diagnosis
                  </label>
                  <input
                    type="date"
                    onChange={handleChange} value={formData.dateofDiagnosis} name="dateofDiagnosis" 
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label  className="font-semibold">
                    Pysician Speciality
                  </label>
                  <input
                    type="text"
                    onChange={handleChange} value={formData.physicianSpecialist} name="physicianSpecialist" 
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                  
                    className="font-semibold"
                  >
                    Primary Care Physician
                  </label>
                  <input
                    type="text"
                    onChange={handleChange} value={formData.primaryCarePhysician} name="primaryCarePhysician" 
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold">Comments</label>
                  <input
                    type="text"
                    onChange={handleChange} value={formData.comments} name="comments" 
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>
              </div>
              {/* prescibed_Medication */}
            </form>
            {medicalHistoryid && (
              <div className="flex flex-col items-end justify-center gap-3 w-[50%]">
                <div className="bg-[#EBF8FF] py-4 px-4 rounded-xl">
                  <h2 className="text-lg font-semibold text-[#004EBA] mb-2 py-2">Upload Reports</h2>
                  <div className="p-2 rounded-lg shadow-sm border border-gray-400 border-dashed py-2">
                    <label className="flex items-center justify-center space-x-2 mb-2 cursor-pointer">
                      <img src={PhrAssets.Report} alt="Upload Icon" className="w-6 h-6" />
                      <span className="text-gray-600 font-medium py-2">Upload Reports</span>
                      <input type="file" className="hidden" />
                    </label>
                    <div className="flex items-center justify-center space-x-2 pt-1">
                      <img src={PhrAssets.InfoCircle} alt="Info Icon" className="w-3 h-3" />
                      <span className="text-[#004EBA] text-sm py-2">You can upload 1 file, not exceeding 10MB</span>
                    </div>
                  </div>
                </div>

                <button className="bg-[#EBF8FF] py-4 px-14 rounded-xl font-semibold text-[#004EBA]" onClick={ToggleFields}>
                  Medications & Reminders
                </button>
              </div>
            )}
          </div>
          {medicalHistoryid && (
            <MedicationAndreminders
              showFields={showFields}
              recordId={medicalHistoryid}
              recordIdKey={"medicalHistoryId"}
              fetchDataUrl="https://service.healthcapita.com/api/PHR/GetphrMedicalHistoryPrescribedMedicationsId"
              saveUrl="https://service.healthcapita.com/api/PHR/SaveMedicalHistoryPrescribedMedications"
              editUrl="https://service.healthcapita.com/api/PHR/GetPhrMedicalHistoryPrescribedMedication?prescribedMedicationsId"
              deleteUrl="https://service.healthcapita.com/api/PHR/DeletePhrMedicalHistoryPrescribedMedicationRecords?prescribedMedicationsId"
                        
            />
          )}
        </div>
      </div>

      <SubmitButton onClick={handleSubmit} />
    </>
  );
};

export default MedicalAndSurgeryUpdate;
