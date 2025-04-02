import { useEffect, useState } from "react";
import { PhrAssets } from "../../../../../../assets/PHR/assets";
import AddBtn from "../../../../../../CommonComponents/AddBtn/AddBtn";
import { useNavigate } from "react-router-dom";
import UpdateDetailsBtn from "../../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsbtn";
import axios from "axios";

const PhrSgot = () => {
  const navigate = useNavigate();

  const openSgotAddPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/PhrSgotUpdatePage");
  };

  const openSgotUpdatePage = (SGOTId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/PhrSgotUpdatePage", { state: { SGOTId } });
  };
  const userId = 10;
  const handleDelete = async (SGOTId) => {
    try {
      const response = await axios.post(
        `https://service.healthcapita.com/api/PHR/DeletePhrSgotById?SGOTId=${SGOTId}&userId=${userId}`
      );
      // console.log("deleteSgot", response?.data?.status);
      if (response?.data?.status) {
        const deletedData = await axios.get(
         `https://service.healthcapita.com/api/PHR/GetPhrSgot?userId=${userId}`
        );
        setData(deletedData?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showSgotForm, setSgotForm] = useState(false);
  const [data, setData] = useState([]);
  const [selectedContact, setSelectedConatct] = useState({});

  const openSgotForm = async (SGOTId) => {
    setSgotForm(true);
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetPhrSgotById/${SGOTId}/${userId}`
      );
      // console.log("formdata", response?.data?.response);
      if (response?.data?.status) {
        setSelectedConatct(response?.data?.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeSgotForm = () => {
    setSgotForm(false);
    setSelectedConatct(null);
  };

  useEffect(() => {
    const getApiData = async () => {
      try {
        const response = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetPhrSgot?userId=${userId}`
        );
        // console.log("sgot", response?.data?.status);
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
              className="p-2 rounded-full bg-[#002364]"
              src={PhrAssets.Hdl}
              alt=""
            />
            <p className="font-medium leading-5 text-lg text-[#111928]">SGOT</p>
          </div>
          <AddBtn onClick={openSgotAddPage} />
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
                  SGOT Level
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
                      onClick={() => openSgotForm(item.SGOTId)}
                      alt="Options"
                      className="w-6 h-6"
                    />
                  </td>
                  <td
                    className="px-4 py-4 text-base text-[#004EBA] border-b font-semibold cursor-pointer"
                    onClick={() => openSgotForm(item.SGOTId)}
                  >
                    {item.TestDate}
                  </td>
                  <td className="px-4 py-4 text-base text-gray-900 border-b">
                    {item.SGOTLevel}
                  </td>

                  <td className="px-4 py-4 text-base text-gray-900 border-b">
                    <div className="flex gap-4 items-center">
                      <button onClick={() => openSgotUpdatePage(item.SGOTId)}>
                        <img src={PhrAssets.Edit} alt="" />
                      </button>

                      <button
                        className="flex gap-1 items-center  font-semibold"
                        onClick={() => handleDelete(item.SGOTId)}
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

      {showSgotForm && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[50%] relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <div className="pt-2 px-6 mx-auto pb-10">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-2xl">SGOT Information</h2>
                <img
                  src={PhrAssets.Close}
                  alt=""
                  onClick={closeSgotForm}
                  className="cursor-pointer"
                />
              </div>
              <p className=" border border-b-1 border-gray-400 my-6"></p>

              <div className="grid sm:grid-cols-3 gap-8 mb-4">
                <div className="flex flex-col gap-1">
                  <p>SGOT Level</p>
                  <p className="font-semibold">{selectedContact.sgotlevel}</p>
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
                <UpdateDetailsBtn onClick={() => openSgotUpdatePage(SGOTId)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhrSgot;