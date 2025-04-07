import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateDetailsBtn from "../../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";

const Ethnicity = ({
  isPasswordProtected,
  isDisplayUnderSummaryPage,
  handleProtectChange,
  handleDisplayChange,
  handleTabChange,
}) => {
  const userId = 10;
  //11, 10, 15, 20, 60
  const [userEthnicities, setUserEthnicities] = useState({
    ethnicityDetailId: 0,
    userId: userId,
    indian: false,
    hawaiian: false,
    polynesian: false,
    chinese: false,
    japanese: false,
    caucasian: false,
    filipino: false,
    africanAmerican: false,
    hispanic: false,
    americanIndian: false,
    eastIndian: false,
    others: false,
    otherEthnicity: "",
    isPasswordProtected: false,
    isDisplayUnderSummaryPage: false,
  });

  useEffect(() => {
    const ethnicityData = async () => {
      try {
        const response = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetEthnicityDataById?userId=${userId}`
        );
        console.log("ethicityyyyyyyyy", response?.data?.data?.userEthnicities);
        const receivedData = response?.data?.data?.userEthnicities;
        if (receivedData) {
          setUserEthnicities((prevState) => ({
            ...prevState,
            ...receivedData,
            indian: receivedData.indian || false,
            hawaiian: receivedData.hawaiian || false,
            polynesian: receivedData.polynesian || false,
            chinese: receivedData.chinese || false,
            japanese: receivedData.japanese || false,
            caucasian: receivedData.caucasian || false,
            filipino: receivedData.filipino || false,
            africanAmerican: receivedData.africanAmerican || false,
            hispanic: receivedData.hispanic || false,
            americanIndian: receivedData.americanIndian || false,
            eastIndian: receivedData.eastIndian || false,
            others: receivedData.others || false,
            otherEthnicity: receivedData.otherEthnicity || "",
          }));
          handleProtectChange({
            target: { checked: receivedData.isPasswordProtected || false },
          });
          handleDisplayChange({
            target: {
              checked: receivedData.isDisplayUnderSummaryPage || false,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching ethnicity data:", error);
      }
    };

    ethnicityData();
  }, []);

  const handleCheckboxChange = (key) => {
    setUserEthnicities((prev) => {
      // Special handling for 'others'
      if (key === "others") {
        const isChecked = !prev.others;
        return {
          ...prev,
          others: isChecked,
          otherEthnicity: isChecked ? prev.otherEthnicity : "",
        };
      }

      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  };

  const handleSubmit = () => {
    const payload = {
      ...userEthnicities,
      userId,
      isPasswordProtected: isPasswordProtected,
      isDisplayUnderSummaryPage: isDisplayUnderSummaryPage,
    };
    console.log("Payload before submit:", payload);
    axios
      .post("https://service.healthcapita.com/api/PHR/SaveEthnicity", payload)
      .then((res) => {
        console.log("Submitted successfully", res.data);
        handleTabChange(4);
      })
      .catch((err) => console.error(err));
  };

  const formatLabel = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-4">
        {Object.entries(userEthnicities).map(([key, value]) => {
          // Skip non-boolean values and special fields
          if (
            typeof value !== "boolean" ||
            key === "others" ||
            key === "isPasswordProtected" ||
            key === "isDisplayUnderSummaryPage"
          )
            return null;

          return (
            <label
              key={key}
              className="flex items-center space-x-2 text-gray-700"
            >
              <input
                type="checkbox"
                checked={userEthnicities[key]}
                onChange={() => handleCheckboxChange(key)}
                className="accent-blue-500 w-4 h-4"
              />
              <span>{formatLabel(key)}</span>
            </label>
          );
        })}

        <div className="flex gap-3">
          <label className="flex gap-2 items-center my-3 text-gray-700">
            <input
              type="checkbox"
              checked={userEthnicities.others}
              onChange={() => handleCheckboxChange("others")}
              className="accent-blue-500 w-4 h-4"
            />
            <span>Others</span>
          </label>

          {userEthnicities.others && (
            <input
              type="text"
              value={userEthnicities.otherEthnicity}
              onChange={(e) =>
                setUserEthnicities((prev) => ({
                  ...prev,
                  otherEthnicity: e.target.value,
                }))
              }
              className="w-6/6 px-3 py-2 my-3 border rounded-md focus:outline-none"
              placeholder="Enter other ethnicity"
            />
          )}
        </div>
      </div>
      <UpdateDetailsBtn onClick={handleSubmit} />
    </div>
  );
};

export default Ethnicity;
