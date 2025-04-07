import React from "react";
import QuickToolsAndCard from "./QuickToolsAndCard";

const Dashboard = () => {
  return (
    <div>
      <div className="flex justify-between items-center px-14 py-4 bg-[#F9FAFB]">
        <h1 className="text-3xl">Welcome Back John! </h1>
        <h1 className="text-base text-[#374151]">
          Last Login :{" "}
          <span className="text-base font-semibold">4 April, 2025</span>
        </h1>
      </div>
      <QuickToolsAndCard />
    </div>
  );
};

export default Dashboard;
