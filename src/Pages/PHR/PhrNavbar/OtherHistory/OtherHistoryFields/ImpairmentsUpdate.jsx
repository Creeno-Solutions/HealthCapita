import { useState } from "react";
import PhrUpdateHeader from "../../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import UpdateDetailsBtn from "../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";

const ImpairmentsUpdate = () => {
  const [formData, setFormData] = useState({
    Pacemaker: false,
    ParalysisOfLowerLimbs: false,
    Autism: false,
    SpeechImpediment: false,
    WheelchairUser: false,
    Blindness: false,
    Mute: false,
    ArtificialLimb: false,
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
        <h2 className="font-semibold pb-3">Impairments</h2>
        <form className="flex flex-col gap-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={key}
                checked={value}
                onChange={() => handleCheckboxChange(key)}
              />
              <label htmlFor={key} className="capitalize w-48">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Write text here..."
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

export default ImpairmentsUpdate;
