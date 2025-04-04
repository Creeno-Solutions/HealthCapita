import { useEffect, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import UpdateDetailsBtn from "../../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";

const InfantHistory = ({
  isPasswordProtected,
  isdisplayUnderSummaryPage,
  handleProtectChange,
  handleDisplayChange,
  handleTabChange,
}) => {
  const [data, setData] = useState({
    jaundice: false,
    soreThroat: false,
    overWeight: false,
    underWeight: false,
    intExtDefect: false,
    remarks: "",
    isPasswordProtected: false,
    isDisplayUnderSummaryPage: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isDefectVisible, setIsDefectVisible] = useState(false);
  const userId = 22; // Set your userId here
  // 100, 99,
  const GetInfantHistoryApi = async () => {
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetInfantHistoryDetailById?UserId=${userId}`
      );

      if (response?.data?.data) {
        const apiData = response.data.data;
        if (apiData) {
          setData({
            jaundice: apiData.jaundice || false,
            soreThroat: apiData.soreThroat || false,
            overWeight: apiData.overWeight || false,
            underWeight: apiData.underWeight || false,
            intExtDefect: apiData.intExtDefect || false,
            remarks: apiData.remarks || "",
          });

          handleProtectChange({
            target: { checked: apiData.isPasswordProtected || false },
          });
          handleDisplayChange({
            target: { checked: apiData.isdisplayUnderSummaryPage || false },
          });
        }

        setIsDefectVisible(apiData.intExtDefect || false);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetInfantHistoryApi();
  }, []); // Call the API only when 'triggerFetch' changes to true

  const handleChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    const payload = {
      autoId: 0,
      userId,
      jaundice: data.jaundice,
      soreThroat: data.soreThroat,
      overWeight: data.overWeight,
      underWeight: data.underWeight,
      intExtDefect: data.intExtDefect,
      remarks: data.intExtDefect ? data.remarks : "",
      isPasswordProtected: isPasswordProtected || false,
      isDisplayUnderSummaryPage: isdisplayUnderSummaryPage || false,
    };

    try {
      const response = await axios.post(
        "https://service.healthcapita.com/api/PHR/SaveInfantHistory",
        payload
      );
      console.log(response?.data?.status);
      if (response?.data?.status) {
        console.log("Data saved successfully!");
        console.log(response);
        handleTabChange(5);
        // setActiveTab(5);

        setIsDefectVisible(false);
      } else {
        console.error("Failed to save data.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Oval
          visible={true}
          height="40"
          width="40"
          color="#4fa94d"
          ariaLabel="oval-loading"
        />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 pb-10">
        {[
          {
            label: "Did the child suffer from jaundice after birth",
            key: "jaundice",
          },
          {
            label: "Did the Child Suffered from repeated Sore Throat",
            key: "soreThroat",
          },
          { label: "Was Child Overweight at Birth", key: "overWeight" },
          { label: "Was the child Underweight at Birth", key: "underWeight" },
        ].map((item) => (
          <div key={item.key} className="flex items-center">
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={data[item.key]}
              onChange={() => handleChange(item.key, !data[item.key])}
            />
            <label className="ml-2 font-semibold">{item.label}</label>
          </div>
        ))}

        <div>
          <p className="font-semibold">
            Any detected congenital internal/external Defect
          </p>
          <div className="flex items-center space-x-4 py-3">
            <input
              type="radio"
              className="custom-radio"
              checked={data.intExtDefect}
              onChange={() => {
                handleChange("intExtDefect", true);
                setIsDefectVisible(true);
              }}
            />
            <label>Yes</label>
            <input
              type="radio"
              className="custom-radio"
              checked={!data.intExtDefect}
              onChange={() => {
                handleChange("intExtDefect", false);
                setIsDefectVisible(false);
                handleChange("remarks", ""); // Clear remarks if 'No' is selected
              }}
            />
            <label>No</label>
          </div>
        </div>

        {isDefectVisible && (
          <div className="p-4 bg-white border border-gray-200 rounded mt-2">
            <input
              type="text"
              className="w-full p-2   focus:outline-none"
              placeholder="Enter remarks"
              value={data.remarks}
              onChange={(e) => handleChange("remarks", e.target.value)}
            />
          </div>
        )}
      </div>

      <UpdateDetailsBtn onClick={handleSave} />
    </>
  );
};

export default InfantHistory;