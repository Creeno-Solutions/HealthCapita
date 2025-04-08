import { useNavigate } from "react-router-dom";
import { PhrAssets } from "../../../../assets/PHR/assets";
import { useState, useEffect } from "react";
import axios from "axios";
import UserInfo from "../../../../utils/UserInfo";
import PlusAddBtn from "../../../../CommonComponents/PlusAddBtn/PlusAddBtn";

<<<<<<< HEAD
const MedicalAndSurgery = () => {
  const navigate = useNavigate();

  const openMedicalAndSurgeryUpdatePage = () => {
    navigate("/PhrMedicalAndSUrgeryUpdate");
  };

  return (
    <>
      <div className="mx-10 my-5 bg-[#F9FAFB] rounded-lg py-4 px-4">
        <div className="flex justify-between">
          <h2 className="font-semibold text-lg">Medical & Surgery</h2>
          <div className="flex gap-5 items-center">
            <Update
              showUpdateButton={true}
              onClick={openMedicalAndSurgeryUpdatePage}
            />
            <AddBtn onClick={openMedicalAndSurgeryUpdatePage} />
          </div>
=======
const MedicalAndSurgery = ({ showUpdateButton = true }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const userId = 10;

  const openMedicalUpdatePage = (medicalHistoryid) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/PhrMedicalAndSUrgeryUpdate", { state: { medicalHistoryid } });
  };
  const openPhrMedicalAddpage = () => {
    navigate("/PhrMedicalAndSUrgeryUpdate");
  };
  console.log("dataaa", data);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetPhrMedicalHistory?userId=${userId}`
        );
        console.log("response get mediacal history response", response);

        if (response?.data?.status) {
          const responseData = response?.data?.data;
          setData(Array.isArray(responseData) ? responseData : [responseData]);
        }
      } catch (error) {
        console.error("Error fetching insurance details:", error);
      }
    };
    getData();
  }, []);
  const handleDelete = async (medicalHistoryid) => {
    try {
      const response = await axios.post(
        `https://service.healthcapita.com/api/PHR/DeleteInsuranceDetailsmedicalHistoryiduserId?medicalHistoryid=${medicalHistoryid}&userId=${userId}`
      );
      console.log("response insurance delete", response);
      if (response?.data?.success) {
        const deletedData = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetPhrBloodPressure?userId=${userId}`
        );
        setData(deletedData?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-5 px-5 my-7 bg-[#F9FAFB] rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">

          <p className="font-medium leading-5 text-lg text-[#111928]">
            Medical & Surgery
          </p>
>>>>>>> 3a1b1e8 (update medical and surgery)
        </div>
        {showUpdateButton && <PlusAddBtn onClick={openPhrMedicalAddpage} />}
      </div>
      <p className="border border-gray-300 px-2 my-3"></p>

<<<<<<< HEAD
        <div className="py-2 px-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
          <div className="flex flex-col gap-2">
            <p>Speciality:</p>
            <p className="font-semibold">Cancer</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Sub Speciality:</p>
            <p className="font-semibold">Lung Cancer</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Date of Diagnosis:</p>
            <p className="font-semibold">03/10/2021</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Physician Specialist: --</p>
            <p className="font-semibold">--</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Primary Care Physician: --</p>
            <p className="font-semibold">--</p>
          </div>
        </div>

        <div className="py-2 px-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
          <div className="flex flex-col gap-2">
            <p>Prescribed By</p>
            <p className="font-semibold">Jane Cooper</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Sub Speciality:</p>
            <p className="font-semibold">Lung Cancer</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Date of Diagnosis:</p>
            <p className="font-semibold">03/10/2021</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Physician Specialist: --</p>
            <p className="font-semibold">--</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Primary Care Physician: --</p>
            <p className="font-semibold">--</p>
          </div>
        </div>

        <p className="border border-gray-200 border-dotted px-2 my-5"></p>

        <div className="py-2 px-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
          <div className="flex flex-col gap-2">
            <p>Speciality:</p>
            <p className="font-semibold">Cancer</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Sub Speciality:</p>
            <p className="font-semibold">Lung Cancer</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Date of Diagnosis:</p>
            <p className="font-semibold">03/10/2021</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Physician Specialist: --</p>
            <p className="font-semibold">--</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Primary Care Physician: --</p>
            <p className="font-semibold">--</p>
          </div>
        </div>

        <div className="py-2 px-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
          <div className="flex flex-col gap-2">
            <p>Prescribed By</p>
            <p className="font-semibold">Jane Cooper</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Sub Speciality:</p>
            <p className="font-semibold">Lung Cancer</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Date of Diagnosis:</p>
            <p className="font-semibold">03/10/2021</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Physician Specialist: --</p>
            <p className="font-semibold">--</p>
          </div>

          <div className="flex flex-col gap-2">
            <p>Primary Care Physician: --</p>
            <p className="font-semibold">--</p>
          </div>
        </div>
      </div>
    </>
  );
}
=======
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[#D1D5DB]">
              <th className="px-6 py-3 text-left text-base font-medium"></th>
              <th className="px-6 py-3 text-left text-base font-medium">
                Date of Diagnosis
              </th>
              <th className="px-6 py-3 text-left text-base font-medium"> Speciality</th>
              <th className="px-6 py-3 text-left text-base font-medium">
              Sub Speciality
              </th>
              <th className="px-6 py-3 text-left text-base font-medium">
              PhysicianSpecialist
              </th>
              <th className="px-6 py-3 text-left text-base font-medium">
              primaryCarePhysician
              </th>
              <th className="px-6 py-3 text-left text-base font-medium">

              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.medicalHistoryid} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-900 border-b">
                    <img
                      src={PhrAssets.ThreeDotted}
                      alt="Options"
                      className="w-6 h-6 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-b">
                    {item.DateofDiagnosis}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-b">
                    {item.Specialityid}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-b">
                    {item.subSpecialityId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-b">
                    {item.PhysicianSpecialist}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-b">
                    {item.PrimaryCarePhysician}
                  </td>
                  <td className="px-4 py-4 text-base text-gray-900 border-b">
                    <div className="flex gap-4 items-center">
                      <button
                        onClick={() =>
                          openMedicalUpdatePage(item.MedicalHistoryId)
                        }
                      >
                        <img src={PhrAssets.Edit} alt="Edit"/>
                      </button>
                      <button
                        onClick={() => handleDelete(item.medicalHistoryid)}
                        className="flex gap-1 items-center text-[#1C9401] font-semibold"
                      >
                        <img src={PhrAssets.Delete} alt="Delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-gray-500 border-b"
                >
                  No insurance details available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
>>>>>>> 3a1b1e8 (update medical and surgery)

export default MedicalAndSurgery;
