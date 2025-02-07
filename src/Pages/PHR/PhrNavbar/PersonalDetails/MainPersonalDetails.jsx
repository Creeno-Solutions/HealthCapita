import react from "react"
import PhrProfile from "../../PhrProfile"
import EmployerInfo from "./EmployerInfo"
import EmergencyContactInfo from "./EmergencyContactInfo"
// import MedicalContacts from "./MedicalContacts"
import FamilyDetails from "./FamilyDetails"
import InsuranceDetails from "./InsuranceDetails"
import MedicalContacts from "./MedicalContacts"

const MainPersonalDetails = () => {
  return (
    <>
      <div className="px-10">
      <h2 className="text-2xl font-semibold py-3">Personal Details</h2>
        <PhrProfile />
        <InsuranceDetails/>
        <EmployerInfo />
        <FamilyDetails/>
      <EmergencyContactInfo />
        <MedicalContacts/>
        </div>
    </>
  )
}

export default MainPersonalDetails