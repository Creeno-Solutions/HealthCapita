import { useNavigate } from "react-router-dom";
import Update from "../../../../CommonComponents/Update/Update";
const FamilyMedicalHistory = () => {
  const navigate = useNavigate();
  const openFamilyMedicalHistoryUpdatePage = () => {
    navigate("/otherHistoryFields", {
      state: { activeTab: 6 },
    });
    window.scrollTo({ top: 0, bhavious: "smooth" });
  };
  return (
    <>
      <div className="px-4 py-5">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-3">Family Medical History</h2>
          <Update onClick={openFamilyMedicalHistoryUpdatePage} />
        </div>
        <p className="border-b border-gray-200 px-2 my-3"></p>
      </div>
    </>
  );
};

export default FamilyMedicalHistory;
