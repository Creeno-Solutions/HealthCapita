import { PhrAssets } from "../../../../assets/PHR/assets";
import PhrUpdateHeader from "../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import SubmitButton from "../../../../CommonComponents/SubmitButton/SubmitButton";
import { useState } from "react";
// import MedicationAndreminders from "../LifeStyle/TrackingHealth/PhrBloodPressure/MedicationAndReminders";

const MedicalAndSurgeryUpdate = () => {
  const [showFields, setShowFields] = useState(false);

  const ToggleFields = () => {
    setShowFields((prevState) => !prevState);
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <PhrUpdateHeader Title={"Medical&Surgery"} />
        {/* Form Section */}
        <div className="py-4 px-4 sm:px-6 md:px-4 lg:px-12">
          <div className=" w-[100%] flex gap-10">
            <form className=" p-4 w-[50%] ">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-1">
                  <label htmlFor="sytolic" className="font-semibold">
                    Speciality
                  </label>
                  <select className="border border-gray-300 p-1 rounded-md focus:outline-none">
                    <option value="">Cancer</option>
                    <option value="">Diabetes</option>
                    <option value="">ENT</option>
                    <option value="">Heart & Circulations</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="sytolic" className="font-semibold">
                    Sub Speciality
                  </label>
                  <select className="border border-gray-300 p-1 rounded-md focus:outline-none">
                    <option value="">Lung Cancer</option>
                    <option value="">Blood Cancer</option>
                    <option value="">Liver Cancer</option>
                    <option value="">Mouth Cancer</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="date" className="font-semibold">
                    Date
                  </label>
                  <input
                    type="date"
                    name="data"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="time" className="font-semibold">
                    Test Of Entry
                  </label>
                  <input
                    type="time"
                    name="time"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="pysicianSpeciality" className="font-semibold">
                    Pysician Speciality
                  </label>
                  <input
                    type="text"
                    name="pysicianSpeciality"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="primarycarephysician"
                    className="font-semibold"
                  >
                    Primary Care Physician
                  </label>
                  <input
                    type="text"
                    name="primarycarephysician"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold">Comments</label>
                  <input
                    type="text"
                    name="comments"
                    className="border border-gray-300 p-1 rounded-md focus:outline-none"
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
              <button
                className="bg-[#EBF8FF] py-4 w-[330px] rounded-xl font-semibold text-[#004EBA]"
                onClick={ToggleFields}
              >
                Medications & Reminders
              </button>
            </div>
          </div>
          <p className="border  border-b  border-gray-100 my-8"></p>

          {/* <MedicationAndreminders showFields={showFields} /> */}
        </div>
      </div>

      <SubmitButton />
    </>
  );
};

export default MedicalAndSurgeryUpdate;
