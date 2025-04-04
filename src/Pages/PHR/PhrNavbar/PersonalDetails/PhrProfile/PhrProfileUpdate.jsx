import { useState, useEffect } from "react";
import { PhrAssets } from "../../../../../assets/PHR/assets";
import UserInfo from "../../../../../utils/UserInfo";
import axios from "axios";
import UpdateDetailsBtn from "../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";
import { useNavigate } from "react-router-dom";

const PhrProfileUpdate = () => {
  const navigate = useNavigate();
  const closePage = () => {
    navigate("/phr");
  };
  const userId = UserInfo();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateofBirth: "",
    gender: "",
    email: "",
    mobile: "",
    phone: "",
    height: "",
    weight: "",
    BloodGroupType: "",
    maritalStatusId: "",
    spouseName: "",
    noOfChildren: "",
    address: "",
    pinCode: "",
    countryId: "",
    stateId: "",
    cityId: "",
    rhesusFactor: "",
    userId: userId,
    OtherCity: "kakinada",
    OtherState: "east godavari",
    MembershipNo: "MembershipNo",
    AlternateEmail: "chandrasekhargollapalli416@gmail.com",
    isDisplayUnderSummary: false,
    isPasswordProtected: false,
  });

  console.log("helloooo");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetMemberById?UserId=${userId}`
        );
        if (response?.data?.isData) {
          setFormData(response?.data?.data);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle form submission here (e.g., make an API call)
    try {
      const response = await axios.post(
        "https://service.healthcapita.com/api/PHR/SaveMemberDetails",
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
          <div className=" flex flex-col sm:flex-row sm:justify-between sm:mx-3 sm:items-center gap-3">
            <div className="flex flex-row items-center gap-2">
              <img
                onClick={closePage}
                className="text-black sm:w-6 cursor-pointer"
                src={PhrAssets.ArrowLeft}
                alt=""
              />
              <p className="border h-5 sm:h-6 sm:border-l-0 border-l-0 border-gray-400"></p>
              <h2 className="md:text-xl text-base lg:text-2xl leading-5 font-semibold">
                Personal Details
              </h2>
              <img
                className="lg:mt-1 h-5 w-5 sm:w-6 sm:h-6"
                src={PhrAssets.InfoCircle}
                alt=""
              />
            </div>
          </div>
          <p className="mx-2 border-b-2 border-gray-100 mt-4"></p>
        </div>
        <div className="w-[100%] flex">
          <form
            onSubmit={handleSubmit}
            className="py-4 px-4 sm:px-6 md:px-4 lg:px-12 w-[70%]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <div className="col-span-3 flex gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none "
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="middleName">Middle Name</label>
                  <input
                    type="text"
                    placeholder="Enter Middle Name"
                    value={formData.middleName}
                    onChange={handleChange}
                    name="middleName"
                    className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none "
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    name="lastName"
                    className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none "
                  />
                </div>
              </div>

              <div className="col-span-3 flex gap-4 items-center">
                <div className="flex flex-col w-full">
                  <label htmlFor="dob">Date Of Birth</label>
                  <input
                    type="date"
                    name="dateofBirth"
                    value={formData.dateofBirth}
                    onChange={handleChange}
                    className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="gender">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none"
                  >
                    <option value="">Select gender</option>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                    <option value="o">Other</option>
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none "
                  />
                </div>
              </div>

              <div className="col-span-3 flex gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="mobile">Mobile Number</label>
                  <div className="flex items-center">
                    <select className="h-[42px] border border-gray-300 border-r-0 rounded-l-md  bg-[#F9FAFB] focus:outline-none">
                      <option value="+1">+1</option>
                      <option value="+91">+91</option>
                      <option value="+44">+44</option>
                      <option value="+61">+61</option>
                    </select>
                    <input
                      type="phone"
                      placeholder="Enter Mobile Number"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="h-[42px] border border-gray-300 rounded-r-md px-3  w-full focus:outline-none "
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="phone">Landline No.</label>
                  <div className="flex items-center">
                    <select className="h-[42px] border border-gray-300  rounded-l-md  border-r-0 bg-[#F9FAFB] focus:outline-none">
                      <option value="+1">+1</option>
                      <option value="+91">+91</option>
                      <option value="+44">+44</option>
                      <option value="+61">+61</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Enter Landline Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-[42px] border border-gray-300 rounded-r-md px-3 w-full focus:outline-none "
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="height">Height (ft.-inch)</label>
                    <input
                      type="number"
                      placeholder="Enter Height"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none "
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="weight">Weight (kgs)</label>
                    <input
                      type="number"
                      placeholder="Enter Weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none "
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <div className="flex gap-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="bloodgroup">Blood Group Type</label>
                    <select
                      name="BloodGroupType"
                      value={formData.BloodGroupType}
                      onChange={handleChange}
                      className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none"
                    >
                      <option value="">Select</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB">AB</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="bloodgroup">Rhesus Factor</label>
                    <select
                      value={formData.rhesusFactor}
                      onChange={handleChange}
                      name="rhesusFactor"
                      className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none"
                    >
                      <option value="">Select</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="-ve">VE</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="maritalstatus">Marital Status</label>
                    <select
                      name="maritalStatusId"
                      value={formData.maritalStatusId}
                      onChange={handleChange}
                      className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none"
                    >
                      <option value="">Select Status</option>
                      <option value="1">Married</option>
                      <option value="2">Unmarried</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-span-3 flex gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="spousename">Spouse Name</label>
                  <input
                    type="text"
                    placeholder="Enter Spouse Name"
                    name="spouseName"
                    value={formData.spouseName}
                    onChange={handleChange}
                    className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none "
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="noofchildren">No. Of Children</label>
                  <input
                    type="number"
                    placeholder="Enter No. Of Children"
                    name="noOfChildren"
                    value={formData.noOfChildren}
                    onChange={handleChange}
                    className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none "
                  />
                </div>
              </div>

              <div className="col-span-3 flex gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="pobox">Pin Code</label>
                  <input
                    type="number"
                    placeholder="Enter P.O. Box"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none "
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="country">Country</label>
                  <select
                    value={formData.countryId}
                    onChange={handleChange}
                    name="countryId"
                    className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none"
                  >
                    <option value="">Select Country</option>
                    <option value="1">India</option>
                    <option value="2">USA</option>
                    <option value="3">UK</option>
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="governate">Governate</label>
                  <select
                    value={formData.stateId}
                    onChange={handleChange}
                    name="stateId"
                    className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none"
                  >
                    <option value="">Select Governate</option>
                    <option value="1">Northern</option>
                    <option value="2">Southern</option>
                    <option value="3">Other</option>
                  </select>
                </div>
              </div>

              <div className="col-span-4 flex gap-4">
                <div className="flex flex-col w-1/4">
                  <label htmlFor="area">Area</label>
                  <select
                    value={formData.cityId}
                    onChange={handleChange}
                    name="cityId"
                    className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none"
                  >
                    <option value="">Select area</option>
                    <option value="1">A Ali</option>
                    <option value="2">JNTU</option>
                    <option value="3">Other</option>
                  </select>
                </div>
              </div>

              <div className="col-span-3">
                <div className="flex flex-col">
                  <label htmlFor="address">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Address"
                    rows="2"
                    className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none "
                  />
                </div>
              </div>
            </div>
          </form>

          <div className="w-[25%] mt-20 mr-14">
            <div className="bg-[#EBF8FF] py-4 px-4 rounded-xl w-4/4">
              <h2 className="text-lg font-semibold text-[#004EBA] mb-2 py-2">
                Upload Image
              </h2>
              <div className="p-2 rounded-lg shadow-sm border border-gray-400 border-dashed py-2">
                <label className="flex items-center justify-center space-x-2 mb-2 cursor-pointer">
                  <img
                    src={PhrAssets.UploadIcon}
                    alt="Upload Icon"
                    className="w-6 h-6"
                  />
                  <span className="text-gray-600 font-medium py-2">
                    Upload Image
                  </span>
                  <input type="file" className="hidden" />
                </label>
                <div className="flex items-center justify-center space-x-2 pt-1">
                  <img
                    src={PhrAssets.InfoCircle}
                    alt="Info Icon"
                    className="w-3 h-3"
                  />
                  <span className="text-[#004EBA] text-sm py-2">
                    You can upload 1 file, not exceeding 10MB
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <UpdateDetailsBtn onClick={handleSubmit} />
      </div>
    </>
  );
};

export default PhrProfileUpdate;
