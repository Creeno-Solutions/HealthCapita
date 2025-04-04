import { PhrAssets } from "../../../../../../assets/PHR/assets";
import { useNavigate } from "react-router-dom";
import AllergiesAndDrugs from "./AllergiesAndDrugs";
import CurrentHealthStatus from "./CurrentHealthStatus";
import DistinguishingMarks from "./DistinguishingMarks";
import Ethnicity from "./Ethnicity";
import InfantHistory from "./InfantHistory";
import { useState } from "react";
import SocialHistory from "./SocialHistory";
import { useLocation } from "react-router-dom";
import PhrProtectwithPassword from "../../../../../../CommonComponents/PhrUpdateHeader/PhrProtectwithPassword";
const OverviewPhrUpdate = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 0);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [isdisplayUnderSummaryPage, setIsDisplayUnderSummaryPage] =
    useState(false);
  const navigate = useNavigate();

  const closePage = () => {
    navigate("/phr");
  };

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
          <AllergiesAndDrugs
            setActiveTab={setActiveTab}
            isPasswordProtected={isPasswordProtected}
            isdisplayUnderSummaryPage={isdisplayUnderSummaryPage}
            handleProtectChange={onProtectChange}
            handleDisplayChange={onDisplayChange}
            handleTabChange={handleTabChange}
          />
        );
      case 1:
        return (
          <CurrentHealthStatus
            setActiveTab={setActiveTab}
            isPasswordProtected={isPasswordProtected}
            isdisplayUnderSummaryPage={isdisplayUnderSummaryPage}
            handleProtectChange={onProtectChange}
            handleDisplayChange={onDisplayChange}
            handleTabChange={handleTabChange}
          />
        );
      case 2:
        return (
          <DistinguishingMarks
            isPasswordProtected={isPasswordProtected}
            isdisplayUnderSummaryPage={isdisplayUnderSummaryPage}
            handleProtectChange={onProtectChange}
            handleDisplayChange={onDisplayChange}
            handleTabChange={handleTabChange}
          />
        );
      case 3:
        return (
          <Ethnicity
            setActiveTab={setActiveTab}
            isPasswordProtected={isPasswordProtected}
            isdisplayUnderSummaryPage={isdisplayUnderSummaryPage}
            handleProtectChange={onProtectChange}
            handleDisplayChange={onDisplayChange}
            handleTabChange={handleTabChange}
          />
        );
      case 4:
        return (
          <InfantHistory
            isPasswordProtected={isPasswordProtected}
            isdisplayUnderSummaryPage={isdisplayUnderSummaryPage}
            handleProtectChange={onProtectChange}
            handleDisplayChange={onDisplayChange}
            handleTabChange={handleTabChange}
          />
        );
      case 5:
        return (
          <SocialHistory
            isPasswordProtected={isPasswordProtected}
            isdisplayUnderSummaryPage={isdisplayUnderSummaryPage}
            handleProtectChange={onProtectChange}
            handleDisplayChange={onDisplayChange}
            handleTabChange={handleTabChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-4 px-4 sm:px-6 md:px-4 lg:px-12 bg-[#007183] shadow-md w-full">
          <div className="flex items-center space-x-3">
            <img src={PhrAssets.PhrIcon} alt="Logo" className="w-8 h-8" />
            <p className="border border-r-0 h-6 border-white"></p>
            <h2 className="md:text-3xl text-xl font-semibold text-white">
              Edit Personal Health Record
            </h2>
          </div>

          <button
            onClick={closePage}
            className="text-white text-xl font-semibold tracking-wide"
          >
            X <span className="hidden md:inline">Close</span>
          </button>
        </header>
        <div className="px-2 md:p-5 xl:px-10 lg:px-4 sm:px-4 w-full">
          <PhrProtectwithPassword
            Title="Other Details"
            isProtected={isPasswordProtected}
            isDisplayed={isdisplayUnderSummaryPage}
            onProtectChange={onProtectChange}
            onDisplayChange={onDisplayChange}
          />
          {/* Tabs and Content */}
          <div className="flex flex-col lg:flex-row">
            {/* Button Tabs */}
            <div className="w-full sm:w-full lg:w-[30%] flex flex-row lg:flex-col overflow-x-auto lg:overflow-hidden gap-2 px-2 pt-10">
              {[
                "Allergies and Drugs Sensitivity",
                "Current Health Status",
                "Distinguishing Marks",
                "Ethnicity",
                "Infant History",
                "Social History",
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
            <div className="overflow-y-auto max-h-[450px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 md:w-[85%]  bg-[#F9FAFB] px-4 pt-3 pb-16 mt-6 mb-16 h-auto rounded-lg ">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewPhrUpdate;