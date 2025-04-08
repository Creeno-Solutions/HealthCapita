import { useEffect, useState } from "react";
import PhrUpdateHeader from "../../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import UpdateDetailsBtn from "../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";
import axios from "axios";

const Dentalupdate = ({
  isPasswordProtected,
  isDisplayUnderSummaryPage,
  handleProtectChange,
  handleDisplayChange,
  handleTabChange,
}) => {
  const userId = 10;

  const [formData, setFormData] = useState({
    userId: userId,
    implants: false,
    capping: false,
    routeCanel: false,
    fullDentures: false,
    partialDental: false,
    crowns: false,
    bridges: false,
    gumdisease: false,
    braces: false,
    extractionofTooth: false,
    implantsType: "",
    cappingType: "",
    routeCanelType: "",
    fullDenturesType: "",
    partialDentalType: "",
    crownsType: "",
    bridgesType: "",
    gumdiseaseType: "",
    bracesType: "",
    extractionofToothType: "",
    isPasswordProtected: false,
    isDisplayUnderSummaryPage: false,
  });

  const [textInputs, setTextInputs] = useState({});
  
   
  const getDentalData = async () => {
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetDentalData?userId=${userId}`
      );
      console.log("GetDentalresponse", response?.data?.data);
      if (response?.data?.status) {
        const updatedData = response?.data?.data;
        if (updatedData) {
          setFormData({
            ...formData,
            autoid: updatedData.autoid || 0,
            userId: userId,
            implants: updatedData.implants || false,
            capping: updatedData.capping || false,
            routeCanel: updatedData.routeCanel || false,
            fullDentures: updatedData.fullDentures || false,
            partialDental: updatedData.partialDental || false,
            crowns: updatedData.crowns || false,
            bridges: updatedData.bridges || false,
            gumdisease: updatedData.gumdisease || false,
            braces: updatedData.braces || false,
            extractionofTooth: updatedData.extractionofTooth || false,
          });
          setTextInputs({
            implantsType: updatedData.implantsType || "",
            cappingType: updatedData.cappingType || "",
            routeCanelType: updatedData.routeCanelType || "",
            fullDenturesType: updatedData.fullDenturesType || "",
            partialDentalType: updatedData.partialDentalType || "",
            crownsType: updatedData.crownsType || "",
            bridgesType: updatedData.bridgesType || "",
            gumdiseaseType: updatedData.gumdiseaseType || "",
            bracesType: updatedData.bracesType || "",
            extractionofToothType: updatedData.extractionofToothType || "",
          });
          handleProtectChange({
            target: { checked: updatedData.isPasswordProtected || false },
          });
          handleDisplayChange({
            target: {
              checked: updatedData.isDisplayUnderSummaryPage || false,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDentalData();
  }, []);

  const handleCheckboxChange = (key) => {
    const isChecked = !formData[key];

    setFormData((prevState) => ({
      ...prevState,
      [key]: isChecked,
      [`${key}Type`]: isChecked ? prevState[`${key}Type`] : "",
    }));

    setTextInputs((prevState) => {
      const updatedState = { ...prevState };
      if (!isChecked) {
        delete updatedState[`${key}Type`];
      }
      return updatedState;
    });
  };

  const handleTextChange = (key, value) => {
    setTextInputs((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  // made changes
  const payload = {
    ...formData,
    ...textInputs,
    isPasswordProtected: isPasswordProtected,
    isDisplayUnderSummaryPage: isDisplayUnderSummaryPage,
  };

  const sendDentalData = async () => {
    try {
      const response = await axios.post(
        "https://service.healthcapita.com/api/PHR/SaveDental",
        payload
      );
      console.log("dentalllllll", response);
      handleTabChange(1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PhrUpdateHeader />
      <div className="py-2 px-2">
        <h2 className="font-semibold pb-3">Dental</h2>
        <form className="flex flex-col gap-4">
          {Object.entries(formData)
            .filter(
              ([key]) =>
                key !== "userId" &&
                key !== "autoid" &&
                key !== "isPasswordProtected" &&
                key !== "isDisplayUnderSummaryPage" &&
                !key.endsWith("Type")
            )
            .map(([key, value]) => (
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
                    placeholder={`Write ${key
                      .replace(/([A-Z])/g, " $1")
                      .trim()} here`}
                    maxLength={50}
                    value={textInputs[`${key}Type`] || ""}
                    onChange={(e) =>
                      handleTextChange(`${key}Type`, e.target.value)
                    }
                    className={`border p-1 rounded w-full focus:outline-none ${
                      value ? "block" : "invisible"
                    }`}
                  />
                </div>
              </div>
            ))}
        </form>
        <UpdateDetailsBtn onClick={sendDentalData} />
      </div>
    </>
  );
};

export default Dentalupdate;
