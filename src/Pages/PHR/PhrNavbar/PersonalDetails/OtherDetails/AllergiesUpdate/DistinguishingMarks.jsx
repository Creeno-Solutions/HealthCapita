import axios from "axios";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import UpdateDetailsBtn from "../../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";

const DistinguishingMarks = ({
  isPasswordProtected,
  isdisplayUnderSummaryPage,
  handleProtectChange,
  handleDisplayChange,
  handleTabChange,
}) => {
  const [data, setData] = useState({
    tattoo: "no",
    scar: "no",
    burnMark: "no",
    isPasswordProtected: false,
    isdisplayUnderSummaryPage: false,
  });
  const [colorMasterData, setColorMasterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleBirthMarks, setVisibleBirthMarks] = useState(1);
  const userId = 40;
  //30, 40

  // console.log(data);

  const GetDistinguishingMarksApi = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetDistinguishMarkWithColorById?userId=${userId}`
      );

      const apiData = response?.data?.data || {};
      const userDetails = apiData?.userDetails || {};
      console.log(response);

      if (userDetails) {
        setData((prev) => ({
          ...prev,
          ...userDetails,
          userId: userId,
          tattoo: userDetails.tattoo || "no",
          scar: userDetails.scar || "no",
          burnMark: userDetails.burnMark || "no",
        }));

        handleProtectChange({
          target: { checked: userDetails.isPasswordProtected || false },
        });
        handleDisplayChange({
          target: { checked: userDetails.isdisplayUnderSummaryPage || false },
        });
      }

      setColorMasterData(apiData?.colorMasterData || []);

      const existingBirthMarksCount = Object.keys(userDetails).filter(
        (key) => key.startsWith("birthMark") && userDetails[key]
      ).length;

      setVisibleBirthMarks(existingBirthMarksCount || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetDistinguishingMarksApi();
  }, []);

  const handleAddAlternativeMark = () => {
    if (visibleBirthMarks < 5) {
      setVisibleBirthMarks((prev) => prev + 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const updatedData = { ...data };
    for (let i = 1; i <= 5; i++) {
      if (!updatedData[`birthMark${i}`]) {
        updatedData[`birthMark${i}`] = "";
      }
    }

    const payload = {
      userId: userId,
      ...updatedData,
      isPasswordProtected: isPasswordProtected,
      isdisplayUnderSummaryPage: isdisplayUnderSummaryPage,
    };

    console.log("distinguishingggggg:", payload);

    try {
      const response = await axios.post(
        "https://service.healthcapita.com/api/PHR/SaveDistinguishMarkAndColor",
        payload
      );
      console.log("Full response:", response?.data?.status);
      if (
        response?.data?.status === true ||
        response?.data?.status === "true" ||
        response?.data?.status === 1
      ) {
        console.log("Data saved successfully!");

        handleTabChange(3);
      } else {
        console.error("Failed to save data. Response:", response?.data);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
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

  const distinguishingMarks = [
    { label: "Tattoo", key: "tattoo" },
    { label: "Scar", key: "scar" },
    { label: "Burn Mark", key: "burnMark" },
  ];

  const renderOptions = (tabName) => {
    return colorMasterData
      .filter((item) => item.tabName.toLowerCase() === tabName.toLowerCase())
      .map((item) => (
        <option key={item.id} value={item.id}>
          {item.colorName}
        </option>
      ));
  };

  return (
    <>
      <div className="px-2 mb-3 pt-3 pb-4 overflow-hidden">
        <p className="text-sm">Birth Mark</p>
        <div className="space-y-3">
          {[...Array(visibleBirthMarks)].map((_, index) => (
            <input
              key={index}
              className="mr-3 w-1/4 my-3 py-1 px-3 border rounded-md border-gray-300 placeholder:text-sm focus:outline-none"
              type="text"
              placeholder={`Enter Birth Mark ${index + 1}`}
              value={data[`birthMark${index + 1}`] || ""}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  [`birthMark${index + 1}`]: e.target.value,
                }))
              }
            />
          ))}
        </div>
        {visibleBirthMarks < 5 && (
          <button
            onClick={handleAddAlternativeMark}
            className="text-[#1C9401] pb-3 text-base font-semibold tracking-wide"
          >
            + Add Alternative Marks
          </button>
        )}

        <div className="flex justify-between items-center">
          {distinguishingMarks.map(({ label, key }) => (
            <div key={key} className="pt-3">
              <p className="font-semibold text-base tracking-wide">{label}</p>
              <div className="flex gap-3">
                <label>
                  <input
                    type="radio"
                    name={key}
                    value="yes"
                    checked={data[key] === "yes"}
                    onChange={handleChange}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={key}
                    value="no"
                    checked={data[key] === "no"}
                    onChange={handleChange}
                  />{" "}
                  No
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-5">
          <div>
            <label className="font-semibold text-base tracking-wide">
              Hair Color
            </label>
            <select
              value={data.hairColorId || ""}
              onChange={(e) =>
                setData((prev) => ({ ...prev, hairColorId: e.target.value }))
              }
              className="h-10 w-full mt-1"
            >
              <option value="">Select Hair Color</option>
              {renderOptions("Hair Color")}
            </select>
          </div>

          <div>
            <label className="font-semibold text-base tracking-wide">
              Skin Color
            </label>
            <select
              value={data.skinId || ""}
              onChange={(e) =>
                setData((prev) => ({ ...prev, skinId: e.target.value }))
              }
              className="h-10 w-full mt-1"
            >
              <option value="">Select Skin Color</option>
              {renderOptions("Skin Color")}
            </select>
          </div>

          <div>
            <label className="font-semibold text-base tracking-wide">
              Eye Color
            </label>
            <select
              value={data.eyeColorId || ""}
              onChange={(e) =>
                setData((prev) => ({ ...prev, eyeColorId: e.target.value }))
              }
              className="h-10 w-full mt-1"
            >
              <option value="">Select Eye Color</option>
              {renderOptions("Eye Color")}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <textarea
            value={data.otherMarks || ""}
            placeholder="Enter other distinguishing marks"
            onChange={(e) =>
              setData((prev) => ({ ...prev, otherMarks: e.target.value }))
            }
            className="w-full p-4"
          />
        </div>
      </div>

      <UpdateDetailsBtn onClick={handleSave} />
    </>
  );
};

export default DistinguishingMarks;