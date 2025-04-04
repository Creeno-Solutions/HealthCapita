import React, { useState, useEffect } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateDetailsBtn from "../../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";

const Ethnicity = ({
  setActiveTab,
  isPasswordProtected,
  isdisplayUnderSummaryPage,
  handleProtectChange,
  handleDisplayChange,
  handleTabChange,
}) => {
  const userId = 50;
  const [data, setData] = useState({
    isPasswordProtected: false,
    isdisplayUnderSummaryPage: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [otherValue, setOtherValue] = useState("");
  const [ethnicityData, setEthnicityData] = useState({});

  console.log("otherValue", otherValue);
  const defaultEthnicityOptions = {
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
  };
  console.log("data", data);

  const GetEthnicityApi = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetEthnicityDataById?UserId=${userId}`
      );
      console.log("responseddddddd", response?.data?.success);
      if (response?.data?.isData) {
        const responseData = response.data.data;

        const filteredData = Object.fromEntries(
          Object.entries(responseData).filter(
            ([key]) =>
              ![
                "userId",
                "isPasswordProtected",
                "isdisplayUnderSummaryPage",
                "ethnicityDetailId",
              ].includes(key)
          )
        );

        setData({
          ...defaultEthnicityOptions,
          ...filteredData,
          others: !!responseData.otherEthnicity,
          isPasswordProtected: responseData.isPasswordProtected || false,
          isdisplayUnderSummaryPage:
            responseData.isdisplayUnderSummaryPage || false,
        });

        setEthnicityData({
          ...filteredData,
          ethnicityDetailId: responseData.ethnicityDetailId || 0,
          otherEthnicity: responseData.otherEthnicity || "", // Store the text value here
        });

        setOtherValue(responseData.otherEthnicity || ""); // Set the text value correctly
      } else {
        setData(defaultEthnicityOptions);
        setEthnicityData({ ...defaultEthnicityOptions, ethnicityDetailId: 0 });
        setOtherValue("");
      }
    } catch (error) {
      console.error("Error fetching ethnicity data:", error);
      setData(defaultEthnicityOptions);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetEthnicityApi();
  }, []);

  const handleCheckboxChange = (key) => {
    const updatedValue = key === "others" ? !data.others : !data[key];

    const updatedData = { ...data, [key]: updatedValue };
    setData(updatedData);

    if (key === "others") {
      setEthnicityData((prevData) => ({
        ...prevData,
        others: updatedValue,
        otherEthnicity: updatedValue ? otherValue : "", // Store text if checked, clear if unchecked
      }));
    } else {
      setEthnicityData((prevData) => ({
        ...prevData,
        [key]: updatedValue,
      }));
    }

    if (key === "others" && !updatedValue) {
      setOtherValue(""); // Clear text value when 'others' is unchecked
    }
  };

  const handleOtherValueChange = (e) => {
    const value = e.target.value;
    setOtherValue(value);

    setEthnicityData((prevData) => ({
      ...prevData,
      otherEthnicity: value, // Correctly store the text value
    }));
  };

  const handleUpdateClick = async () => {
    // Prepare the payload
    const payload = {
      ethnicityDetailId: ethnicityData.ethnicityDetailId || 0,
      userId,
      indian: data.indian,
      hawaiian: data.hawaiian,
      polynesian: data.polynesian,
      chinese: data.chinese,
      japanese: data.japanese,
      caucasian: data.caucasian,
      filipino: data.filipino,
      africanAmerican: data.africanAmerican,
      hispanic: data.hispanic,
      americanIndian: data.americanIndian,
      eastIndian: data.eastIndian,
      others: data.others,
      otherEthnicity: data.others ? otherValue : "", // Correctly store the "other" value
      isPasswordProtected: data.isPasswordProtected,
      isdisplayUnderSummaryPage: data.isdisplayUnderSummaryPage, // Changed to match backend's required key format
    };

    console.log("Payload sent:", payload); // For debugging purpose

    try {
      const response = await axios.post(
        "https://service.healthcapita.com/api/PHR/SaveEthnicity",
        payload
      );

      console.log("Responseeee:", response);

      if (response?.data?.status) {
        console.log("Data updated successfully!");
        toast.success("Data updated successfully!");
        handleTabChange(4) 
        setActiveTab(4);
      } else {
        console.error("Failed to send data.");
        toast.error("Failed to send data!");
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const renderEthnicityCheckboxes = () => {
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

    return (
      <div className="p-4">
        <div className="flex flex-wrap gap-4">
          {Object.entries(data).map(([key, value]) => {
            // Skip rendering the checkbox for 'otherEthnicity'
            if (key === "otherEthnicity") return null;

            return (
              <div key={key} className="flex items-center gap-3">
                <input
                  className="w-4 h-4 custom-checkbox"
                  type="checkbox"
                  checked={!!value}
                  onChange={() => handleCheckboxChange(key)}
                />
                <label className="capitalize">
                  {key === "others" ? "Other" : key.replace(/([A-Z])/g, " $1")}
                </label>
                {key === "others" && value && (
                  <input
                    type="text"
                    value={otherValue}
                    onChange={handleOtherValueChange}
                    className="h-10 w-40 p-2 border border-gray-300 rounded"
                    placeholder="Specify other"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container mx-auto pb-24">
        {renderEthnicityCheckboxes()}
      </div>
      <UpdateDetailsBtn onClick={handleUpdateClick} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default Ethnicity;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Oval } from "react-loader-spinner";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import UpdateDetailsBtn from "../../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";

// const Ethnicity = ({ setActiveTab }) => {
//   const [data, setData] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [otherValue, setOtherValue] = useState("");
//   const [ethnicityData, setEthnicityData] = useState({});

//   const userId = 50;
//   const isPasswordProtected = false;
//   const isdisplayUnderSummaryPage = false;
//   console.log("otherValue", otherValue);
//   const defaultEthnicityOptions = {
//     indian: false,
//     hawaiian: false,
//     polynesian: false,
//     chinese: false,
//     japanese: false,
//     caucasian: false,
//     filipino: false,
//     africanAmerican: false,
//     hispanic: false,
//     americanIndian: false,
//     eastIndian: false,
//     others: false,
//   };
//   console.log("data", data);

//   const GetEthnicityApi = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(
//         `https://service.healthcapita.com/api/PHR/GetEthnicityDataById?UserId=${userId}`
//       );
//       console.log("response", response);
//       if (response?.data?.isData) {
//         const responseData = response.data.data;

//         const filteredData = Object.fromEntries(
//           Object.entries(responseData).filter(
//             ([key]) =>
//               ![
//                 "userId",
//                 "isPasswordProtected",
//                 "isdisplayUnderSummaryPage",
//                 "ethnicityDetailId",
//               ].includes(key)
//           )
//         );

//         setData({
//           ...defaultEthnicityOptions,
//           ...filteredData,
//           others: !!responseData.otherEthnicity, // Checkbox value is true if there is otherEthnicity
//         });

//         setEthnicityData({
//           ...filteredData,
//           ethnicityDetailId: responseData.ethnicityDetailId || 0,
//           otherEthnicity: responseData.otherEthnicity || "", // Store the text value here
//         });

//         setOtherValue(responseData.otherEthnicity || ""); // Set the text value correctly
//       } else {
//         setData(defaultEthnicityOptions);
//         setEthnicityData({ ...defaultEthnicityOptions, ethnicityDetailId: 0 });
//         setOtherValue("");
//       }
//     } catch (error) {
//       console.error("Error fetching ethnicity data:", error);
//       setData(defaultEthnicityOptions);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     GetEthnicityApi();
//   }, []);

//   const handleCheckboxChange = (key) => {
//     const updatedValue = key === "others" ? !data.others : !data[key];

//     const updatedData = { ...data, [key]: updatedValue };
//     setData(updatedData);

//     if (key === "others") {
//       setEthnicityData((prevData) => ({
//         ...prevData,
//         others: updatedValue,
//         otherEthnicity: updatedValue ? otherValue : "", // Store text if checked, clear if unchecked
//       }));
//     } else {
//       setEthnicityData((prevData) => ({
//         ...prevData,
//         [key]: updatedValue,
//       }));
//     }

//     if (key === "others" && !updatedValue) {
//       setOtherValue(""); // Clear text value when 'others' is unchecked
//     }
//   };

//   const handleOtherValueChange = (e) => {
//     const value = e.target.value;
//     setOtherValue(value);

//     setEthnicityData((prevData) => ({
//       ...prevData,
//       otherEthnicity: value, // Correctly store the text value
//     }));
//   };

//   const handleUpdateClick = async () => {
//     // Prepare the payload
//     const payload = {
//       ethnicityDetailId: ethnicityData.ethnicityDetailId || 0,
//       userId,
//       indian: data.indian,
//       hawaiian: data.hawaiian,
//       polynesian: data.polynesian,
//       chinese: data.chinese,
//       japanese: data.japanese,
//       caucasian: data.caucasian,
//       filipino: data.filipino,
//       africanAmerican: data.africanAmerican,
//       hispanic: data.hispanic,
//       americanIndian: data.americanIndian,
//       eastIndian: data.eastIndian,
//       others: data.others,
//       otherEthnicity: data.others ? otherValue : "", // Correctly store the "other" value
//       isPasswordProtected,
//       isdisplayUnderSummaryPage, // Changed to match backend's required key format
//     };

//     console.log("Payload sent:", payload); // For debugging purpose

//     try {
//       const response = await axios.post(
//         "https://service.healthcapita.com/api/PHR/SaveEthnicity",
//         payload
//       );

//       console.log("Responseeee:", response);

//       if (response?.data?.status) {
//         console.log("Data updated successfully!");
//         toast.success("Data updated successfully!");
//         setTimeout(() => setActiveTab(4), 1000);
//       } else {
//         console.error("Failed to send data.");
//         toast.error("Failed to send data!");
//       }
//     } catch (error) {
//       console.error("Error sending data to backend:", error);
//     }
//   };

//   const renderEthnicityCheckboxes = () => {
//     if (isLoading) {
//       return (
//         <div className="flex justify-center items-center min-h-screen">
//           <Oval
//             visible={true}
//             height="40"
//             width="40"
//             color="#4fa94d"
//             ariaLabel="oval-loading"
//           />
//         </div>
//       );
//     }

//     return (
//       <div className="p-4">
//         <div className="flex flex-wrap gap-4">
//           {Object.entries(data).map(([key, value]) => {
//             // Skip rendering the checkbox for 'otherEthnicity'
//             if (key === "otherEthnicity") return null;

//             return (
//               <div key={key} className="flex items-center gap-3">
//                 <input
//                   className="w-4 h-4 custom-checkbox"
//                   type="checkbox"
//                   checked={!!value}
//                   onChange={() => handleCheckboxChange(key)}
//                 />
//                 <label className="capitalize">
//                   {key === "others" ? "Other" : key.replace(/([A-Z])/g, " $1")}
//                 </label>
//                 {key === "others" && value && (
//                   <input
//                     type="text"
//                     value={otherValue}
//                     onChange={handleOtherValueChange}
//                     className="h-10 w-40 p-2 border border-gray-300 rounded"
//                     placeholder="Specify other"
//                   />
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className="container mx-auto pb-24">
//         {renderEthnicityCheckboxes()}
//       </div>
//       <UpdateDetailsBtn onClick={handleUpdateClick} />
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//     </>
//   );
// };

// export default Ethnicity;
