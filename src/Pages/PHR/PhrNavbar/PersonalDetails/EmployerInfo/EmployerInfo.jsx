import React from "react";
import { PhrAssets } from "../../../../../assets/PHR/assets";
import Update from "../../../../../CommonComponents/Update/Update";
import { useNavigate } from "react-router-dom";
import PlusAddBtn from "../../../../../CommonComponents/PlusAddBtn/PlusAddBtn";
import Save from "../../../../../CommonComponents/Save/Save";
import { useState, useEffect } from "react";
import axios from "axios";
import UserInfo from "../../../../../utils/UserInfo";

const EmployerInfo = ({ showUpdateButton = true, showAddButton = true }) => {
  const navigate = useNavigate();
  const openEmployerInfoUpdatePage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/EmployerInfoUpdate");
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = UserInfo();
  const [ContactsUpdateForm, setContactsUpdateForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState({
    userId: userId,
    employerName: "",
    employeeCategory: "",
    offAddress: "",
    cityId: "",
    otherCity: "s",
    stateid: "",
    otherState: "",
    countryid: "",
    pinCode: "",
    phone: "",
    countryCode: "",
    isPasswordProtected: true,
    isDisplayUnderSummary: true,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://service.healthcapita.com/api/PHR/SaveEmploymentInformation",
        selectedContact
      );

      if (response?.data?.status === true) {
        const updatedResponse = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetEmploymentInformation?UserId=${userId}`
        );

        if (updatedResponse?.data?.isData === true) {
          setData(updatedResponse.data.data);
        }

        setContactsUpdateForm(false);
      }
    } catch (error) {
      console.error("Error saving contact information", error);
    }
  };

  const openContactsForm = async (contactId) => {
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetEmploymentInformationById?employeeid=${contactId}&userid=${userId}`
      );
      if (response?.data?.isData === true) {
        setSelectedContact(response.data.data);
        setContactsUpdateForm(true);
      }
    } catch (err) {
      console.error("Error fetching contact details", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetEmploymentInformation?UserId=${userId}`
        );
        if (response?.data?.isData === true) {
          console.log("response.....", response?.data?.data);
          setData(response?.data?.data);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const closeContactsForm = () => {
    setContactsUpdateForm(false);
  };

  return (
    <>
      <div className="py-5 px-5 my-7 bg-[#F9FAFB] rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              className="p-2 rounded-full bg-[#DEF7EC]"
              src={PhrAssets.EmployerInfo}
              alt=""
            />
            <p className="font-medium landing-5 text-lg text-[#111928]">
              Employer Information
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img src={PhrAssets.PlusAdd} alt="" />
            {showAddButton && (
              <PlusAddBtn onClick={openEmployerInfoUpdatePage} />
            )}
          </div>
        </div>
        <p className="border border-gray-300 px-2 my-3"></p>

        <div className="grid grid-cols-3 gap-4">
          {data.map((employer, index) => (
            <div key={index} className="flex flex-col gap-2  bg-gray-50">
              <div className="flex flex-col bg-[white] py-2 px-3 rounded-md gap-2">
                <p className="text-[#111928]">Category</p>
                <p className="text-[#374151] font-semibold">
                  {employer.employeeCategory}
                </p>
              </div>

              <div className="flex flex-col bg-[white] py-2 px-3 rounded-md gap-2">
                <p className="text-[#111928]">Employer Name</p>
                <p className="text-[#374151] font-semibold">
                  {employer.employerName}
                </p>
              </div>

              <div className="flex flex-col bg-[white] py-2 px-3 rounded-md gap-2">
                <p className="text-[#111928]">Office Address</p>
                <p className="text-[#374151] font-semibold">
                  {employer.offAddress}
                </p>
              </div>

              <div className="flex flex-col bg-[white] py-2 px-3 rounded-md gap-2">
                <p className="text-[#111928]">Landline No.</p>
                <p className="text-[#374151] font-semibold">{employer.phone}</p>
              </div>

              <div className="flex flex-col bg-[white] py-2 px-3 rounded-md gap-2">
                <p className="text-[#111928]">P.O. Box</p>
                <p className="text-[#374151] font-semibold">
                  {employer.pinCode}
                </p>
              </div>
              <div className="flex justify-between">
                {showUpdateButton && (
                  <Update
                    onClick={() => openContactsForm(employer.employeeId)}
                  />
                )}
                <button className="flex gap-1 items-center  font-semibold">
                  <img src={PhrAssets.Delete} alt="" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {ContactsUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[50%] relative overflow-y-auto max-h-[550px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <div className="py-4 pb-14 px-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">
                  Update employer info details
                </h2>
                <img
                  className="text-4xl cursor-pointer"
                  src={PhrAssets.Close}
                  onClick={closeContactsForm}
                  alt=""
                />
              </div>
              <p className="border border-gray-200 my-5"></p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label>Category</label>
                  <select
                    name="employeeCategory"
                    value={selectedContact.employeeCategory}
                    onChange={handleChange}
                    className="py-1 px-2 border font-medium border-gray-300 w-72 rounded-md"
                  >
                    <option value="1">salaried</option>
                    <option value="2">Unpaid</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label>Employer Name</label>
                  <input
                    type="text"
                    name="employerName"
                    value={selectedContact.employerName}
                    onChange={handleChange}
                    className="py-1 px-2 border font-medium border-gray-300 w-72 rounded-md"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full sm:col-span-2">
                  <label>Address</label>
                  <input
                    type="text"
                    name="offAddress"
                    value={selectedContact.offAddress}
                    onChange={handleChange}
                    className="py-1 px-2 border font-medium border-gray-300 w-full rounded-md h-14"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Landline No.</label>
                  <div className="flex gap-2 items-center">
                    <select className="py-1 px-1 border font-medium border-gray-300 rounded-md w-14">
                      <option value="+1">+1</option>
                      <option value="+91">+91</option>
                      <option value="+44">+44</option>
                      <option value="+61">+61</option>
                      <option value="+81">+81</option>
                    </select>

                    <input
                      type="text"
                      name="phone"
                      value={selectedContact.phone}
                      onChange={handleChange}
                      className="py-1 px-2 border font-medium border-gray-300 w-56 rounded-md"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label>P.O.BOX</label>
                    <input
                      type="text"
                      name="pinCode"
                      value={selectedContact.pinCode}
                      onChange={handleChange}
                      className="py-1 px-2 border font-medium border-gray-300 w-72 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <p className="border border-gray-200 my-10"></p>
              <div onClick={handleSubmit}>
                <Save />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployerInfo;
