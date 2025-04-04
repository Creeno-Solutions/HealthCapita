import { useNavigate } from "react-router-dom";
import { PhrAssets } from "../../../../../assets/PHR/assets";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import UserInfo from "../../../../../utils/UserInfo";
import PhrUpdateHeader from "../../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import PhrProtectwithPassword from "../../../../../CommonComponents/PhrUpdateHeader/PhrProtectwithPassword";
import UpdateDetailsBtn from "../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";

const InsuranceDetailsUpdate = () => {
  const navigate = useNavigate();
  const userId = UserInfo();
  const location = useLocation();
  const insuranceId = location.state?.insuranceDetailsId || null;
  const [formData, setFormData] = useState({
    insuranceDetailsId: 0,
    userId: userId,
    insuranceCompany: "",
    tpa: "",
    insuranceType: "",
    address: "",
    countryCode: "",
    countryId: "1",
    planName: "",
    subscriptionMethodsId: "1",
    premiumAmount: "",
    insurancePolicyNumber: "",
    isPasswordProtected: false,
    isDisplayUnderSummary: false,
    status: "",
    maturity: "",
    recStatus: "",
  });
  const closePage = () => {
    navigate("/phr");
  };
  useEffect(() => {
    if (insuranceId) {
      axios
        .get(
          `https://service.healthcapita.com/api/PHR/GetInsuranceDetailById?insurencedetailsid=${insuranceId}&userid=${userId}`
        )
        .then((response) => {
          setFormData(response?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [insuranceId]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle form submission here (e.g., make an API call)
    try {
      const response = await axios.post(
        "https://service.healthcapita.com/api/PHR/SaveInsurenceDetails",
        formData
      );
      if(response?.data?.status){
        closePage()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        <PhrUpdateHeader />
        <PhrProtectwithPassword
          Title="Insurance Details"
          isProtected={formData.isPasswordProtected}
          isDisplayed={formData.isDisplayUnderSummary}
          onProtectChange={handleChange}
          onDisplayChange={handleChange}
        />

        <div className="py-4 px-4 sm:px-6 md:px-4 lg:px-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label>Insurance Company</label>
                <input
                  type="text"
                  name="insuranceCompany"
                  value={formData.insuranceCompany}
                  onChange={handleChange}
                  placeholder="Enter Insurance Company"
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Insurance Type</label>
                <select
                  name="insuranceType"
                  value={formData.insuranceType}
                  onChange={handleChange}
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="1">Life</option>
                  <option value="2"> Health</option>
                  <option value="3">Fire</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label>TPA</label>
                <div className="flex  w-3/4">
                  <select className="border border-gray-300 py-2 rounded-s-md border-r-0 focus:outline-none bg-[#F9FAFB]">
                    <option>+1</option>
                    <option>+91</option>
                    <option>+44</option>
                    <option>+61</option>
                    <option>+81</option>
                  </select>
                  <input
                    type="number"
                    name="tpa"
                    value={formData.tpa}
                    onChange={handleChange}
                    placeholder="Enter Mobile Number"
                    className="border border-gray-300 py-2 px-3 flex-1 rounded-e-md focus:outline-none w-3/4"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label>Country</label>
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="1">India</option>
                  <option value="2">USA</option>
                  <option value="3">UK</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label>Insurance Policy No.</label>
                <input
                  name="insurancePolicyNumber"
                  value={formData.insurancePolicyNumber}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Insurance Policy No."
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Premium Amount</label>
                <input
                  type="text"
                  name="premiumAmount"
                  value={formData.premiumAmount}
                  onChange={handleChange}
                  placeholder="Enter Premium Amount"
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Plan Name</label>
                <input
                  type="text"
                  name="planName"
                  value={formData.planName}
                  onChange={handleChange}
                  placeholder="Enter Plan Name"
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Maturity Amount</label>
                <input
                  name="maturity"
                  value={formData.maturity}
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter Maturity Amount"
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <button className="text-[#007183] font-semibold flex justify-center items-center gap-1">
                <img src={PhrAssets.PlusAdd} /> Add
              </button>
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

export default InsuranceDetailsUpdate;
