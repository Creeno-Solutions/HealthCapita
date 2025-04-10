import { useNavigate } from "react-router-dom";
import Update from "../../../../CommonComponents/Update/Update";

const Hearing = () => {
  const navigate = useNavigate();
  const openHearingupdatePage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/otherHistoryFields", { state: { activeTab: 1 } });
  };
  const data = [
    { disease: "Implants", status: "No", type: "" },
    { disease: "Root Canal", status: "No", type: "" },
    { disease: "Partial Dental", status: "No", type: "" },
    { disease: "Bridges", status: "No", type: "" },
  ];
  return (
    <div className="px-4 py-5">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-3">Hearing</h2>
        <Update onClick={openHearingupdatePage} />
      </div>
      <p className="border-b border-gray-200 px-2 mb-3 mt-1"></p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#D1D5DB]">
              <th className="px-4 py-2 text-left">Disease</th>
              <th className=" px-4 py-2 text-center">Yes/No</th>
              <th className="px-4 py-2 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100 bg-white">
                <td className="px-4 py-2">{item.disease}</td>
                <td className="px-4  py-2 text-center">{item.status}</td>
                <td className="px-4 py-2">{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hearing;
