import React, { useState, useEffect } from "react";
import axios from "axios";
import Separator from "../../../../../CommonComponents/Separator";
import Update from "../../../../../CommonComponents/Update/Update";
import { useNavigate } from "react-router-dom";
import PlusAddBtn from "../../../../../CommonComponents/PlusAddBtn/PlusAddBtn";
import Save from "../../../../../CommonComponents/Save/Save";
import { PhrAssets } from "../../../../../assets/PHR/assets";
import UserInfo from "../../../../../utils/UserInfo";

const EmergencyContactInfo = ({
  showUpdateButton = true,
  showAddButton = true,
}) => {
  const navigate = useNavigate(); 

  const openEmergencyContactUpdatePage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/EmergencyContactUpdate");
  };

  const [ContactsUpdateForm, setContactsUpdateForm] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = UserInfo();
  const [selectedContact, setSelectedContact] = useState({
    name: "",
    countryId: "",
    relation: "",
    mobile: "",
    emailId: "",
    userId: userId,
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
        "https://service.healthcapita.com/api/PHR/SaveEmergencyContactInformation",
        selectedContact
      );

      if (response?.data?.status === true) {
        const updatedResponse = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetEmergencyContact?userId=${userId}`
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
  const HandleDelete = async (emergencyContactId) => {
    try {
      const deleteResponse = await axios.post(
        `https://service.healthcapita.com/api/PHR/DeleteEmergencyContact?emergencyContactId=${emergencyContactId}&userId=${userId}`
      );
      console.log("emergerncy", deleteResponse?.data?.status);
      if (deleteResponse?.data?.status) {
        const updatedResponse = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetEmergencyContact?userId=${userId}`
        );
        console.log("update get api", updatedResponse);
        if (updatedResponse?.data?.isData) {
          setData(updatedResponse.data.data);
        } else {
          setData([]);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openContactsForm = async (contactId) => {
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetEmergencyContactById?emergencyContactId=${contactId}&userId=${userId}`
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
          `https://service.healthcapita.com/api/PHR/GetEmergencyContact?userId=${userId}`
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

  return (
    <>
      <div className="py-5 px-5 my-7 bg-[#F9FAFB] rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              className="p-2 rounded-full bg-[#FFF1F1]"
              src={PhrAssets.EmergencyContact}
              alt=""
            />
            <p className="font-medium landing-5 text-lg text-[#111928]">
              Emergency Contct Information
            </p>
          </div>
          {showAddButton && (
            <PlusAddBtn onClick={openEmergencyContactUpdatePage} />
          )}
        </div>
        <p className="border border-gray-300 px-2 my-3"></p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {data.map((emergencyContact) => (
            <div
              key={emergencyContact.emergencyContactId}
              className="flex flex-col gap-5 bg-white p-3 rounded-md"
            >
              <div className="flex flex-col gap-1">
                <p className="text-[#111928] landing-5">Name:</p>
                <p className="text-[#374151] font-semibold landing-5">
                  {emergencyContact.name}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[#111928] landing-5">Relation:</p>
                <p className="text-[#374151] font-semibold landing-5">
                  {emergencyContact.relation}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[#111928] landing-5">Country:</p>
                <p className="text-[#374151] font-semibold landing-5">
                  {emergencyContact.countryId}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[#111928] landing-5">Contact:</p>
                <p className="text-[#374151] font-semibold landing-5">
                  {emergencyContact.mobile}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[#111928] landing-5">Email:</p>
                <p className="text-[#374151] font-semibold landing-5 mb-3">
                  {emergencyContact.emailId}
                </p>
              </div>
              <div className="flex justify-between">
                {showUpdateButton && (
                  <Update
                    onClick={() =>
                      openContactsForm(emergencyContact.emergencyContactId)
                    }
                  />
                )}
                <button
                  onClick={() =>
                    HandleDelete(emergencyContact.emergencyContactId)
                  }
                  className="flex gap-1 items-center  font-semibold"
                >
                  <img src={PhrAssets.Delete} alt="" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {ContactsUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[50%] relative">
            <div className="py-4 pb-14 px-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">
                  Update emergency contact details
                </h2>
                <img
                  className="text-4xl cursor-pointer"
                  src={PhrAssets.Close}
                  onClick={closeContactsForm}
                  alt=""
                />
              </div>
              <p className="border border-gray-200 my-5"></p>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <label>Name</label>
                  <input
                    type="text"
                    value={selectedContact.name}
                    onChange={handleChange}
                    name="name"
                    className="py-1 px-2 border font-medium border-gray-300 w-72 rounded-md"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Relation</label>
                  <input
                    type="text"
                    value={selectedContact.relation}
                    onChange={handleChange}
                    name="relation"
                    className="py-1 px-2 border font-medium border-gray-300 w-72 rounded-md"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Mobile No.</label>
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
                      name="mobile"
                      value={selectedContact.mobile}
                      onChange={handleChange}
                      placeholder="Enter mobile number"
                      className="py-1 px-2 border font-medium border-gray-300 w-56 rounded-md"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label>Country</label>
                  <select
                    name="countryId"
                    value={selectedContact.countryId}
                    onChange={handleChange}
                    className="py-1 px-2 border font-medium border-gray-300 w-72 rounded-md"
                  >
                    <option value="India">India</option>
                    <option value="USA">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label>Email</label>
                    <input
                      type="email"
                      name="emailId"
                      value={selectedContact.emailId}
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

export default EmergencyContactInfo;

{
  /* {showUpdateButton && <Update onClick={openEmergencyContactUpdatePage} />} */
}
