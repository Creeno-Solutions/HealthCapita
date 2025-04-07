import { useNavigate } from "react-router-dom";
import { PhrAssets } from "../../../../../assets/PHR/assets";
import { useState, useEffect } from "react";
import axios from "axios";
// import UserInfo from "../../../../../utils/UserInfo";
import PhrUpdateHeader from "../../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import PhrProtectwithPassword from "../../../../../CommonComponents/PhrUpdateHeader/PhrProtectwithPassword";
import UpdateDetailsBtn from "../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";

const MedicalContactsUpdate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // const userId = UserInfo();
  const userId = 10
  const [formData, setFormData] = useState({
    medicalContactId: 0,
    userId: userId,
    medicalContactTypeId: 0,
    name: "",
    countryId: "",
    mobile: "",
    email: "",
    experience: "",
    recStatus: true,
    specializationId: "",
    otherSpecializationName: "",
    isPasswordProtected: false,
    isDisplayUnderSummaryPage: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://service.healthcapita.com/api/PHR/GetMedicalContactById?UserId=${userId}`);
        if (response?.data?.isData === true) {
          console.log("response.....", response?.data?.data);
          setFormData(response?.data?.data);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
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

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://service.healthcapita.com/api/PHR/SaveMedicalContact", formData);
      if (response?.data?.status) {
        closePage();
      }
    } catch (error) {
      console.error("Error saving medical contact:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        <PhrUpdateHeader />
        <PhrProtectwithPassword
          Title="Medical Contacts"
          isProtected={formData.isPasswordProtected}
          isDisplayed={formData.isDisplayUnderSummaryPage}
          onProtectChange={handleChange}
          onDisplayChange={handleChange}
        />

        <div className="py-4 px-4 sm:px-6 md:px-4 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-2">
              <label className="font-normal">Medical Contact Type</label>
              <select name="medicalContactTypeId" value={formData.medicalContactTypeId} onChange={handleChange} className="border border-gray-300 py-2 px-3 rounded-md w-4/5 focus:outline-none">
                <option value="">Select</option>
                <option value="1">Family Physician</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-normal">Name</label>
              <input
                type="text"
                placeholder="Enter The Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 py-2 px-3 rounded-md focus:outline-none w-4/5"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-normal">Specialization</label>
              <select name="specializationId" value={formData.specializationId} onChange={handleChange} className="border border-gray-300 py-2 px-3 rounded-md w-4/5 focus:outline-none">
                <option value="1">Select</option>
                <option value="2">Dentist</option>
                <option value="3">Neurologist</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-normal">Since How Many Years</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Enter The Years"
                className="border border-gray-300 py-2 px-3 rounded-md focus:outline-none w-4/5"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-normal">Mobile Number</label>
              <div className="flex w-10/12">
                <select className="border border-gray-300 py-2 rounded-s-md w-15 focus:outline-none bg-[#F9FAFB]">
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                  <option value="+81">+81</option>
                </select>
                <input
                  type="number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                  className="border border-gray-300 py-2 px-3 flex-1 rounded-e-md border-l-0 focus:outline-none w-4/5"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-normal">Country</label>
              <select name="countryId" value={formData.countryId} onChange={handleChange} className="border border-gray-300 py-2 px-3 rounded-md w-4/5 focus:outline-none">
                <option value="">Select</option>
                <option value="1">India</option>
                <option value="2">USA</option>
                <option value="3">UK</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-normal">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter Your Email"
                className="border border-gray-300 py-2 px-3 rounded-md focus:outline-none w-4/5"
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <UpdateDetailsBtn onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default MedicalContactsUpdate;
