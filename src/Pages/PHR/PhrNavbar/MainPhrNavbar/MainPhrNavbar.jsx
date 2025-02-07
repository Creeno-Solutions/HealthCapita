import React, { useState } from "react";
import Reports from "../Reports/Reports";
import Allergies from "../Overview/Allergies/Allergies";
import Suggestions from "../Suggestions/Suggestions";
import Summary from "../Summary/Summary";
import MainPersonalDetails from "../PersonalDetails/MainPersonalDetails";

const MainPhrNavbar = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Allergies />;
      case "reports":
        return <Reports />;
      case "Personal Details":
        return <MainPersonalDetails/>;
      case "Suggestions":
        return <Suggestions />;
      case "Summary": 
        return <Summary/>
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto">        
      {/* Tabs Navigation (At the Top) */}
      <div className="flex mt-2 mx-10">
        {["overview", "reports", "Personal Details", "Suggestions", "Summary"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-6 text-xl font-medium capitalize ${
              activeTab === tab
                ? "border-b-4 border-[#1C9401] text-black" 
                : "border-transparent text-gray-500 hover:border-b-4 hover:border-[#1C9401] hover:text-black"}
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "overview" ? "Overview" : tab === "reports" ? "Reports" : tab === "Personal Details" ? "personal Details" : tab === "Suggestions" ? "Suggestions" : "Summary"}
          </button>
        
        ))}
      </div>

      {/* Content Below Tabs */}
      <p className="border border-b-0 mb-3 border-gray-200 mx-10"></p>
      <div className="rounded-lg">    
        {renderContent()}
      </div>
    </div>
  );
};

export default MainPhrNavbar;


