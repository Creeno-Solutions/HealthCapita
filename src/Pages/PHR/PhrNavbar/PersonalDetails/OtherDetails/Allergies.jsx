import React, { useEffect, useState } from "react";
import TextTitle from "../../../../../CommonComponents/TextTitle/TextTitle";
import { PhrAssets } from "../../../../../assets/PHR/assets";
import Separator from "../../../../../CommonComponents/Separator";
import { useNavigate } from "react-router-dom";
import SocialHistoryDash from "../SocialHistoryDash";
import PlusAddBtn from "../../../../../CommonComponents/PlusAddBtn/PlusAddBtn";
import axios from "axios";

const Allergies = ({ showUpdateButton = true }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const openPhrUpdatePage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/OverviewPhrUpdate");
  };
  const userId = 10;
  const getOtherDetailsData = async () => {
    try {
      const response = await axios.get(
        `https://service.healthcapita.com/api/PHR/GetUserCompleteDetails/${userId}`
      );
      console.log("otherDetails", response);
      if (response?.data?.status) {
        setFormData(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOtherDetailsData();
  }, []);
  return (
    <>
      <div className="py-3 px-8 bg-[#F9FAFB] my-5 rounded-md">
        <div className="flex justify-between">
          <TextTitle text={"Other Details"} />

          {showUpdateButton && <PlusAddBtn onClick={openPhrUpdatePage} />}
        </div>
        <p className="border border-gray-200 px-2 my-3"></p>

        <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-3">
          <div className="py-2 bg-[#FFF5F5] rounded-md max-h-80">
            <div className="flex gap-4 items-center px-4">
              <img
                className="p-2 rounded-full bg-[#FFF1F1]"
                src={PhrAssets.Allergies_icon}
                alt="allergy"
              />

              <p className="font-semibold text-md landing-5">
                Allergies and Drugs Sensitivity
              </p>
            </div>
            <p className="border border-gray-200"></p>
            <div className="overflow-y-auto max-h-64  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pt-3">
              {formData?.allergyData?.length > 0 ? (
                [
                  ...new Set(
                    formData.allergyData
                      .filter((item) => item.ischecked)
                      .map((item) => item.allergiesDrugGroupName)
                  ),
                ].map((groupName, index) => (
                  <div key={index}>
                    <h2 className="pl-5 font-semibold">{groupName}</h2>

                    {formData.allergyData
                      .filter(
                        (item) =>
                          item.ischecked &&
                          item.allergiesDrugGroupName === groupName
                      )
                      .map((item) => (
                        <div
                          className="flex gap-3 my-2 pl-5"
                          key={item.allergyId}
                        >
                          <img src={PhrAssets.RedBar_icon} alt="" />
                          <p className="text-[#111928]">{item.allergyName}</p>
                        </div>
                      ))}
                  </div>
                ))
              ) : (
                <p className="text-[#6B7280] text-center font-semibold">
                  No Allergies Found
                </p>
              )}
            </div>
          </div>

          <div className="py-2 bg-[#F5FFF2] rounded-md">
            <div className="flex gap-4 items-center px-4 py-2 overflow-y-auto max-h-52 scrollbar-hide">
              <img
                className="p-2 rounded-full "
                src={PhrAssets.HealthStatus_icon}
                alt="allergy"
              />
              <p className="font-semibold text-lg landing-5">
                Current Health Status
              </p>
            </div>
            <p className="border border-gray-200"></p>

            <div className="flex flex-col gap-4 px-4 pt-4 max-h-80">
              {formData?.currentHealthStatus?.currentHealthStatus ? (
                <>
                  <p className="font-semibold text-base leading-5 text-[#111928]">
                    Currently suffering from:
                  </p>
                  <div className="flex gap-3">
                    <img src={PhrAssets.GreenBar_icon} alt="" />
                    <p className="text-[#111928]">
                      {
                        formData.currentHealthStatus.currentHealthStatus
                          .currentSuffering
                      }
                    </p>
                  </div>

                  <p className="font-semibold text-base leading-5 text-[#111928]">
                    Currently taking any treatment:
                  </p>
                  <div className="flex gap-3">
                    <img src={PhrAssets.GreenBar_icon} alt="" />
                    <p className="text-[#111928]">
                      {
                        formData.currentHealthStatus.currentHealthStatus
                          .currentTakingAnyTreatment
                      }
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-[#6B7280] text-center font-semibold">
                  No Current Health Status Found.
                </p>
              )}
            </div>
          </div>

          <div className="py-2 bg-[#F1F0FF] rounded-md max-h-80">
            <div className="flex gap-4 items-center px-4">
              <img
                className="p-2 rounded-full"
                src={PhrAssets.DistinguishMark_icon}
                alt="allergy"
              />
              <p className="font-semibold text-md leading-5">
                Distinguishing Marks
              </p>
            </div>
            <p className="border border-gray-200"></p>

            {formData?.distinguishMark?.details ? (
              <div className="flex flex-col gap-4 px-4 overflow-y-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pt-3">
                <p className="font-semibold text-md leading-5">Birth Mark</p>
                <div className="flex flex-col gap-2">
                  {[
                    formData?.distinguishMark?.details?.birthMark1,
                    formData?.distinguishMark?.details?.birthMark2,
                    formData?.distinguishMark?.details?.birthMark3,
                    formData?.distinguishMark?.details?.birthMark4,
                    formData?.distinguishMark?.details?.birthMark5,
                  ]
                    .filter((mark) => mark && mark.trim() !== "")
                    .map((mark, index) => (
                      <div className="flex gap-3 items-center" key={index}>
                        <img src={PhrAssets.BlueBar_icon} alt="bar" />
                        <p className="text-[#111928]">{mark}</p>
                      </div>
                    ))}
                </div>

                <p className="font-semibold text-md leading-5">Tattoo</p>
                <div className="flex gap-3">
                  <img src={PhrAssets.BlueBar_icon} alt="bar" />
                  <p className="text-[#111928]">
                    {formData?.distinguishMark?.details?.tattoo}
                  </p>
                </div>

                <p className="font-semibold text-md leading-5">Scar</p>
                <div className="flex gap-3">
                  <img src={PhrAssets.BlueBar_icon} alt="bar" />
                  <p className="text-[#111928]">
                    {formData?.distinguishMark?.details?.scar}
                  </p>
                </div>

                <p className="font-semibold text-md leading-5">Burn Mark</p>
                <div className="flex gap-3">
                  <img src={PhrAssets.BlueBar_icon} alt="bar" />
                  <p className="text-[#111928]">
                    {formData?.distinguishMark?.details?.burnMark}
                  </p>
                </div>

                <p className="font-semibold text-md leading-5">Hair Color</p>
                <div className="flex gap-3">
                  <img src={PhrAssets.BlueBar_icon} alt="bar" />
                  <p className="text-[#111928]">
                    {formData?.distinguishMark?.details?.hairColor}
                  </p>
                </div>

                <p className="font-semibold text-md leading-5">Skin Color</p>
                <div className="flex gap-3">
                  <img src={PhrAssets.BlueBar_icon} alt="bar" />
                  <p className="text-[#111928]">
                    {formData?.distinguishMark?.details?.skinColor}
                  </p>
                </div>

                <p className="font-semibold text-md leading-5">Eye Color</p>
                <div className="flex gap-3">
                  <img src={PhrAssets.BlueBar_icon} alt="bar" />
                  <p className="text-[#111928]">
                    {formData?.distinguishMark?.details?.eyeColor}
                  </p>
                </div>

                <p className="font-semibold text-md leading-5">
                  Other Distinguishing Mark
                </p>
                <div className="flex gap-3">
                  <img src={PhrAssets.BlueBar_icon} alt="bar" />
                  <p className="text-[#111928]">
                    {formData?.distinguishMark?.details?.otherMarks}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-[#6B7280] text-center font-semibold px-4">
                No Distinguishing Mark Found.
              </p>
            )}
          </div>

          <div className="py-2 bg-[#EFFEFF] rounded-md max-h-80">
            <div className="flex gap-4 items-center px-4 py-2">
              <img
                className="p-2 rounded-full"
                src={PhrAssets.Infant_icon}
                alt="allergy"
              />
              <p className="font-semibold text-lg landing-5">Infant History</p>
            </div>
            <p className="border border-gray-200"></p>

            <div className="pt-2 flex flex-col gap-4 px-4 overflow-y-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {formData?.infantHistory?.infantHistory?.underWeight ||
              formData?.infantHistory?.infantHistory?.overWeight ||
              formData?.infantHistory?.infantHistory?.soreThroat ||
              formData?.infantHistory?.infantHistory?.jaundice ||
              formData?.infantHistory?.infantHistory?.intExtDefect ? (
                <>
                  {formData.infantHistory.infantHistory.underWeight && (
                    <div className="flex gap-3">
                      <img src={PhrAssets.SkyBlueBar_icon} alt="" />
                      <p className="text-[#111928]">
                        Child Underweight at Birth
                      </p>
                    </div>
                  )}

                  {formData.infantHistory.infantHistory.overWeight && (
                    <div className="flex gap-3">
                      <img src={PhrAssets.SkyBlueBar_icon} alt="" />
                      <p className="text-[#111928]">
                        Child Overweight at Birth
                      </p>
                    </div>
                  )}

                  {formData.infantHistory.infantHistory.soreThroat && (
                    <div className="flex gap-3">
                      <img src={PhrAssets.SkyBlueBar_icon} alt="" />
                      <p className="text-[#111928]">
                        Child had Sore Throat after birth
                      </p>
                    </div>
                  )}

                  {formData.infantHistory.infantHistory.jaundice && (
                    <div className="flex gap-3">
                      <img src={PhrAssets.SkyBlueBar_icon} alt="" />
                      <p className="text-[#111928]">
                        Child suffered from Jaundice after birth
                      </p>
                    </div>
                  )}

                  <p className="pt-1 font-semibold text-md landing-5">
                    Detected congenital Internal / External Defect
                  </p>
                  <div className="flex gap-3">
                    <img src={PhrAssets.SkyBlueBar_icon} alt="" />
                    <p className="text-[#111928]">
                      {formData.infantHistory.infantHistory.intExtDefect
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>

                  {formData.infantHistory.infantHistory.intExtDefect &&
                    formData.infantHistory.infantHistory.remarks?.trim() && (
                      <div className="flex gap-3">
                        <img src={PhrAssets.SkyBlueBar_icon} alt="" />
                        <p className="text-[#111928]">
                          Remarks:{" "}
                          {formData.infantHistory.infantHistory.remarks}
                        </p>
                      </div>
                    )}
                </>
              ) : (
                <p className="text-[#6B7280] text-center font-semibold">
                  No Infant History Found.
                </p>
              )}
            </div>
          </div>
        </div>

        <SocialHistoryDash />
      </div>
      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6"></div>
    </>
  );
};

export default Allergies;
