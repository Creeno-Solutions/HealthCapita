import { useLocation } from "react-router-dom";
import PhrUpdateHeader from "../../../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import SubmitButton from "../../../../../../CommonComponents/SubmitButton/SubmitButton";
import { PhrAssets } from "../../../../../../assets/PHR/assets";
import { useEffect, useState } from "react";
import axios from "axios";
import PhrProtectwithPassword from "../../../../../../CommonComponents/PhrUpdateHeader/PhrProtectwithPassword";
const MoodAndStressUpdate = () => {
  const location = useLocation();
  const moodId = location.state?.MoodStressId || null;

  const id = 666;
  const [formData, setFormData] = useState({
    moodStressId: 0,
    userId: id,
    dateofEntry: "",
    mood: "",
    comment: "",
    isPasswordProtected: false,
    isDisplayUnderSummaryPage: false,
    recStatus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://service.healthcapita.com/api/PHR/SavePhrMoodStress",
        formData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (moodId) {
      axios
        .get(
          `https://service.healthcapita.com/api/PHR/GetPhrMoodStressById/${moodId}/${id}`
        )
        .then((response) => {
          console.log("moodIddata", response?.data?.data);
          if (response?.data?.isData) {
            setFormData(response?.data?.data);
          }
        });
    }
  }, [moodId]);

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <PhrUpdateHeader />
        <PhrProtectwithPassword
          Title="Mood And Stress"
          isProtected={formData.isPasswordProtected}
          isDisplayed={formData.isDisplayUnderSummaryPage}
          onProtectChange={handleChange}
          onDisplayChange={handleChange}
        />
        {/* Form Section */}
        <div className="py-4 px-4 sm:px-6 md:px-4 lg:px-12">
          <form className="flex flex-col gap-4 p-4 w-4/4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Date of Entry</label>
              <input
                type="date"
                name="dateofEntry"
                value={formData.dateofEntry}
                onChange={handleChange}
                className="border border-gray-300 w-1/4 py-1 px-2 rounded-md"
              />
            </div>

            <div className="flex gap-8 w-4/4 my-3">
              <div className="flex flex-col items-center justify-center gap-3 w-4/4">
                <label>
                  <img src={PhrAssets.Sad} alt="" />
                </label>
                <input
                  type="radio"
                  name="mood"
                  value="Sad"
                  checked={formData.mood === "Sad"}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-4">
                <label>
                  <img src={PhrAssets.Happy} alt="" />
                </label>
                <input
                  type="radio"
                  name="mood"
                  value="Happy"
                  checked={formData.mood === "Happy"}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-3">
                <label>
                  <img src={PhrAssets.VeryHappy} alt="" />
                </label>
                <input
                  type="radio"
                  name="mood"
                  value="Very Happy"
                  checked={formData.mood === "Very Happy"}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-3">
                <label>
                  <img src={PhrAssets.ExtremeHappy} alt="" />
                </label>
                <input
                  type="radio"
                  name="mood"
                  value="Extreme Happy"
                  checked={formData.mood === "Extreme Happy"}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-semibold">Comments</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Enter Comments"
                className="w-1/4 h-32 border border-gray-300 rounded-md p-2 focus:outline-none"
              />
            </div>
          </form>
          <SubmitButton onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
};
export default MoodAndStressUpdate;
