import { useNavigate } from "react-router-dom";
import { PhrAssets } from "../../../../../assets/PHR/assets";
import { useState } from "react";
import axios from "axios";
import UserInfo from "../../../../../utils/UserInfo";
import PhrUpdateHeader from "../../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import PhrProtectwithPassword from "../../../../../CommonComponents/PhrUpdateHeader/PhrProtectwithPassword";
import UpdateDetailsBtn from "../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";

const EmployerInfoUpdate = () => {
  const userId = UserInfo();
  const [formData, setFormData] = useState({
    userId: userId,
    employeeId: 0,
    employerName: "",
    employeeCategory: "",
    offAddress: "",
    cityId: "",
    otherCity: "",
    stateid: "1",
    otherState: "",
    countryid: "",
    pinCode: "",
    phone: "",
    countryCode: "",
    isPasswordProtected: false,
    isDisplayUnderSummaryPage: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://service.healthcapita.com/api/PHR/SaveEmploymentInformation",
        formData
      );
    } catch (error) {
      console.error("Error saving contact information", error);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <PhrUpdateHeader />
        <PhrProtectwithPassword
          Title="Employer Info"
          isProtected={formData.isPasswordProtected}
          isDisplayed={formData.isDisplayUnderSummary}
          onProtectChange={handleChange}
          onDisplayChange={handleChange}
        />
        <div className="py-4 px-4 sm:px-6 md:px-4 lg:px-12">
          <form className="flex flex-col gap-4 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-normal">Category</label>
                <select
                  name="employeeCategory"
                  value={formData.employeeCategory}
                  onChange={handleChange}
                  className="border  border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Salaried">Salaried</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-normal">Employer Name</label>
                <input
                  type="text"
                  name="employerName"
                  value={formData.employerName}
                  onChange={handleChange}
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                  placeholder="Enter Your Employer Name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-normal">Landline No.</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                  placeholder="Enter Landline No."
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-normal">Country</label>
                <select
                  name="countryid"
                  value={formData.countryid}
                  onChange={handleChange}
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="2">India</option>
                  <option value="3">USA</option>
                  <option>UK</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-normal">Governate</label>
                <select
                  name="cityId"
                  value={formData.cityId}
                  onChange={handleChange}
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="2">Northern Governate</option>
                  <option value="3">Southern Governate</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-normal">Area</label>
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="1">A Ali</option>
                  <option value="2">JNTU</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-normal">P.O. Box</label>
                <input
                  type="number"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                  placeholder="Enter P.O. Box"
                />
              </div>
              <div className="flex flex-col col-span-2">
                <label className="font-normal">Address</label>
                <textarea
                  type="text"
                  name="offAddress"
                  value={formData.offAddress}
                  onChange={handleChange}
                  className="border border-gray-300 py-2 px-3 rounded-md w-[725px] focus:outline-none"
                  placeholder="Enter Address"
                />
              </div>
            </div>
            <div className="my-5">
              <UpdateDetailsBtn onClick={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployerInfoUpdate;
