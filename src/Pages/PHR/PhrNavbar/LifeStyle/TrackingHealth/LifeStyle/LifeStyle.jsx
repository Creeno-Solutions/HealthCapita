import { useNavigate } from "react-router-dom";
import { PhrAssets } from "../../../../../../assets/PHR/assets";
import Update from "../../../../../../CommonComponents/Update/Update";
import AddBtn from "../../../../../../CommonComponents/AddBtn/AddBtn";
import { useEffect, useState } from "react";
import axios from "axios";

const LifeStyle = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tobaco: "-",
    alcohol: "-",
    drugs: "-",
    dailyActivity: "-",
    stressLevel: "-",
    food: "-",
  });

  const openLifeStyleUpdatePage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/LifeStyleUpdate");
  };
console.log(Object.keys(formData).length > 0 )
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://service.healthcapita.com/api/PHR/GetPhrLifeStyleById?UserId=2"
        );
        console.log("Lifestyle response:", response?.data?.data);
        if (response?.data?.isData) {
          setFormData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching lifestyle data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <img src={PhrAssets.LifeStyle_icon} alt="Lifestyle Icon" />
          <h2 className="font-semibold text-lg">Lifestyle</h2>
        </div>
        <div className="flex gap-5 items-center">
        {Object.values(formData).some(value => value !== "-") ? (
  <Update onClick={openLifeStyleUpdatePage} showUpdateButton={true} />
) : (
  <AddBtn onClick={openLifeStyleUpdatePage} />
)}

        </div>
      </div>
      <hr className="border-gray-200 my-3" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-2 py-2">
        {[
          { label: "Tobacco", value: formData.tobaco },
          { label: "Alcohol", value: formData.alcohol },
          { label: "Drugs", value: formData.drugs },
          { label: "Daily Activity", value: formData.dailyActivity },
          { label: "Stress Level", value: formData.stressLevel },
          { label: "Food", value: formData.food },
        ].map(({ label, value }) => (
          <LifeStyleItem key={label} label={label} value={value} />
        ))}
      </div>
    </>
  );
};

const LifeStyleItem = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <p className="text-gray-700">{label}</p>
    <p className="font-medium text-base">{value}</p>
  </div>
);

export default LifeStyle;
