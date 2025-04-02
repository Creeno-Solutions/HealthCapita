import { useNavigate } from "react-router-dom";
import { PhrAssets } from "../../../../../assets/PHR/assets";
import Separator from "../../../../../CommonComponents/Separator";
import Update from "../../../../../CommonComponents/Update/Update";
import PlusAddBtn from "../../../../../CommonComponents/PlusAddBtn/PlusAddBtn";
import { useState, useEffect } from "react";
import axios from "axios";
import Save from "../../../../../CommonComponents/Save/Save";
import UserInfo from "../../../../../utils/UserInfo";

const FamilyDetails = ({ showUpdateButton = true, showAddButton = true }) => {
  const navigate = useNavigate();
  const userId = UserInfo();

  const openFamilyDetailsUpdatePage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/FamilyDetailsUpdate");
  };
  console.log("useridddd", userId);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ContactsUpdateForm, setContactsUpdateForm] = useState(false);

  const [selectedContact, setSelectedContact] = useState({
    name: "",
    relation: "",
    relationShip: "",
    gender: "",
    cityId: "",
    otherCity: "",
    countryId: "",
    stateId: null,
    otherState: "",
    pobox: "",
    address: "",
    countryCode: "",
    email: "",
    dateOfBirth: "",
    age: 0,
    countryCode: "",
    mobile: "",
    isPasswordProtected: false,
    isDisplayUnderSummary: false,
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
        "https://service.healthcapita.com/api/PHR/SaveFamilyDetails",
        selectedContact
      );

      if (response?.data?.status === true) {
        const updatedResponse = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetListOFFamilyContactsByUserId?UserId=${userId}`
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
        `https://service.healthcapita.com/api/PHR/GetFamilyContactDetailById?UserId=111&FamilyContactId=${contactId}`
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
          `https://service.healthcapita.com/api/PHR/GetListOFFamilyContactsByUserId?UserId=${userId}`
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

  const HandleDelete = async (familyContactId) => {
    try {
      const deleteResponse = await axios.post(
        `https://service.healthcapita.com/api/PHR/DeleteFamilyContactfamilyContactIduserId?familyContactId=${familyContactId}&userId=${userId}`
      );

      console.log("deletereaponse", deleteResponse?.data?.status);
      if (deleteResponse?.data?.status) {
        const fetchResponse = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetListOFFamilyContactsByUserId?UserId=${userId}`
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
      <div className="py-5 px-5 my-7 bg-[#F9FAFB] rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              className="p-2 rounded-full bg-[#FFF1F1]"
              src={PhrAssets.EmergencyContact}
              alt=""
            />
            <p className="font-medium landing-5 text-lg text-[#111928]">
              Family Details
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img src={PhrAssets.PlusAdd} alt="" />
            {showAddButton && (
              <PlusAddBtn onClick={openFamilyDetailsUpdatePage} />
            )}
          </div>
        </div>
        <p className="border border-gray-300 px-2 my-3"></p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((contact) => (
            <div
              key={contact.familyContactId}
              className="flex flex-col gap-2 mb-4"
            >
              <div className="flex flex-col bg-[white] py-2 px-3 rounded-md gap-2">
                <p className="text-[#111928] leading-5">Name:</p>
                <p className="text-[#374151] font-semibold leading-5">
                  {contact.name}
                </p>
                <div className="flex gap-1 text-gray-400 text-sm items-center">
                  <p>{contact.gender} .</p>
                  <p>{contact.age} .</p>
                  <p>{contact.dateOfBirth}</p>
                </div>
              </div>

              <div className="flex flex-col bg-[white] py-2 px-3 rounded-md gap-2">
                <p className="text-[#111928] leading-5">Relation</p>
                <p className="text-[#374151] font-semibold leading-5">
                  {contact.relation}
                </p>
              </div>

              <div className="flex justify-between bg-white">
                <div className="flex flex-col py-2 px-3 rounded-md gap-2">
                  <p className="text-[#111928] leading-5">Country</p>
                  <p className="text-[#374151] font-semibold leading-5">
                    {contact.countryId}
                  </p>
                </div>
                <div className="flex flex-col py-2 px-3 rounded-md gap-2">
                  <p className="text-[#111928] leading-5">Governate</p>
                  <p className="text-[#374151] font-semibold leading-5">
                    {contact.stateId}
                  </p>
                </div>
                <div className="flex flex-col py-2 px-3 rounded-md gap-2">
                  <p className="text-[#111928] leading-5">Area</p>
                  <p className="text-[#374151] font-semibold leading-5">
                    {contact.cityId}
                  </p>
                </div>
                <div className="flex flex-col py-2 px-3 rounded-md gap-2">
                  <p className="text-[#111928] leading-5">P.O. Box</p>
                  <p className="text-[#374151] font-semibold leading-5">
                    {contact.pobox}
                  </p>
                </div>
              </div>

              <div className="flex flex-col bg-[white] py-2 px-3 rounded-md gap-2">
                <p className="text-[#111928] leading-5">Contact</p>
                <p className="text-[#374151] font-semibold leading-5">
                  +{contact.countryCode}-{contact.mobile}
                </p>
              </div>

              <div className="flex flex-col bg-[white] py-2 px-3 rounded-md gap-2">
                <p className="text-[#111928] leading-5">Email</p>
                <p className="text-[#374151] font-semibold leading-5">
                  {contact.email}
                </p>
              </div>

              <div className="flex flex-col bg-[white] py-2 px-3 rounded-md gap-2 mb-3">
                <p className="text-[#111928] leading-5">Address</p>
                <p className="text-[#374151] font-semibold leading-5">
                  {contact.address}
                </p>
              </div>
              <div className="flex justify-between">
                {showUpdateButton && (
                  <Update
                    onClick={() => openContactsForm(contact.familyContactId)}
                  />
                )}
                <button
                  onClick={() => HandleDelete(contact.familyContactId)}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50  ">
          <div className="bg-white rounded-lg shadow-lg w-[50%] relative overflow-y-auto max-h-[550px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ">
            <div className="py-4 pb-14 px-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">
                  Update family details
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
                    className="py-1 px-2 border font-medium border-gray-300 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={selectedContact.dateOfBirth}
                    onChange={handleChange}
                    className="py-1 px-2 border font-medium border-gray-300 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={selectedContact.gender}
                    onChange={handleChange}
                    className="py-1 px-2 border font-medium border-gray-300 rounded-md w-full"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label>Relation</label>
                  <input
                    type="text"
                    name="relation"
                    value={selectedContact.relation}
                    onChange={handleChange}
                    className="py-1 px-2 border font-medium border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Country</label>
                  <select
                    name="countryCode"
                    value={selectedContact.countryCode}
                    onChange={handleChange}
                    className="py-1 px-2 border font-medium border-gray-300 rounded-md w-full"
                  >
                    <option value="India">India</option>
                    <option value="USA">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label>Governate</label>
                  <select
                    name="stateId"
                    value={selectedContact.stateId}
                    onChange={handleChange}
                    className="py-1 px-2 border font-medium border-gray-300 rounded-md w-full"
                  >
                    <option value="1">Ap</option>
                    <option value="2">Ka</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label>Area</label>
                  <select
                    name="area"
                    value={selectedContact.area}
                    onChange={handleChange}
                    className="py-1 px-2 border font-medium border-gray-300 rounded-md w-full"
                  >
                    <option value="1">JNTU</option>
                    <option value="2">Miyapur</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label>P.O.BOX</label>
                  <input
                    type="text"
                    name="pobox"
                    value={selectedContact.pobox}
                    onChange={handleChange}
                    className="py-1 px-2 border font-medium border-gray-300 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="mobile">Mobile No.</label>
                  <div className="flex gap-2 items-center">
                    <select
                      name="countryCode"
                      className="py-1 px-1 border font-medium border-gray-300 rounded-md"
                    >
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
                      className="py-1 px-2 border font-medium border-gray-300 rounded-md w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={selectedContact.email}
                    onChange={handleChange}
                    className="py-1 px-2 border font-medium border-gray-300 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={selectedContact.address}
                    onChange={handleChange}
                    className="py-1 px-2 border font-medium border-gray-300 rounded-md w-full"
                  />
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

export default FamilyDetails;