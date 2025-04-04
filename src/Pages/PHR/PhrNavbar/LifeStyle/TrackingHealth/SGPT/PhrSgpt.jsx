import { useState, useEffect } from "react";
import { PhrAssets } from "../../../../../../assets/PHR/assets";
// import Update from "../../../../../../CommonComponents/Update/Update";
import AddBtn from "../../../../../../CommonComponents/AddBtn/AddBtn";
import { useNavigate } from "react-router-dom";
import UpdateDetailsBtn from "../../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";
import axios from "axios";

const PhrSgpt = () => {
  const navigate = useNavigate();

  const openSgptAddPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/PhrSgptUpdatePage");
  };

  const openSgptUpdatePage = (SGPTId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/PhrSgptUpdatePage", { state: { SGPTId } });
  };
  const userId = 10;
  const handleDelete = async (SGPTId) => {
    try {
      const response = await axios.post(
        `https://service.healthcapita.com/api/PHR/delete/Sgpt/${SGPTId}/${userId}`
      );
      if (response?.data?.success) {
        const deletedData = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetPhrSgpt?userId=${userId}`
        );
        setData(deletedData?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showSgptForm, setSgptForm] = useState(false);
  const [data, setData] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});

  const openSgptForm = async (SGPTId) => {
    setSgptForm(true);
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetPhrSgptById/${SGPTId}/${userId}`
      );
      // console.log("formDataSgpt", response?.data?.data);
      if (response?.data?.status) {
        setSelectedContact(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeSgptForm = () => {
    setSgptForm(false);
    setSelectedContact(null);
  };

  useEffect(() => {
    const getApiData = async () => {
      try {
        const response = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetPhrSgpt?userId=${userId}`
        );
        // console.log("sgpt", response?.data?.data);
        if (response?.data?.status) {
          setData(response?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getApiData();
  }, []);

  return (
    <>
      <div className="py-3 px-2 bg-[#F9FAFB] rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              className="p-2 rounded-full bg-[#1192E8]"
              src={PhrAssets.Ldl}
              alt=""
            />
            <p className="font-medium leading-5 text-lg text-[#111928]">SGPT</p>
          </div>
          <AddBtn onClick={openSgptAddPage} />
        </div>
        <p className="border border-gray-300 px-2 my-4"></p>

        <div className="overflow-x-auto rounded-md border  ">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#D1D5DB]">
                <th className="py-3 text-left text-base font-medium pl-1"></th>{" "}
                <th className="py-3 text-left text-base font-medium px-4">
                  Date of Test
                </th>
                <th className="py-3 text-left text-base font-medium px-4">
                  SGPT Level
                </th>
                <th className="py-3 text-left text-base font-medium px-4"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="pl-1 py-4 text-sm text-gray-900 border-b cursor-pointer">
                    <img
                      src={PhrAssets.ThreeDotted}
                      onClick={() => openSgptForm(item.SGPTId)}
                      alt="Options"
                      className="w-6 h-6"
                    />
                  </td>
                  <td
                    className="px-4 py-4 text-base text-[#004EBA] border-b font-semibold cursor-pointer"
                    onClick={() => openSgptForm(item.SGPTId)}
                  >
                    {item.TestDate}
                  </td>
                  <td className="px-4 py-4 text-base text-gray-900 border-b">
                    {item.SGPTLevel}
                  </td>

                  <td className="px-4 py-4 text-base text-gray-900 border-b">
                    <div className="flex gap-4 items-center">
                      <button onClick={() => openSgptUpdatePage(item.SGPTId)}>
                        <img src={PhrAssets.Edit} alt="" />
                      </button>

                      <button
                        className="flex gap-1 items-center  font-semibold"
                        onClick={() => handleDelete(item.SGPTId)}
                      >
                        <img src={PhrAssets.Delete} alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showSgptForm && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[50%] relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <div className="pt-2 px-6 mx-auto pb-10">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-2xl">SGPT Information</h2>
                <img
                  src={PhrAssets.Close}
                  alt=""
                  onClick={closeSgptForm}
                  className="cursor-pointer"
                />
              </div>
              <p className=" border border-b-1 border-gray-400 my-6"></p>

              <div className="grid sm:grid-cols-3 gap-8 mb-4">
                <div className="flex flex-col gap-1">
                  <p>SGPT Level</p>
                  <p className="font-semibold">{selectedContact.sgptlevel}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p>Date of Entry</p>
                  <p className="font-semibold">{selectedContact.testDate}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p>Physician Specialist</p>
                  <p className="font-semibold">
                    {selectedContact.physicianSpecialist}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p>Primary Care Physician</p>
                  <p className="font-semibold">
                    {selectedContact.primaryCarePhysician}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p>Comments</p>
                  <p className="font-semibold">{selectedContact.comments}</p>
                </div>
              </div>

              <div>
                <UpdateDetailsBtn onClick={() => openSgptUpdatePage(selectedContact.sgptid)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhrSgpt;