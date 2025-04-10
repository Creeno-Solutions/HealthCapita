import { useNavigate } from "react-router-dom";
import Update from "../../../../CommonComponents/Update/Update";
const FamilyMedicalHistory = () => {
  const navigate = useNavigate();
  const openFamilyMedicalHistoryUpdatePage = () => {
    navigate("/otherHistoryFields", {
      state: { activeTab: 6 },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div className="px-4 py-5">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-3">Family Medical History</h2>
          <Update onClick={openFamilyMedicalHistoryUpdatePage} />
        </div>
        <p className="border-b border-gray-200 px-2 my-3"></p>
        <div className="w-full bg-white py-4 px-4">
          <p className="flex mb-3">
            Family History Of Asthama :{" "}
            <span className="font-semibold">Yes</span>
          </p>
          <p className="flex">
            Comments: <span className="font-semibold">--</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default FamilyMedicalHistory;
