import { useNavigate } from "react-router-dom";
import { PhrAssets } from "../../../../assets/PHR/assets";
import { useState, useEffect } from "react";
import axios from "axios";
import PlusAddBtn from "../../../../CommonComponents/PlusAddBtn/PlusAddBtn";
const SocialHistoryDash = () => {
  const navigate = useNavigate();
  const openPhrUpdatePage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/OverviewPhrUpdate", { state: { activeTab: 5 } });
  };

  const defaultExericeData = [
    { ExericeName: "Aerobics", ExercideId: 1 },
    { ExericeName: "Running", ExercideId: 2 },
    { ExericeName: "Team Sports", ExercideId: 3 },
    { ExericeName: "Biking", ExercideId: 4 },
    { ExericeName: "Skiing", ExercideId: 5 },
    { ExericeName: "Walking", ExercideId: 6 },
    { ExericeName: "Gym", ExercideId: 7 },
    { ExericeName: "Swimming", ExercideId: 8 },
    { ExericeName: "Yoga", ExercideId: 9 },
  ];

  const [formData, setFormData] = useState({});
  const userId = 10;
  const getSocialHistoryData = async () => {
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetUserCompleteDetails/${userId}`
      );
      if (response?.data?.status) {
        setFormData(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSocialHistoryData();
  }, []);

  return (
    <>
      <div className="my-4 bg-[#EAF7FF] rounded-lg py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-5 items-center">
            <img src={PhrAssets.SocialHistory_icon} alt="Icon" />
            <h2 className="font-medium">Social History</h2>
          </div>
          <PlusAddBtn onClick={openPhrUpdatePage} />
        </div>
        <p className="border border-gray-200 px-2 my-3"></p>

        {formData?.socialHistory?.socialHistory ? (
          <div className="py-2 px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="flex flex-col">
              <div className="flex gap-3 pb-2">
                <img src={PhrAssets.Exercise_icon} alt="" />
                <p className="font-medium landing-5">Exercise</p>
              </div>
              <div className="flex flex-row gap-3 py-1 ">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>
                  {formData?.socialHistory?.socialHistory.weekDaysOfExcercise}{" "}
                  Days Per Week
                </p>
              </div>

              <div className="flex flex-row gap-3 py-1 ">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>
                  {
                    formData?.socialHistory?.socialHistory
                      .totalSessionOfExcercise
                  }{" "}
                  Per Session
                </p>
              </div>

              <div className="flex flex-row gap-3 py-1">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p className="text-[#111928]">
                  Type Of Exercise:&nbsp;
                  {
                    defaultExericeData.find(
                      (item) =>
                        item.ExercideId ===
                        formData?.socialHistory?.socialHistory?.excerciseType
                    )?.ExericeName
                  }
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-3 pb-2">
                <img src={PhrAssets.Sleep_icon} alt="" />
                <p className="font-medium landing-5">Sleep</p>
              </div>
              <div className="flex flex-row gap-3 py-1  px-2">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>
                  {formData?.socialHistory?.socialHistory?.sleepOfHours} Per
                  Night
                </p>
              </div>

              <div className="flex flex-row gap-3 py-1 px-2">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>
                  {formData?.socialHistory?.socialHistory?.problemInSleep}{" "}
                  During Sleeping
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-3 pb-2">
                <img src={PhrAssets.Smoking_icon} alt="" />
                <p className="font-medium landing-5">Smoking</p>
              </div>
              <div className="flex flex-row gap-3 py-1  px-2">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>{formData?.socialHistory?.socialHistory?.smokeType}</p>
              </div>

              <div className="flex flex-row gap-3 py-1 px-2">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p className="text-[#111928]">
                  Other Smoker:{" "}
                  {formData?.socialHistory?.socialHistory?.otherSmoker
                    ? "Yes"
                    : "No"}
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-3 pb-2">
                <img src={PhrAssets.Drinking_icon} alt="" />
                <p className="font-medium landing-5">Drinking</p>
              </div>
              <div className="flex flex-row gap-3 py-1 items-baseline  px-2">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>
                  {
                    formData?.socialHistory?.socialHistory
                      ?.alcoholicBeveragesContent
                  }{" "}
                  Alcoholic Bverages Drink Per Week
                </p>
              </div>
            </div>

            <div className="flex flex-col py-4">
              <div className="flex flex-row gap-3 py-1">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>{formData?.socialHistory?.socialHistory?.livingSituation}</p>
              </div>

              <div className="flex flex-row gap-3 py-1 ">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>
                  {formData?.socialHistory?.socialHistory?.highestEducation}
                </p>
              </div>

              <div className="flex flex-row gap-3 py-1 ">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>
                  {formData?.socialHistory?.socialHistory?.healthAffectStress}
                </p>
              </div>

              <div className="flex flex-row gap-3 py-1 ">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>
                  {formData?.socialHistory?.socialHistory?.satisfactionLevel}
                </p>
              </div>
            </div>

            <div className="flex flex-col py-4">
              <div className="flex flex-row gap-3 py-1 px-2">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>
                  {
                    formData?.socialHistory?.socialHistory
                      ?.isExposedToToxicHazardousSubstance
                  }
                </p>
              </div>

              <div className="flex flex-row gap-3 py-1 px-2">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>
                  {
                    formData?.socialHistory?.socialHistory
                      ?.isDietaryRestrictions
                  }
                </p>
              </div>

              <div className="flex flex-row gap-3 py-1 px-2">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>
                  {
                    formData?.socialHistory?.socialHistory
                      ?.isReligiousSpiritualPhilosophicalPersonalConvicts
                  }
                </p>
              </div>

              <div className="flex flex-row gap-3 py-1 px-2">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>
                  {
                    formData?.socialHistory?.socialHistory
                      ?.verbalEmotionalPhysicalSexualRelationRemark
                  }
                </p>
              </div>
            </div>

            <div className="flex flex-col py-4">
              <div className="flex flex-row gap-3 py-1 px-2">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>
                  {
                    formData?.socialHistory?.socialHistory
                      ?.changeInSexualDesireRemark
                  }
                </p>
              </div>

              <div className="flex flex-row gap-3 py-1 px-2">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>
                  {formData?.socialHistory?.socialHistory
                    ?.isSexuallyTransmittedInfection
                    ? "Yes"
                    : "No"}
                </p>
              </div>

              <div className="flex flex-row gap-3 py-1 px-2">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>
                  {
                    formData?.socialHistory?.socialHistory
                      ?.hivandstisProtectionDescription
                  }
                </p>
              </div>

              <div className="flex flex-row gap-3 py-1 px-2">
                <img src={PhrAssets.Blackbar_icon} alt="" />
                <p>
                  {formData?.socialHistory?.socialHistory?.isPainDuringAfterSex
                    ? "Yes"
                    : "No"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-[#6B7280] text-center font-semibold px-4">
            No Social History found.
          </p>
        )}
      </div>
    </>
  );
};

export default SocialHistoryDash;
