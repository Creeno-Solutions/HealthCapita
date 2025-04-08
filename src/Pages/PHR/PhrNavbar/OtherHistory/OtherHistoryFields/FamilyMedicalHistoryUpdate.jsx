import { useState } from "react";
import PhrUpdateHeader from "../../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import UpdateDetailsBtn from "../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";

const FamilyMedicalHistoryUpdate = () => {
  const [formData, setFormData] = useState({
    CoronaryArteryDisease: false,
    Diabetes: false,
    Emphysema: false,
    Seizures: false,
    Stroke: false,
    Lupus: false,
    BreastCancer: false,
    LungCancer: false,
    OvarianUterineCancer: false,
    HeartFailure: false,
    Hypertension: false,
    Asthama: false,
    ParkinsonsDisease: false,
    Obesity: false,
    RheumatoidArthritis: false,
    ColonCancer: false,
    Leukemia: false,
    ProstateCancer: false,
  });

  const [textInputs, setTextInputs] = useState({});

  const handleCheckboxChange = (key) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));

    if (formData[key]) {
      setTextInputs((prevState) => {
        const updatedState = { ...prevState };
        delete updatedState[key];
        return updatedState;
      });
    }
  };

  const handleTextChange = (key, value) => {
    setTextInputs((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <>
      <PhrUpdateHeader />
      <div className="py-2 px-2">
        <h2 className="font-semibold pb-3">Family & Medical History</h2>
        <form className="flex flex-col gap-2">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4">
              <input
                type="checkbox"
                id={key}
                checked={value}
                onChange={() => handleCheckboxChange(key)}
              />
              <label htmlFor={key} className="capitalize w-64">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder={`Write ${key
                    .replace(/([A-Z])/g, " $1")
                    .trim()} here`}
                  maxLength={50}
                  value={textInputs[key] || ""}
                  onChange={(e) => handleTextChange(key, e.target.value)}
                  className={`border p-1 rounded w-full focus:outline-none ${
                    value ? "block" : "invisible"
                  }`}
                />
              </div>
            </div>
          ))}
        </form>
        <UpdateDetailsBtn />
      </div>
    </>
  );
};

export default FamilyMedicalHistoryUpdate;
