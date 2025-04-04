import { useEffect, useState } from "react";
import { PhrAssets } from "../../../../../../assets/PHR/assets";
import AddBtn from "../../../../../../CommonComponents/AddBtn/AddBtn";
import { useNavigate } from "react-router-dom";
import UpdateDetailsBtn from "../../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn";
import axios from "axios";

const PhrBloodSugar = () => {
  const navigate = useNavigate();

  const openBloodSugarAddPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/BloodSugarUpdate");
  };
  const id = 10;
  const openBloodSugarUpdatePage = (BloodSugarId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/BloodSugarUpdate", { state: { BloodSugarId } });
  };

  const handleDelete = async (BloodSugarId) => {
    try {
      const response = await axios.post(
        `https://service.healthcapita.com/api/PHR/DeletePhrBloodSugarById/${BloodSugarId}/${id}`
        
      );
     
      if (response?.data?.success) {
        const deletedData = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetPhrBloodSugar?userId=${id}`
        );
        setData(deletedData?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showBloodSugarForm, setShowBloodSugarForm] = useState(false);

  const [data, setData] = useState([]);
  const [selectedContact, setSelectedConatct] = useState(null);

  const openBloodSugarForm = async (BloodSugarId) => {
    setShowBloodSugarForm(true);
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetPhrBloodSugarById/${BloodSugarId}/${id}`
      );
      setSelectedConatct(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const closeBloodSugarForm = () => {
    setShowBloodSugarForm(false);
    setSelectedConatct(null);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetPhrBloodSugar?userId=${id}`
        );
        // console.log("bloodSugar", response?.data?.data);
        if (response?.data?.status) {
          setData(response?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <div className="py-3 px-2 bg-[#F9FAFB] rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              className="w-[40px] h-[40px] p-2 rounded-full bg-[#FF9E2D]"
              src={PhrAssets.BloodSugar}
              alt=""
            />
            <p className="font-medium leading-5 text-lg text-[#111928]">
              Blood Sugar
            </p>
          </div>
          <AddBtn onClick={openBloodSugarAddPage} />
        </div>
        <p className="border border-gray-300 px-2 my-4"></p>

        <div className="overflow-x-auto rounded-md border">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#D1D5DB]">
                <th className="py-3 text-left text-base font-medium pl-1"></th>{" "}
                <th className="py-3 text-left text-base font-medium px-4">
                  Date of Test
                </th>
                <th className="py-3 text-left text-base font-medium px-4">
                  Fasting
                </th>
                <th className="py-3 text-left text-base font-medium px-4">
                  Post Prandial(after food)
                </th>
                <th className="py-3 text-left text-base font-medium px-4"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="pl-1 py-4 text-sm text-gray-900 border-b cursor-pointer">
                    <img
                      src={PhrAssets.ThreeDotted}
                      onClick={() => openBloodSugarForm(item.BloodSugarId)}
                      alt="Options"
                      className="w-6 h-6"
                    />
                  </td>
                  <td
                    onClick={() => openBloodSugarForm(item.BloodSugarId)}
                    className="px-4 py-4 text-base text-[#004EBA] border-b font-semibold cursor-pointer"
                  >
                    {item.TestDate}
                  </td>
                  <td className="px-4 py-4 text-base text-gray-900 border-b">
                    {item.Fasting}
                  </td>
                  <td className="px-4 py-4 text-base text-gray-900 border-b">
                    {item.PostPrandial}
                  </td>
                  <td className="px-4 py-4 text-base text-gray-900 border-b">
                    <div className="flex gap-4 items-center">
                      <button
                        onClick={() =>
                          openBloodSugarUpdatePage(item.BloodSugarId)
                        }
                      >
                        <img src={PhrAssets.Edit} alt="" />
                      </button>

                      <button
                        onClick={() => handleDelete(item.BloodSugarId)}
                        className="flex gap-1 items-center  font-semibold"
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

      {showBloodSugarForm && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[50%] relative overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <div className="pt-2 px-6 mx-auto pb-10">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-2xl">
                  Blood Sugar Information
                </h2>
                <img
                  src={PhrAssets.Close}
                  alt=""
                  onClick={closeBloodSugarForm}
                  className="cursor-pointer"
                />
              </div>
              <p className=" border border-b-1 border-gray-400 my-6"></p>

              <div className="grid sm:grid-cols-3 gap-8 mb-4">
                <div className="flex flex-col gap-1">
                  <p>Fasting(mg/dl)</p>
                  <p className="font-semibold">{selectedContact.fasting}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p>Post Prandial(mg/dl)</p>
                  <p className="font-semibold">
                    {selectedContact.postPrandial}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p>Random(mg/dl)</p>
                  <p className="font-semibold">{selectedContact.random}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p>HbA1C(%)</p>
                  <p className="font-semibold">{selectedContact.hbac}</p>
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
                  onClick={() =>
                    openBloodSugarUpdatePage(selectedContact.bloodSugarId)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhrBloodSugar;
