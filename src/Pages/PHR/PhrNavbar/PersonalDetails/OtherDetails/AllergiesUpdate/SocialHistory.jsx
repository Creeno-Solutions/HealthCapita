import react, { useEffect, useState } from 'react'
import UpdateDetailsBtn from '../../../../../../CommonComponents/UpdateDetailsBtn/UpdateDetailsBtn';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SocialHistory = ({
  isPasswordProtected,
  isDisplayUnderSummaryPage,
  handleProtectChange,
  handleDisplayChange,
  handleTabChange,
  closePage,
}) => {
  const userId = 10;
  //150, 10
  const [formData, setFormData] = useState({
    socialHistoryId: "",
    userId: userId,
    weekDaysOfExcercise: "",
    totalSessionOfExcercise: "",
    excerciseType: "",
    otherExcerciseType: "",
    sleepOfHours: "",
    problemInSleep: "",
    smokeType: "",
    otherSmoker: false,
    alcoholicBeveragesContent: "",
    livingSituation: "",
    highestEducation: "",
    healthAffectStress: "",
    satisfactionLevel: "",
    isExposedToToxicHazardousSubstance: "",
    isDietaryRestrictions: "",
    isReligiousSpiritualPhilosophicalPersonalConvicts: "",
    isVerbalEmotionalPhysicalSexualRelation: false,
    verbalEmotionalPhysicalSexualRelationRemark: "",
    isChangeInSexualDesire: false,
    changeInSexualDesireRemark: "",
    isSexuallyTransmittedInfection: false,
    hivandstisProtectionDescription: "",
    isPainDuringAfterSex: false,
    isPasswordProtected: false,
    isDisplayUnderSummaryPage: false,
  });

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

  const [ExericeData, setExerciseData] = useState(defaultExericeData);
  const [abusiveRelationship, setAbusiveRelationship] = useState(
    formData.isVerbalEmotionalPhysicalSexualRelation || false
  );
  const [recentChanges, setRecentChanges] = useState(
    formData.isChangeInSexualDesire || false
  );
  const [hasSTI, setHasSTI] = useState(
    formData.isSexuallyTransmittedInfection || false
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetSocialHistoryById?UserId=${userId}`
        );

        if (response.data.isData) {
          const fetchedData = response.data.data;
          if (fetchData) {
            setFormData(() => ({
              ...fetchedData,
            }));
            handleProtectChange({
              target: { checked: fetchedData.isPasswordProtected || false },
            });
            handleDisplayChange({
              target: {
                checked: fetchedData.isDisplayUnderSummaryPage || false,
              },
            });
          }
        }
      } catch (error) {
        console.error("Error fetching social history data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val;

    if (type === "checkbox") {
      val = checked;
    } else if (value === "true" || value === "false") {
      val = value === "true"; // convert to boolean
    } else {
      val = value;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: val,
    }));
  };

  const handleChangeNumber = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: ["weekDaysOfExcercise"].includes(name)
        ? parseInt(value, 10)
        : value,
    }));
  };

  // Update handler for the formData state
  const handleAbusiveRelationshipChange = (value) => {
    setAbusiveRelationship(value);
    setFormData({
      ...formData,
      isVerbalEmotionalPhysicalSexualRelation: value,
      verbalEmotionalPhysicalSexualRelationRemark: value
        ? formData.verbalEmotionalPhysicalSexualRelationRemark
        : "", // Clear remark if 'No' is selected
    });
  };

  const handleRecentChanges = (value) => {
    setRecentChanges(value);
    setFormData({
      ...formData,
      isChangeInSexualDesire: value,
      changeInSexualDesireRemark: value
        ? formData.changeInSexualDesireRemark
        : "", // Clear remark if 'No' is selected
    });
  };

  const handleSTIChange = (value) => {
    setHasSTI(value);
    setFormData({
      ...formData,
      isSexuallyTransmittedInfection: value,
    });
  };

  const sendSocialHistoryData = async () => {
    try {
      const response = await axios.post(
        "https://service.healthcapita.com/api/PHR/SaveSocialHistoryDetails",
        {
          socialHistoryId: formData.socialHistoryId || 0,
          userid: userId || 0,
          weekDaysOfExcercise: formData.weekDaysOfExcercise || 0,
          totalSessionOfExcercise: formData.totalSessionOfExcercise || "",
          excerciseType: formData.excerciseType || 0,
          otherExcerciseType: formData.otherExcerciseType || "",
          sleepOfHours: String(formData.sleepOfHours || ""),
          problemInSleep: String(formData.problemInSleep || ""),
          smokeType: formData.smokeType || "",
          otherSmoker: formData.otherSmoker || false,
          alcoholicBeveragesContent: formData.alcoholicBeveragesContent || "",
          livingSituation: formData.livingSituation || "",
          highestEducation: formData.highestEducation || "",
          healthAffectStress: formData.healthAffectStress || "",
          satisfactionLevel: formData.satisfactionLevel || "",
          isExposedToToxicHazardousSubstance:
            formData.isExposedToToxicHazardousSubstance || "",
          isDietaryRestrictions: formData.isDietaryRestrictions || "",
          isReligiousSpiritualPhilosophicalPersonalConvicts:
            formData.isReligiousSpiritualPhilosophicalPersonalConvicts || "",
          isVerbalEmotionalPhysicalSexualRelation: abusiveRelationship || false,
          verbalEmotionalPhysicalSexualRelationRemark:
            formData.verbalEmotionalPhysicalSexualRelationRemark || "",
          isChangeInSexualDesire: recentChanges || false,
          changeInSexualDesireRemark: formData.changeInSexualDesireRemark || "",
          isSexuallyTransmittedInfection:
            formData.isSexuallyTransmittedInfection || false,
          hivandstisProtectionDescription:
            formData.hivandstisProtectionDescription || "",
          isPainDuringAfterSex: formData.isPainDuringAfterSex || false,
          isPasswordProtected: isPasswordProtected,
          isDisplayUnderSummaryPage: isDisplayUnderSummaryPage,
        }
      );

      console.log("SocialHistoryResponse", response);
      if (response?.data?.status) {
        console.log("Data successfully sent to the backend!", response.data);
        toast.success("Data updated successfully!");
        closePage();
      } else {
        console.error("Failed to save data:", response.statusText);
        toast.error("Failed to send data!");
      }
    } catch (error) {
      console.error("An error occurred while sending the data:", error);
      alert("An error occurred while saving the data.");
    }
  };

  return (
    <>
      {/* weekDaysOfExcercise */}
      <div className="flex flex-col gap-3 w-full">
        <label>How many days per week do you excercise?</label>
        <select
          name="weekDaysOfExcercise"
          value={formData.weekDaysOfExcercise}
          onChange={handleChangeNumber}
          className="w-1/3 focus:outline-none p-2 rounded border border-gray-300"
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* totalSessionOfExcercise */}
      <div className="flex flex-col gap-3 w-full">
        <label>How much time do you excercise per session?</label>
        <select
          name="totalSessionOfExcercise"
          value={formData.totalSessionOfExcercise}
          onChange={handleChange}
          className="w-1/3 focus:outline-none p-2 rounded border border-gray-300"
        >
          <option value="1 hour">1 Hour</option>
          <option value="15 minutes or less">15 minutes or Less</option>
          <option value="30 minutes">30 minutes</option>
          <option value="more than 1hour">More than 1 Hour</option>
          <option value="not applicable">Not Applicable</option>
        </select>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* excerciseType */}
      <div>
        <p>What type of exercise do you do?</p>
        <div className="flex flex-wrap gap-4 pt-3">
          {defaultExericeData.map((item) => (
            <div key={item.ExercideId} className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="excerciseType"
                value={item.ExercideId}
                checked={formData.excerciseType === item.ExercideId}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    excerciseType: parseInt(e.target.value), // Store only the most recently checked checkbox value
                  });
                }}
              />
              <label>{item.ExericeName}</label>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* otherExcerciseType */}
      <div className="flex flex-col gap-3">
        <label>If you have any other excercise(specify)</label>
        <input
          name="otherExcerciseType"
          placeholder="Enter Exercise"
          value={formData.otherExcerciseType}
          onChange={handleChange}
          className="w-11/12 p-3 focus:outline-none rounded h-16 border border-gray-300"
          type="text"
        />
      </div>

      <hr className="my-6 border-gray-300" />

      {/* sleepOfHours */}
      <div className="flex flex-col gap-3 w-full">
        <label>How many hours of sleep do you get per night?</label>
        <select
          name="sleepOfHours"
          value={formData.sleepOfHours}
          onChange={handleChange}
          className="w-1/3 focus:outline-none p-2 rounded border border-gray-300"
        >
          <option value="4 or less">4 or Less</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9 or more">9 or More</option>
        </select>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* problemInSleep */}
      <div className="flex flex-col gap-3 w-full">
        <label>Do you have any problems in/during sleeping?</label>
        <select
          name="problemInSleep"
          value={formData.problemInSleep}
          onChange={handleChange}
          className="w-1/3 focus:outline-none p-2 rounded border border-gray-300"
        >
          <option value="no">No</option>
          <option value="sometimes">Sometimes</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* smokeType */}
      <div>
        <p>How would you describe your smoking habits?</p>
        <div className="flex gap-6">
          <div className="flex items-center gap-1 pt-2">
            <input
              type="radio"
              name="smokeType"
              value="currentsmoker"
              checked={formData.smokeType === "currentsmoker"}
              onChange={handleChange}
            />
            <label>Current Smoker</label>
          </div>

          <div className="flex items-center gap-1 pt-2">
            <input
              type="radio"
              id="usedtosmoke"
              name="smokeType"
              value="usedtosmoke"
              checked={formData.smokeType === "usedtosmoke"}
              onChange={handleChange}
            />
            <label>Used to smoke</label>
          </div>

          <div className="flex items-center gap-1 pt-2">
            <input
              type="radio"
              id="neversmoke"
              name="smokeType"
              value="neversmoke"
              checked={formData.smokeType === "neversmoke"}
              onChange={handleChange}
            />
            <label>Never smoke</label>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* otherSmoker */}
      <div>
        <p>Does anyone else in your home smoke?</p>
        <div className="flex gap-6">
          <div className="flex items-center gap-1 pt-2">
            <input
              type="radio"
              id="yes"
              name="otherSmoker"
              value="true"
              checked={formData.otherSmoker === true}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: e.target.name,
                    value: e.target.value === "true",
                  },
                })
              }
            />
            <label>Yes</label>
          </div>

          <div className="flex items-center gap-1 pt-2">
            <input
              type="radio"
              id="no"
              name="otherSmoker"
              value="false"
              checked={formData.otherSmoker === false}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: e.target.name,
                    value: e.target.value === "true",
                  },
                })
              }
            />
            <label>No</label>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* alcoholicBeveragesContent */}
      <div className="flex flex-col gap-3 w-full">
        <label>How many alcoholic beverages do you drink per week?</label>
        <select
          name="alcoholicBeveragesContent"
          value={formData.alcoholicBeveragesContent}
          onChange={handleChange}
          className="w-1/3 focus:outline-none p-2 rounded border border-gray-300"
        >
          <option value="14-21">14-21</option>
          <option value="1-7">1-7</option>
          <option value="22-30">22-30</option>
          <option value="30ormore">30 or More</option>
          <option value="8-13">8-13</option>
          <option value="none">None</option>
        </select>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* livingSituation */}
      <div className="flex flex-col gap-3 w-full">
        <label>What is your current living situation?</label>
        <select
          name="livingSituation"
          value={formData.livingSituation}
          onChange={handleChange}
          className="w-1/3 focus:outline-none p-2 rounded border border-gray-300"
        >
          <option value="livingalone">Living Alone</option>
          <option value="livinginacommunity">Living in a community</option>
          <option value="livingwithacompanion">Living with a companion</option>
          <option value="livingwithfamily">Living with family</option>
          <option value="livingwithfriends/roommates">
            Living with friends/roommates
          </option>
          <option value="livingwithlodger/landlord">
            Living with lodger/landlord
          </option>
          <option value="livingwithrelatives/extendedfamily">
            Living with relatives/extended family
          </option>
          <option value="livingwithspouse/partner">
            Living with spouse/partner
          </option>
        </select>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* highestEducation */}
      <div className="flex flex-col gap-3 w-full">
        <label>What is your highest education level?</label>
        <select
          name="highestEducation"
          value={formData.highestEducation}
          onChange={handleChange}
          className="w-1/3 focus:outline-none p-2 rounded border border-gray-300"
        >
          <option value="collegedegree">College Degree</option>
          <option value="gradeschool">Grade School</option>
          <option value="highschooldegree">High School Degree</option>
          <option value="notapplicable">Not Applicable</option>
          <option value="post-graduatestudies/degree">
            Post-Graduate Studies/Degree
          </option>
          <option value="pre-school">Pre-School</option>
          <option value="somecollege">Some College</option>
          <option value="somehighschool">Some High School</option>
        </select>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* healthAffectStress */}
      <div className="flex flex-col gap-3 w-full">
        <label>In past year, how much has stress affected your health?</label>
        <select
          name="healthAffectStress"
          value={formData.healthAffectStress}
          onChange={handleChange}
          className="w-1/3 focus:outline-none p-2 rounded border border-gray-300"
        >
          <option value="none">None</option>
          <option value="some">Some</option>
          <option value="verylittle">Very Little</option>
        </select>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* satisfactionLevel */}
      <div className="flex flex-col gap-3 w-full">
        <label>
          In general, how satisfied are you with your life? (including personal
          and professional aspects)
        </label>
        <select
          name="satisfactionLevel"
          value={formData.satisfactionLevel}
          onChange={handleChange}
          className="w-1/3 focus:outline-none p-2 rounded border border-gray-300"
        >
          <option value="mostlysatisfied">Mostly Satisfied</option>
          <option value="notsatisfied">Not Satisfied</option>
          <option value="partlysatisfied">Partly Satisfied</option>
        </select>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* isExposedToToxicHazardousSubstance" */}
      <div className="flex flex-col gap-3 w-full">
        <label>
          Have you been exposed to any toxic or hazardous substances ? Please
          describe.
        </label>
        <input
          type="text"
          name="isExposedToToxicHazardousSubstance"
          value={formData.isExposedToToxicHazardousSubstance}
          onChange={handleChange}
          placeholder="Enter toxic or hazardous substances"
          className="w-11/12 h-20 border border-gray-300 p-3 mt-3 rounded focus:outline-none"
        />
      </div>

      <hr className="my-6 border-gray-300" />

      {/* isDietaryRestrictions */}
      <div>
        <label>
          Do you have any dietary restrictions ? Please describe.(ex: low salt,
          vegetarian, no sugar, etc.)
        </label>
        <input
          type="text"
          name="isDietaryRestrictions"
          value={formData.isDietaryRestrictions}
          onChange={handleChange}
          placeholder="Enter dietary restrictions"
          className="w-11/12 h-20 border border-gray-300 p-3 mt-3 rounded focus:outline-none"
        />
      </div>

      <hr className="my-6 border-gray-300" />

      {/* isReligiousSpiritualPhilosophicalPersonalConvicts */}
      <div>
        <label>
          Do you have any religious, spiritual, philosphical or personal
          convictins that may affect how you should betreated medically ? Please
          describe.
        </label>
        <input
          type="text"
          name="isReligiousSpiritualPhilosophicalPersonalConvicts"
          value={formData.isReligiousSpiritualPhilosophicalPersonalConvicts}
          onChange={handleChange}
          placeholder="Enter religious, spiritual, philosphical or personal convictins"
          className="w-11/12 h-20 border border-gray-300 p-3 mt-3 rounded focus:outline-none"
        />
      </div>

      <hr className="my-6 border-gray-300" />

      {/* isVerbalEmotionalPhysicalSexualRelation */}
      <div>
        <p>
          Are you now or have you previously been in an abusive relationship
          (verbally, emotionally, physically, or sexually)?
        </p>
        <div className="flex gap-6">
          <div className="flex items-center gap-1 pt-2">
            <input
              type="radio"
              name="isVerbalEmotionalPhysicalSexualRelation"
              value="yes"
              checked={abusiveRelationship}
              onChange={() => handleAbusiveRelationshipChange(true)}
            />
            <label>Yes</label>
          </div>

          <div className="flex items-center gap-1 pt-2">
            <input
              type="radio"
              name="isVerbalEmotionalPhysicalSexualRelation"
              value="no"
              checked={!abusiveRelationship}
              onChange={() => handleAbusiveRelationshipChange(false)}
            />
            <label>No</label>
          </div>
        </div>

        {/* verbalEmotionalPhysicalSexualRelationRemark */}
        {abusiveRelationship && (
          <div className="mt-3">
            <label>Please provide details (if any):</label>
            <textarea
              name="verbalEmotionalPhysicalSexualRelationRemark"
              value={formData.verbalEmotionalPhysicalSexualRelationRemark}
              onChange={handleChange}
              placeholder="Describe your experience here..."
              className="w-full h-20 border border-gray-300 p-3 mt-2 rounded focus:outline-none"
            />
          </div>
        )}
      </div>

      <hr className="my-6 border-gray-300" />

      {/* isChangeInSexualDesire */}
      <div>
        <p>
          Has there been any recent change in your sexual desire or the
          frequency of sexual activity?
        </p>
        <div className="flex gap-6">
          <div className="flex items-center gap-1 pt-2">
            <input
              type="radio"
              name="isChangeInSexualDesire"
              value="yes"
              checked={recentChanges}
              onChange={() => handleRecentChanges(true)}
            />
            <label>Yes</label>
          </div>

          <div className="flex items-center gap-1 pt-2">
            <input
              type="radio"
              name="isChangeInSexualDesire"
              value="no"
              checked={!recentChanges}
              onChange={() => handleRecentChanges(false)}
            />
            <label>No</label>
          </div>
        </div>

        {/* changeInSexualDesireRemark */}
        {recentChanges && (
          <div className="mt-3">
            <label>Please provide details (if any):</label>
            <textarea
              name="changeInSexualDesireRemark"
              value={formData.changeInSexualDesireRemark}
              onChange={handleChange}
              placeholder="Describe the changes here..."
              className="w-full h-20 border border-gray-300 p-3 mt-2 rounded focus:outline-none"
            />
          </div>
        )}
      </div>

      <hr className="my-6 border-gray-300" />

      {/* isSexuallyTransmittedInfection */}
      <div>
        <p>
          Have you ever had a sexually transmitted infection (STI)? (for
          example: herpes, chlamydia, etc)
        </p>
        <div className="flex gap-6">
          <div className="flex items-center gap-1 pt-2">
            <input
              type="radio"
              name="isSexuallyTransmittedInfection"
              value="yes"
              checked={hasSTI}
              onChange={() => handleSTIChange(true)}
            />
            <label>Yes</label>
          </div>

          <div className="flex items-center gap-1 pt-2">
            <input
              type="radio"
              name="isSexuallyTransmittedInfection"
              value="no"
              checked={!hasSTI}
              onChange={() => handleSTIChange(false)}
            />
            <label>No</label>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* hivandstisProtectionDescription */}
      <div>
        <label>
          How do you protect yourself from HIV and other STIs ? Please describe.
        </label>
        <input
          type="text"
          name="hivandstisProtectionDescription"
          value={formData.hivandstisProtectionDescription}
          onChange={handleChange}
          placeholder="Describe how you protect yourself from HIV and STIs."
          className="w-11/12 h-20 border border-gray-300 p-3 mt-3 rounded focus:outline-none"
        />
      </div>

      <hr className="my-6 border-gray-300" />

      {/* isPainDuringAfterSex */}
      <div>
        <p>Do you ever have pain during or after sex?</p>
        <div className="flex gap-6">
          <div className="flex items-center gap-1 pt-2">
            <input
              type="radio"
              id="painYes"
              name="isPainDuringAfterSex"
              value="true"
              checked={formData.isPainDuringAfterSex === true}
              onChange={handleChange}
            />
            <label htmlFor="painYes">Yes</label>
          </div>

          <div className="flex items-center gap-1 pt-2">
            <input
              type="radio"
              id="painNo"
              name="isPainDuringAfterSex"
              value="false"
              checked={formData.isPainDuringAfterSex === false}
              onChange={handleChange}
            />
            <label htmlFor="painNo">No</label>
          </div>
        </div>
      </div>

      <UpdateDetailsBtn onClick={sendSocialHistoryData} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default SocialHistory;