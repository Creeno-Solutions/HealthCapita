import { useState, useEffect } from "react";
import axios from "axios";
import UpdateDetailsBtn from "../../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";

const CurrentHealthStatus = ({
  isPasswordProtected,
  isDisplayUnderSummaryPage,
  handleProtectChange,
  handleDisplayChange,
  handleTabChange,
}) => {
  const userId = 10;
  const [data, setData] = useState({
    autoid: 0,
    userId: userId,
    currentSuffering: "",
    currentSufferingStatus: false,
    currentTakingAnyTreatment: "",
    currentTreatmentStatus: false,
    isPasswordProtected: false,
    isDisplayUnderSummaryPage: false,
  });
  // 22
  const GetCurrentHealthStatusApi = async () => {
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetCurentHealthStatusyId?UserId=${userId}`
      );
      console.log("CurrentHealthStatus", response);
      if (response?.data?.isData) {
        const responseData = response.data.data;
        if (responseData) {
          setData({
            ...data,
            autoid: responseData.autoid || 0,
            currentSuffering: responseData.currentSuffering || "",
            currentSufferingStatus:
              responseData.currentSufferingStatus || false,
            currentTakingAnyTreatment:
              responseData.currentTakingAnyTreatment || "",
            currentTreatmentStatus:
              responseData.currentTreatmentStatus || false,
          });
          handleProtectChange({
            target: { checked: responseData.isPasswordProtected || false },
          });
          handleDisplayChange({
            target: {
              checked: responseData.isDisplayUnderSummaryPage || false,
            },
          });
        }
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    GetCurrentHealthStatusApi();
  }, []);

  const handlePostApi = async () => {
    try {
      const response = await axios.post(
        "https://service.healthcapita.com/api/PHR/SaveCurentHealthStatus",
        {
          ...data,
          isPasswordProtected: isPasswordProtected,
          isDisplayUnderSummaryPage: isDisplayUnderSummaryPage,
        }
      );
      console.log("response", response);
      if (response?.data?.status) {
        console.log(" Data updated successfully");
        handleTabChange(2);
      } else {
        console.error(" Failed to update data");
      }
    } catch (error) {
      console.error(" Error sending data:", error);
    }
  };

  return (
    <>
      <div className="px-2 my-3">
        {/* Currently Suffering Section */}
        <p className="text-base font-semibold py-5">
          Currently suffering from any illness
        </p>
        <div className="flex gap-3 pb-5">
          <div className="flex items-center gap-2">
            <input
              className="custom-radio"
              type="radio"
              name="illness"
              checked={data.currentSufferingStatus}
              onChange={() =>
                setData((prev) => ({ ...prev, currentSufferingStatus: true }))
              }
            />
            <label>Yes</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              className="custom-radio"
              type="radio"
              name="illness"
              checked={!data.currentSufferingStatus}
              onChange={() =>
                setData((prev) => ({
                  ...prev,
                  currentSufferingStatus: false,
                  currentSuffering: "",
                }))
              }
            />
            <label>No</label>
          </div>
        </div>

        {data.currentSufferingStatus && (
          <input
            type="text"
            placeholder="Enter the Illness"
            value={data.currentSuffering}
            onChange={(e) =>
              setData((prev) => ({ ...prev, currentSuffering: e.target.value }))
            }
            className="h-20 sm:w-3/4 w-full p-3 bg-white border border-gray-200 rounded focus:outline-none"
          />
        )}

        {/* Currently on Any Medication Section */}
        <p className="text-base font-semibold py-5">
          Currently on any medication
        </p>
        <div className="flex gap-3 pb-2">
          <div className="flex items-center gap-2">
            <input
              className="custom-radio"
              type="radio"
              name="medication"
              checked={data.currentTreatmentStatus}
              onChange={() =>
                setData((prev) => ({ ...prev, currentTreatmentStatus: true }))
              }
            />
            <label>Yes</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              className="custom-radio"
              type="radio"
              name="medication"
              checked={!data.currentTreatmentStatus}
              onChange={() =>
                setData((prev) => ({
                  ...prev,
                  currentTreatmentStatus: false,
                  currentTakingAnyTreatment: "",
                }))
              }
            />
            <label>No</label>
          </div>
        </div>

        {data.currentTreatmentStatus && (
          <input
            type="text"
            placeholder="Enter the Treatment"
            value={data.currentTakingAnyTreatment}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                currentTakingAnyTreatment: e.target.value,
              }))
            }
            className="h-20 sm:w-3/4 w-full p-3 text-black bg-white border border-gray-200 rounded focus:outline-none"
          />
        )}
      </div>

      <UpdateDetailsBtn onClick={handlePostApi} />
    </>
  );
};

export default CurrentHealthStatus;