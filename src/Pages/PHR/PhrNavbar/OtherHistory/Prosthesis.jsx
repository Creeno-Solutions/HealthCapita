import { useNavigate } from "react-router-dom";
import Update from "../../../../CommonComponents/Update/Update";

const Prosthesis = () => {
  const navigate = useNavigate();
  const openProsthesisupdatePage = () => {
    navigate("/otherHistoryFields", { state: { activeTab: 5 } });
  };
  const data = [
    { disease: "Heart Value", status: "No", type: "" },
    { disease: "Leg", status: "No", type: "" },
  ];
  return (
    <div className="px-4 py-5">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-3">Prosthesis</h2>
        <Update onClick={openProsthesisupdatePage} />
      </div>
      <p className="border-b border-gray-200 px-2 my-3"></p>
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
export default Prosthesis;
