import { useState } from "react";
import Dentalupdate from "./DentalUpdate";
import Hearingupdate from "./HearingUpdate";
import ImmunizationUpdate from "./ImmunizationUpdate";
import OpticalUpdate from "./OpticalUpdate";
import ProsthesisUpdate from "./ProsthesisUpdate";
import FamilyMedicalHistoryUpdate from "./FamilyMedicalHistoryUpdate";
import ImpairmentsUpdate from "./ImpairmentsUpdate";
import { useLocation, useNavigate } from "react-router-dom";
import PhrProtectwithPassword from "../../../../../CommonComponents/PhrUpdateHeader/PhrProtectwithPassword";

const OtherHistoryFields = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location?.state?.activeTab || 0);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [isDisplayUnderSummaryPage, setIsDisplayUnderSummaryPage] =
    useState(false);
  const navigate = useNavigate();

  // const closePage = () => {
  //   navigate("/phr");
  // };

  const onProtectChange = (e) => {
    setIsPasswordProtected(e.target.checked);
  };

  const onDisplayChange = (e) => {
    setIsDisplayUnderSummaryPage(e.target.checked);
  };

  const handleTabChange = (index) => {
    setIsPasswordProtected(false);
    setIsDisplayUnderSummaryPage(false);
    setActiveTab(index);
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Dentalupdate
            isPasswordProtected={isPasswordProtected}
            isDisplayUnderSummaryPage={isDisplayUnderSummaryPage}
            handleProtectChange={onProtectChange}
            handleDisplayChange={onDisplayChange}
            handleTabChange={handleTabChange}
          />
        );
      case 1:
        return <Hearingupdate />;
      case 2:
        return <ImmunizationUpdate />;
      case 3:
        return <ImpairmentsUpdate />;
      case 4:
        return <OpticalUpdate />;
      case 5:
        return <ProsthesisUpdate />;
      case 6:
        return <FamilyMedicalHistoryUpdate />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Main Section */}
        <div className="px-2 md:p-5 xl:px-10 lg:px-4 sm:px-4 w-full">
          <PhrProtectwithPassword
            Title="Other History"
            isProtected={isPasswordProtected}
            isDisplayed={isDisplayUnderSummaryPage}
            onProtectChange={onProtectChange}
            onDisplayChange={onDisplayChange}
          />
          <div className="flex flex-col lg:flex-row">
            {/* Button Tabs */}
            <div className="w-full sm:w-full lg:w-[30%] flex flex-row lg:flex-col overflow-x-auto lg:overflow-hidden gap-2 px-2 pt-10">
              {[
                "Dental",
                "Hearing",
                "Immunization",
                "Impairments",
                "Optical",
                "Prosthesis",
                "FamilyMedicalHistory",
              ].map((label, index) => (
                <button
                  key={index}
                  onClick={() => handleTabChange(index)}
                  className={`flex-shrink-0 whitespace-nowrap px-2 lg:px-3 py-3 text-sm lg:text-base text-left font-semibold transition duration-300 ease-in-out ${
                    activeTab === index
                      ? "bg-[#EBF8FF] text-black hover:bg-[#1C9401] hover:text-white rounded-lg"
                      : "text-gray-500 hover:bg-[#F9FAFB] hover:rounded-se-full hover:rounded-ee-full"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[450px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 md:w-[85%]  bg-[#F9FAFB] px-4 py-3 mt-6 mb-16 rounded-lg ">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherHistoryFields;
