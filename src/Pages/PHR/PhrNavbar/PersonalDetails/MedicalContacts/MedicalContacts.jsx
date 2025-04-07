import React from "react";
import { PhrAssets } from "../../../../../assets/PHR/assets";
import Separator from "../../../../../CommonComponents/Separator";
import Update from "../../../../../CommonComponents/Update/Update";
import { useNavigate } from "react-router-dom";
import PlusAddBtn from "../../../../../CommonComponents/PlusAddBtn/PlusAddBtn";
import Save from "../../../../../CommonComponents/Save/Save";
import { useState, useEffect } from "react";
import axios from "axios";
// import UserInfo from "../../../../../utils/UserInfo";

const MedicalContacts = ({ showUpdateButton = true, showAddButton = true }) => {
  const navigate = useNavigate();
  // const userId = UserInfo();
  const userId = 10
  const openPhrMedicalContactsPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/MedicalContactsUpdate");
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ContactsUpdateForm, setContactsUpdateForm] = useState(false);

  const [selectedContact, setSelectedContact] = useState({
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

  const openMedicalContactsForm = () => {
    setContactsUpdateForm(true);
  };

  const closeContactsForm = () => {
    setContactsUpdateForm(false);
  };

  const openContactsForm = async (contactId) => {
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetMedicalContact?medicalcontactid=${contactId}&userId=${userId}`
      );
      
      console.log('con',response?.data?.data)
      if (response?.data?.isData) {
        setSelectedContact(response?.data?.data);
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
          `https://service.healthcapita.com/api/PHR/GetMedicalContactById?UserId=${userId}`
          
        );
        if (response?.data?.isData) {
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log('selected contacts',selectedContact)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://service.healthcapita.com/api/PHR/SaveMedicalContact",
        selectedContact
      );

      if (response?.data?.status) {
        const updatedResponse = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetMedicalContactById?UserId=${userId}`
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
  const HandleDelete = async (medicalContactId) => {
    try {
      const deleteResponse = await axios.post(
        `https://service.healthcapita.com/api/PHR/DeleteMedicalContact?medicalContactId=${medicalContactId}&userId=${userId}`
      );

      if (deleteResponse?.data?.status) {
        const fetchResponse = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetMedicalContact?UserId=${userId}`
        );

        if (fetchResponse?.data?.isData) {
          setData(fetchResponse?.data?.data);
        } else {
          setData([]);
        }
      }
    } catch (error) {
      console.error("Error deleting medication:", error);
    }
  };
  return (
    <>
      <div className="py-5 px-5  my-7 bg-[#F9FAFB] rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              className="p-2 rounded-full bg-[#FFF1F1]"
              src={PhrAssets.MedicalContact}
              onClick={closeContactsForm}
              alt=""
            />
            <p className="font-medium landing-5 text-lg text-[#111928]">
              Medical Contacts
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img src={PhrAssets.PlusAdd} alt="" />
            {showAddButton && (
              <PlusAddBtn onClick={openPhrMedicalContactsPage} />
            )}
          </div>
        </div>
        <p className="border border-gray-300 px-2 my-3"></p>

        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((medical) => (
            <div
              key={medical.medicalContactId}
              className="flex flex-col gap-2  bg-gray-50"
            >
              <p className="font-semibold text-lg">
                {medical.medicalcontacttypeId}
              </p>

              <div className="flex flex-col bg-white py-2 px-3 rounded-md gap-2">
                <p className="text-[#111928]">Name:</p>
                <p className="text-[#374151] font-semibold">{medical.name}</p>
              </div>

              <div className="flex flex-col bg-white py-2 px-3 rounded-md gap-2">
                <p className="text-[#111928]">Specialization</p>
                <p className="text-[#374151] font-semibold">
                  {medical.specializationId}
                </p>
              </div>

              <div className="flex flex-col bg-white py-2 px-3 rounded-md gap-2">
                <p className="text-[#111928]">Contact</p>
                <p className="text-[#374151] font-semibold">
                  +{medical.countrycode}-{medical.mobile}
                </p>
              </div>

              <div className="flex flex-col bg-white py-2 px-3 rounded-md gap-2">
                <p className="text-[#111928]">Email</p>
                <p className="text-[#374151] font-semibold">
                  {medical.email}
                </p>
              </div>

              <div className="flex flex-col bg-white py-2 px-3 rounded-md gap-2 mb-3">
                <p className="text-[#111928]">Since How Many Years?</p>
                <p className="text-[#374151] font-semibold">
                  {medical.sincehowmanyyearsId}
                </p>
              </div>
              <div className="flex justify-between">
                {showUpdateButton && (
                  <Update
                    onClick={() => openContactsForm(medical.medicalContactId)}
                  />
                )}
                <button
                  onClick={() => HandleDelete(medical.medicalContactId)}
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
          <div className="bg-white rounded-lg shadow-lg w-[50%] relative overflow-y-auto max-h-[550px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={selectedContact.name}
                    onChange={handleChange}
                    className="py-1 px-2 border font-medium border-gray-300 w-72 rounded-md"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Specialization</label>
                  <select
                    name="specializationId"
                    value={selectedContact.specializationId}
                    onChange={handleChange}
                    className="py-1 px-2 border font-medium border-gray-300 w-72 rounded-md"
                  >
                    <option value="1">Gynaecologist</option>
                    <option value="2">Dermatologist</option>
                    <option value="3">Neurologist</option>
                  </select>
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
                      className="py-1 px-2 border font-medium border-gray-300 w-56 rounded-md"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      value={selectedContact.emailId}
                      onChange={handleChange}
                      className="py-1 px-2 border font-medium border-gray-300 w-72 rounded-md"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label>Since How Many Years?</label>
                  <select
                    name="sincehowmanyyearsId"
                    value={selectedContact.sincehowmanyyearsId}
                    onChange={handleChange}
                    className="py-1 px-2 border font-medium border-gray-300 w-72 rounded-md"
                  >
                    <option value="1">2</option>
                    <option value="2">5</option>
                    <option value="3">8</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label>Medical Contact Type</label>
                  <select
                    name="medicalcontacttypeId"
                    value={selectedContact.medicalcontacttypeId}
                    onChange={handleChange}
                    className="py-1 px-2 border font-medium border-gray-300 w-72 rounded-md"
                  >
                    <option value="1">Family Physician</option>
                    <option value="2">Friend</option>
                    <option value="3">Relative</option>
                  </select>
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

export default MedicalContacts;
