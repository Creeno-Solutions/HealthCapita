import PhrUpdateHeader from "../../../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import axios from "axios";
import { useState, useEffect } from "react";
import PhrProtectwithPassword from "../../../../../../CommonComponents/PhrUpdateHeader/PhrProtectwithPassword";
const LifeStyleUpdate = () => {
  const [formData, setFormData] = useState({
    userId: "2",
    tobaco: "",
    alcohol: "",
    drugs: "",
    dailyActivity: "",
    stressLevel: "",
    food: "",
    isProtectPassword: true,
    isDisplayUnderSummaryPage: true,
  });

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
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://service.healthcapita.com/api/PHR/SavePhrLifestyle",
        formData
      );
    } catch (error) {
      console.error("Error saving medical contact:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        <PhrUpdateHeader />
        <PhrProtectwithPassword
          Title="Life Style"
          isProtected={formData.isPasswordProtected}
          isDisplayed={formData.isDisplayUnderSummaryPage}
          onProtectChange={handleChange}
          onDisplayChange={handleChange}
        />
        <div className="py-4 px-4 sm:px-6 md:px-4 lg:px-12">
          <form className="flex flex-col gap-4 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="tobacco" className="font-normal">
                  Tobacco
                </label>
                <select
                  name="tobaco"
                  onChange={handleChange}
                  value={formData.tobaco}
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Hookah">Hookah</option>
                  <option value="Cigerate">Cigarettes</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-normal">Alcohol</label>
                <select
                  name="alcohol"
                  value={formData.alcohol}
                  onChange={handleChange}
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="vodka">Vodka</option>
                  <option value="Beer">Beer</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-normal">Drugs</label>
                <select
                  name="drugs"
                  value={formData.drugs}
                  onChange={handleChange}
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Prisicibrations">Fentanyl</option>
                  <option value="Cannabis">Cannabis</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-normal">Daily Activities</label>
                <select
                  name="dailyActivity"
                  value={formData.dailyActivity}
                  onChange={handleChange}
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-normal">Stress Level</label>
                <select
                  name="stressLevel"
                  value={formData.stressLevel}
                  onChange={handleChange}
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Acute stress">Acute stress</option>
                  <option value="Chronic stress">Chronic stress</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-normal">Food</label>
                <select
                  name="food"
                  value={formData.food}
                  onChange={handleChange}
                  className="border border-gray-300 py-2 px-3 rounded-md w-3/4 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="Veg">Veg</option>
                  <option value="Non-veg">Non-veg</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div className="relative">
          <p className="mx-14 border-b-2 border-gray-100 my-5"></p>
          <button
            onClick={handleSubmit}
            className="bg-[#007183] text-white font-medium tracking-wide text-lg py-2 px-6 rounded-full absolute -bottom-20 right-8 mb-0 mr-4"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default LifeStyleUpdate;
