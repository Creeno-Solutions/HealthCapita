import axios from "axios";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

const AllergiesAndDrugs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  // const [selectedCheckBox,setSelectedCheckBox] = useState({})

  const [menuBar, setMenuBar] = useState(true);

  const GetAllergiesAndDrugsApi = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://service.healthcapita.com/api/PHR/AllergiesandDrugsSenestivity"
      );
      const fetchedData = response?.data || [];
      setData(fetchedData);

      const grouped = fetchedData.reduce((acc, item) => {
        if (!acc[item.allergiesDrugGroupName]) {
          acc[item.allergiesDrugGroupName] = [];
        }
        acc[item.allergiesDrugGroupName].push(item);
        return acc;
      }, {});
      setGroupedData(grouped);
    } catch (error) {
      console.error("Error fetching data:", error);
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetAllergiesAndDrugsApi(); // Fetch data on mount
  }, []);

  const renderSection = (title, items) => (
    <div className="mb-8">
      <h2 className="font-semibold text-base text-gray-800 mb-3">{title}</h2>
      <div className="flex flex-wrap gap-4">
        {items.map((item) => (
          <div key={item.allergyDetailId} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-blue-500 custom-checkbox cursor-pointer"
              id={`allergy-${item.allergyDetailId}`}
            />
            <label
              htmlFor={`allergy-${item.allergyDetailId}`}
              className="text-gray-700"
            >
              {item.allergyName}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Oval
          visible={true}
          height="40"
          width="40"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {Object.entries(groupedData).map(([groupName, items]) => (
        <div key={groupName}>
          {renderSection(groupName, items)}
          <hr className="my-6 border-gray-300" />
        </div>
      ))}
    </div>
  );
};

export default AllergiesAndDrugs;
