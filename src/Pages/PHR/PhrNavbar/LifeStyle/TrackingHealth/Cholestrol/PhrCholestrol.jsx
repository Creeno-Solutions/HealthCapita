import { useState, useEffect } from "react";
import { PhrAssets } from "../../../../../../assets/PHR/assets";
import AddBtn from "../../../../../../CommonComponents/AddBtn/AddBtn";
import { useNavigate } from "react-router-dom";
import UpdateDetailsBtn from "../../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";
import axios from "axios";

const PhrCholestrol = () => {
  const navigate = useNavigate();
  const userId = 10;

  const openCholestrolAddPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/PhrCholestrolUpdatePage");
  };

  const openCholestrolUpdatePage = (CholesterolId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/PhrCholestrolUpdatePage", { state: { CholesterolId } });
  };

  const handleDelete = async (CholesterolId) => {
    try {
      const response = await axios.post(
        `https://service.healthcapita.com/api/PHR/delete/cholesterol/${CholesterolId}/${userId}`
    
      );
      // console.log("deleteCholestrol", response?.data?.status);
      if (response?.data?.success) {
        const deletedData = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetphrCholesterol?userId=${userId}`
        );
        setData(deletedData?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showCholestrolForm, setShowCholestrolForm] = useState(false);
  const [data, setData] = useState([]);
  const [selectedContact, setSelectedConatct] = useState({});

  const openCholestrolForm = async (CholesterolId) => {
    setShowCholestrolForm(true);
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetPhrCholesterolById/${CholesterolId}/${userId}`
      );
      setSelectedConatct(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const closeCholestrolForm = () => {
    setShowCholestrolForm(false);
    setSelectedConatct(null);
  };

  useEffect(() => {
    const getApiData = async () => {
      try {
        const response = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetphrCholesterol?userId=${userId}`
        );
        // console.log("cholestrol", response?.data?.data);
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
              className="p-2 rounded-full bg-[#FF4A4A]"
              src={PhrAssets.Cholestrol}
              alt=""
            />
            <p className="font-medium leading-5 text-lg text-[#111928]">
              Cholestrol
            </p>
          </div>
          <AddBtn onClick={openCholestrolAddPage} />
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
                  Cholestrol Level
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
                      onClick={() => openCholestrolForm(item.CholesterolId)}
                      alt="Options"
                      className="w-6 h-6"
                    />
                  </td>
                  <td
                    className="px-4 py-4 text-base text-[#004EBA] border-b font-semibold cursor-pointer"
                    onClick={() => openCholestrolForm(item.CholesterolId)}
                  >
                    {item.TestDate}
                  </td>
                  <td className="px-4 py-4 text-base text-gray-900 border-b">
                    {item.CholestrolLevel}
                  </td>

                  <td className="px-4 py-4 text-base text-gray-900 border-b">
                    <div className="flex gap-4 items-center">
                      <button
                        onClick={() =>
                          openCholestrolUpdatePage(item.CholesterolId)
                        }
                      >
                        <img src={PhrAssets.Edit} alt="" />
                      </button>

                      <button
                        className="flex gap-1 items-center  font-semibold"
                        onClick={() => handleDelete(item.CholesterolId)}
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

      {showCholestrolForm && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[50%] relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <div className="pt-2 px-6 mx-auto  pb-10">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-2xl">
                  Blood Cholestrol Information
                </h2>
                <img
                  src={PhrAssets.Close}
                  alt=""
                  onClick={closeCholestrolForm}
                  className="cursor-pointer"
                />
              </div>
              <p className=" border border-b-1 border-gray-400 my-6"></p>

              <div className="grid sm:grid-cols-3 gap-8 mb-4">
                <div className="flex flex-col gap-1">
                  <p>Blood Cholesterol Level</p>
                  <p className="font-semibold">
                    {selectedContact.cholestrolLevel}
                  </p>
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
                <UpdateDetailsBtn
                  onClick={() => openCholestrolUpdatePage(selectedContact.cholesterolId)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhrCholestrol;