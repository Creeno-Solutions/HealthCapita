import { useNavigate } from "react-router-dom";
import { PhrAssets } from "../../../../../assets/PHR/assets";
import { useState } from "react";
import axios from "axios";
import PhrUpdateHeader from "../../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import PhrProtectwithPassword from "../../../../../CommonComponents/PhrUpdateHeader/PhrProtectwithPassword";
import UserInfo from "../../../../../utils/UserInfo";
import UpdateDetailsBtn from "../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";

const EmergencyContactUpdate = () => {
  const navigate = useNavigate();
  const userId = UserInfo();

  const [formData, setFormData] = useState({
    name: "",
    countryId: "",
    relation: "",
    mobile: "",
    emailId: "",
    userId: userId,
  });

  const closePage = () => {
    navigate("/phr");
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle form submission here (e.g., make an API call)
    try {
      const response = await axios.post(
        "https://service.healthcapita.com/api/PHR/SaveEmergencyContactInformation",
        formData
      );

      if (response?.data?.status) {
        closePage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}

        <div>
          <PhrUpdateHeader />
          <PhrProtectwithPassword
            Title="Emergency Contact"
            isProtected={formData.isPasswordProtected}
            isDisplayed={formData.isDisplayUnderSummaryPage}
            onProtectChange={handleChange}
            onDisplayChange={handleChange}
          />
        </div>

        <div className="py-4 px-4 sm:px-6 md:px-4 lg:px-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-normal">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  className="border border-gray-300 py-2 px-3 rounded-md focus:outline-none w-3/4"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="relation" className="font-normal">
                  Relation
                </label>
                <input
                  type="text"
                  name="relation"
                  value={formData.relation}
                  onChange={handleChange}
                  placeholder="Enter Relation"
                  className="border border-gray-300 py-2 px-3 rounded-md focus:outline-none w-3/4"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="mobilenumber" className="font-normal">
                  Mobile Number
                </label>
                <div className="flex  w-3/4">
                  <select className="border border-gray-300 py-2 rounded-s-md w-15 focus:outline-none bg-[#F9FAFB]">
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                    <option>+61</option>
                    <option>+81</option>
                  </select>
                  <input
                    type="number"
                    value={formData.mobile}
                    name="mobile"
                    onChange={handleChange}
                    placeholder="Enter Mobile Number"
                    className="border border-gray-300 py-2 px-3 flex-1 rounded-e-md border-l-0 focus:outline-none w-3/4"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="country" className="font-normal">
                  Country
                </label>
                <select
                  name="countryId"
                  value={formData.countryId}
                  onChange={handleChange}
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                >
                  <option value="1">Select</option>
                  <option value="2">India</option>
                  <option value="3">USA</option>
                  <option value="4">UK</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-normal">
                  Email
                </label>
                <input
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className="border border-gray-300 py-2 px-3 rounded-md focus:outline-none w-3/4"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="relative">
          <UpdateDetailsBtn onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default EmergencyContactUpdate;
