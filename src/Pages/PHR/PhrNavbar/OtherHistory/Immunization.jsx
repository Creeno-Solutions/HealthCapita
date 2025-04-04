import { useNavigate } from "react-router-dom";
import Update from "../../../../CommonComponents/Update/Update";

const Immunization = () => {
  const navigate = useNavigate();
  const openImmunizationUpdatePage = () => {
    navigate("/otherHistoryFields", { state: { activeTab: 2 } });
  };
  return (
    <>
      <div className="px-2 py-3">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">Immunization</h2>
          <Update onClick={openImmunizationUpdatePage} />
        </div>
        <p className="border-b border-gray-200 px-2 my-3"></p>

        <div className="flex gap-20">
          <div className="py-4 flex flex-col gap-2">
            {[
              "Capping",
              "Full Dentures",
              "Crowns",
              "Gum Disease",
              "Extraction of Tooth",
            ].map((item, index) => (
              <div key={index} className="flex justify-between w-72 text-base">
                <p className="min-w-[140px]">{item}:</p>
                <p className="font-semibold">Yes</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Immunization;
