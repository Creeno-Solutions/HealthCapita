import { useState, useEffect } from "react";
import { PhrAssets } from "../../../../../../assets/PHR/assets";
import AddBtn from "../../../../../../CommonComponents/AddBtn/AddBtn";
import { useNavigate } from "react-router-dom";
import UpdateDetailsBtn from "../../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";
import axios from "axios";

const PhrMoodAndStress = () => {
  const navigate = useNavigate();
const id=10
  const openMoodAndStressAddPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/phrMoodAndStressUpdatePage");
  };

  const openMoodAndStressUpdatePage = (MoodStressId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/phrMoodAndStressUpdatePage", { state: { MoodStressId } });
  };

  const handleDelete = async (MoodStressId) => {
    try {
      const response = await axios.post(
        `https://service.healthcapita.com/api/PHR/DeletePhrMoodStressById?MoodStressId=${MoodStressId}&userId=${id}`
      );
      // console.log("deleteMood", response?.data?.status);
      if (response?.data?.status) {
        const deletedData = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetPhrMoodStress?userId=${id}`
        );
        setData(deletedData?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showMoodAndStressForm, setMoodAndStressForm] = useState(false);
  const [data, setData] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});

  const openMoodAndStressForm = async (MoodStressId) => {
    setMoodAndStressForm(true);
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetPhrMoodStressById/${MoodStressId}/${id}`
      );
      console.log("moodForm", response?.data?.data);
      if (response?.data?.isData) {
        setSelectedContact(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeMoodAndStressForm = () => {
    setMoodAndStressForm(false);
  };

  useEffect(() => {
    const getApiData = async () => {
      try {
        const response = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetPhrMoodStress?userId=${id}`
        );
        console.log("moodDataaa", response?.data?.data);
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
              src={PhrAssets.MoodAndStress}
              alt=""
            />
            <p className="font-medium leading-5 text-lg text-[#111928]">
              Mood And Stress
            </p>
          </div>
          <AddBtn onClick={openMoodAndStressAddPage} />
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
                  Stress
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
                      onClick={() => openMoodAndStressForm(item.MoodStressId)}
                      alt="Options"
                      className="w-6 h-6"
                    />
                  </td>
                  <td
                    className="px-4 py-4 text-base text-[#004EBA] border-b font-semibold cursor-pointer"
                    onClick={() => openMoodAndStressForm(item.MoodStressId)}
                  >
                    {item.DateofEntry}
                  </td>
                  <td className="px-4 py-4 text-base text-gray-900 border-b">
                    {item.Mood}
                  </td>

                  <td className="px-4 py-4 text-base text-gray-900 border-b">
                    <div className="flex gap-4 items-center">
                      <button
                        onClick={() =>
                          openMoodAndStressUpdatePage(item.MoodStressId)
                        }
                      >
                        <img src={PhrAssets.Edit} alt="" />
                      </button>

                      <button
                        className="flex gap-1 items-center  font-semibold"
                        onClick={() => handleDelete(item.MoodStressId)}
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

      {showMoodAndStressForm && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[50%] relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <div className="pt-2 px-6 mx-auto pb-10">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-2xl">
                  Mood And Stress Information
                </h2>
                <img
                  src={PhrAssets.Close}
                  alt=""
                  onClick={closeMoodAndStressForm}
                  className="cursor-pointer"
                />
              </div>
              <p className=" border border-b-1 border-gray-400 my-6"></p>

              <div className="grid sm:grid-cols-3 gap-8 mb-4">
                <div className="flex flex-col gap-1">
                  <p>Mood</p>
                  <p className="font-semibold">{selectedContact.mood}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p>Date of Entry</p>
                  <p className="font-semibold">{selectedContact.dateofEntry}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p>Comments</p>
                  <p className="font-semibold">{selectedContact.comment}</p>
                </div>
              </div>

              <div>
                <UpdateDetailsBtn
                  onClick={() => openMoodAndStressUpdatePage(selectedContact.moodStressId)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhrMoodAndStress;
