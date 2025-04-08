import { useNavigate } from "react-router-dom";
import { PhrAssets } from "../../../../../assets/PHR/assets";
import Separator from "../../../../../CommonComponents/Separator";
import { useState } from "react";
import axios from "axios";
import UserInfo from "../../../../../utils/UserInfo";
import PhrUpdateHeader from "../../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import PhrProtectwithPassword from "../../../../../CommonComponents/PhrUpdateHeader/PhrProtectwithPassword";
import UpdateDetailsBtn from "../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";

const FamilyDetailsUpdate = () => {
  const navigate = useNavigate()
  const userId = UserInfo();
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    relationShip: "",
    gender: "",
    cityId: "",
    otherCity: "",
    countryId: "",
    stateId: "",
    otherState: "",
    pobox: "",
    address: "",
    countryCode: "",
    email: "",
    dateOfBirth: "",
    age: 0,
    mobile: "",
    isPasswordProtected: false,
    isDisplayUnderSummaryPage: false,
    userId: userId,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sameAsMemberAddress, setSameAsMemberAddress] = useState(false);

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

  const fetchMemberAddress = async () => {
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetFamilyContactAddressById?UserId=${userId}`
      );
      // const data = await response.json();

      setFormData((prev) => ({
        ...prev,
        countryId: response?.data?.data?.countryId,
        cityId: response?.data?.data?.cityId,
        stateId: response?.data?.data?.stateId,
        pobox: response?.data?.data?.pobox,
        address: response?.data?.data?.address,
      }));
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setSameAsMemberAddress(checked);

    if (checked) {
      fetchMemberAddress();
    } else {
      // Allow user to enter address manually
      setFormData((prev) => ({
        ...prev,
        countryId: "",
        cityId: "",
        stateId: "",
        pobox: "",
        address: "",
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle form submission here (e.g., make an API call)
    try {
      const response = await axios.post(
        "https://service.healthcapita.com/api/PHR/SaveFamilyDetails",
        formData
      );
      console.log("response......", response);
      if (response?.data?.status) {
        closePage();
      }
    } catch (error) {
      console.log(error);
      console.log("chandu");
    }
  };
console.log(formData.isDisplayUnderSummary)
  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        <PhrUpdateHeader />
        <PhrProtectwithPassword
          Title="Family Details"
          isProtected={formData.isPasswordProtected}
          isDisplayed={formData.isDisplayUnderSummary}
          onProtectChange={handleChange}
          onDisplayChange={handleChange}
        />

        <div className="py-4 px-4 sm:px-6 md:px-4 lg:px-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="flex flex-col gap-2">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  className="border border-gray-300 py-2 px-3 rounded-md w-4/5 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Date Of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  name="dateOfBirth"
                  className="border border-gray-300 py-2 px-3 rounded-md w-4/5 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="border border-gray-300 py-2 px-3 rounded-md w-4/5 focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                  <option value="o">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label>Relation</label>
                <input
                  type="text"
                  name="relation"
                  value={formData.relation}
                  onChange={handleChange}
                  placeholder="Enter Relation"
                  className="border border-gray-300 py-2 px-3 rounded-md w-4/5 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>His/Her Relationship</label>
                <input
                  type="text"
                  name="relationShip"
                  value={formData.relationShip}
                  onChange={handleChange}
                  placeholder="Enter Relation"
                  className="border border-gray-300 py-2 px-3 rounded-md w-4/5 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Mobile No</label>
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Mobile No"
                  className="border border-gray-300 py-2 px-3 rounded-md w-4/5 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Email"
                  className="border border-gray-300 py-2 px-3 rounded-md w-4/5 focus:outline-none"
                />
              </div>
            </div>
            <Separator />

            <p className="font-semibold py-3">Address</p>
            <div className="flex gap-3">
              <input
                type="checkbox"
                checked={sameAsMemberAddress}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="">Same as Member Address</label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="flex flex-col gap-2">
                <label>Country</label>
                <select
                  value={formData.countryId}
                  onChange={handleChange}
                  disabled={sameAsMemberAddress}
                  name="countryId"
                  className="border border-gray-300 py-2 px-3 rounded-md w-4/5 focus:outline-none"
                >
                  <option value="">Select Country</option>
                  <option value="1">India</option>
                  <option value="2">USA</option>
                  <option value="3">UK</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="area">Area</label>
                <select
                  value={formData.cityId}
                  disabled={sameAsMemberAddress}
                  onChange={handleChange}
                  name="cityId"
                  className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none"
                >
                  <option value="">Select Area</option>
                  <option value="1">A Ali</option>
                  <option value="2">JNTU</option>
                  <option value="3">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label>Governate</label>
                <select
                  value={formData.stateId}
                  disabled={sameAsMemberAddress}
                  onChange={handleChange}
                  name="stateId"
                  className="border border-gray-300 py-2 px-3 rounded-md w-4/5 focus:outline-none"
                >
                  <option value="1">Northern</option>
                  <option value="2">Southern</option>
                  <option value="3">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label>P.O Box</label>
                <input
                  name="pobox"
                  disabled={sameAsMemberAddress}
                  value={formData.pobox}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter P.O Box"
                  className="border border-gray-300 py-2 px-3 rounded-md w-4/5 focus:outline-none"
                />
              </div>
              <div className="flex flex-col col-span-2 w-[745px]">
                <label>Address</label>
                <textarea
                  name="address"
                  disabled={sameAsMemberAddress}
                  value={formData.address}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Address"
                  className="border border-gray-300 py-2 px-3 rounded-md  focus:outline-none"
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

export default FamilyDetailsUpdate;
