import { useNavigate } from "react-router-dom";
import Update from "../../../../CommonComponents/Update/Update";
import axios from "axios";
import { useEffect, useState } from "react";

const Dental = () => {
  const navigate = useNavigate();
  const openDentalUpdatePage = () => {
    console.log("Navigating to /otherHistoryFields");
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/otherHistoryFields", { state: { activeTab: 0 } });
  };

  const userId = 10;
  const [data, setData] = useState({});
  const getData = async () => {
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetDentalData?userId=${userId}`
      );
      console.log("data", response?.data?.data);
      if (response?.data?.status) {
        setData(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="px-2 py-3">
        <div className="flex justify-between">
          <h2 className="font-semibold text-lg">Dental</h2>
          <Update onClick={openDentalUpdatePage} />
        </div>

        <p className="border-b border-gray-200 px-2 mt-3"></p>

        <div className="flex gap-20">
          {/* <div className="py-4 flex flex-col gap-2">
            {[
              "Implants",
              "Root Canal",
              "Partial Dental",
              "Bridges",
              "Braces",
            ].map((item, index) => (
              <div key={index} className="flex justify-between w-72 text-base">
                <p className="min-w-[140px]">{item}:</p>
                <p className="font-semibold">Yes</p>
              </div>
            ))}
          </div>

          <div className="py-4 flex flex-col gap-2">
            {[
              "Capping",
              "Full Dentures",
              "Crowns",
              "Gum Disease",
              "Extraction of Tooth",
            ].map((item, index) => (
              <div key={index} className="flex justify-between w-72 text-base">
                <p className="min-w-[140px]">{item}:</p>
                <p className="font-semibold">yes</p>
              </div>
            ))}
          </div> */}

          <div className="flex gap-20 px-2">
            {/* Left Column */}
            <div className="py-4 flex flex-col gap-4">
              {Object.entries(data)
                .filter(([key]) =>
                  [
                    "implants",
                    "routeCanel",
                    "partialDental",
                    "bridges",
                    "braces",
                  ].includes(key)
                )
                .map(([key, value], index) => {
                  if (typeof value === "boolean") {
                    const formattedLabel = key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase());
                    const typeKey = `${key}Type`;
                    const typeValue = data[typeKey] || "";
                    const [firstLine, ...restLines] = value
                      ? [`Yes${typeValue ? `: ${typeValue}` : ""}`]
                      : ["No"];

                    return (
                      <div key={index} className="text-base w-72">
                        <div className="flex gap-2">
                          <p className="min-w-[140px]">{formattedLabel}:</p>
                          <p className="font-semibold">{firstLine}</p>
                        </div>
                        {typeValue && (
                          <p className="ml-[140px] font-semibold break-words">
                            {typeValue
                              .split(":")[1]
                              ?.trim()
                              .split("\n")
                              .slice(1)
                              .join("\n")}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
            </div>

            {/* Right Column */}
            <div className="py-4 flex flex-col gap-4">
              {Object.entries(data)
                .filter(([key]) =>
                  [
                    "capping",
                    "fullDentures",
                    "crowns",
                    "gumdisease",
                    "extractionofTooth",
                  ].includes(key)
                )
                .map(([key, value], index) => {
                  if (typeof value === "boolean") {
                    const formattedLabel = key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase());
                    const typeKey = `${key}Type`;
                    const typeValue = data[typeKey] || "";
                    const [firstLine, ...restLines] = value
                      ? [`Yes${typeValue ? `: ${typeValue}` : ""}`]
                      : ["No"];

                    return (
                      <div key={index} className="text-base w-72">
                        <div className="flex gap-2">
                          <p className="min-w-[140px] ">{formattedLabel}:</p>
                          <p className="font-semibold">{firstLine}</p>
                        </div>
                        {typeValue && (
                          <p className="ml-[140px] break-words">
                            {typeValue
                              .split(":")[1]
                              ?.trim()
                              .split("\n")
                              .slice(1)
                              .join("\n")}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dental;
