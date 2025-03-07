import { useNavigate } from "react-router-dom";
import { PhrAssets } from "../../../../../assets/PHR/assets";
const FamilyDetailsUpdate = () => {

  const navigate = useNavigate()

  const closePage = () => {
    navigate('/phr')
  }
  const formFields = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      id: "dob",
      label: "Date Of Birth",
      type: "date",
      placeholder: "Choose a Date",
    },
    {
      id: "gender",
      label: "Gender",
      type: "select",
      options: ["Male", "Female", "Other"],
      placeholder: "Select",
    },
    {
      id: "relation",
      label: "Relation",
      type: "text",
      placeholder: "Enter Relation",
    },
    {
      id: "relationship",
      label: "His/Her Relationship",
      type: "text",
      placeholder: "Enter Relationship",
    },

    {
      id: "mobilenumber",
      label: "Mobile Number",
      type: "phone",
      countryCodes: ["+1", "+91", "+44", "+61", "+81"],
      placeholder: "Enter Mobile Number",
      defaultValue: "+91",
    },
    
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter Your Email",
    }
  ]

  const AddressformFields = 
    [
      {
        id: "country",
        label: "Country",
        type: "select",
        options: ["India", "USA", "UK"],
        placeholder: "Select",
      },
      {
        id: "area",
        label: "Area",
        type: "select",
        options: ["A Ali", "JNTU"],
        placeholder: "Select",
      },
      {
        id: "governate",
        label: "Governte",
        type: "select",
        options: ["Northern Governate", "Southern Governate"],
        placeholder: "Select",
      },
      {
        id: "pobox",
        label: "P.O. Box",
        type: "number",
        placeholder: "Enter P.O. Box",
      },
      {
        id: "address",
        label: "Address",
        type: "text",
        placeholder: "Enter your Address here..",
      },
  ]
  return (
    <>
    <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-4 px-4 sm:px-6 md:px-4 lg:px-12 bg-[#001940] shadow-md w-full">
          <div className="flex items-center space-x-3">
            <img src={PhrAssets.PhrIcon} alt="Logo" className="w-8 h-8" />
            <p className="border border-r-0 h-6 border-white"></p>
            <h2 className="md:text-3xl text-xl font-semibold text-white">
              Edit Personal Health Record
            </h2>
          </div>

          <button
            onClick={closePage}
            className="text-white text-xl font-semibold tracking-wide"
          >
            X <span className="hidden md:inline">Close</span>
          </button>
        </header>

        {/* Main Section */}
        <div className="px-2 md:p-5 xl:px-10 lg:px-4 sm:px-4 w-full">
          {/* Medical & Surgery */}
          <div className="pt-3 sm:pt-0 flex flex-col sm:flex-row sm:justify-between sm:mx-3 sm:items-center gap-3">
            <div className="flex flex-row sm:justify-between items-center gap-2">
              <img
                onClick={closePage}
                className="text-black sm:w-6 cursor-pointer"
                src={PhrAssets.ArrowLeft}
                alt=""
              />
              <p className="border h-5 sm:h-6 sm:border-l-0 border-l-0 border-gray-400"></p>
              <h2 className="md:text-xl text-base lg:text-2xl leading-5 font-semibold">
                Family Details
              </h2>
              <img
                className="lg:mt-1 h-5 w-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-6"
                src={PhrAssets.InfoCircle}
                alt=""
              />
            </div>
          </div>
          <p className="mx-2 border-b-2 border-gray-100 mt-4"></p>
        </div>

        <div className="py-4 px-4 sm:px-6 md:px-4 lg:px-12">
        <form className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ">
        {formFields.map((field) => (
          <div key={field.id} className="flex flex-col gap-2">
            <label htmlFor={field.id} className="font-normal">
              {field.label}
            </label>

            {/* Select Dropdown */}
            {field.type === "select" ? (
              <select
                id={field.id}
                name={field.id}
                className="border border-gray-300 py-1 px-3 rounded-md w-4/5 focus:outline-none"
              >
                <option value="">{field.placeholder}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "phone" ? (
              // Phone Number with Country Code
              <div className="flex gap-2 w-10/12">
                <select
                  id={`${field.id}-code`}
                  name={`${field.id}-code`}
                  defaultValue={field.defaultValue}
                    className="border border-gray-300 py-1 px-3 rounded-md w-15
                  focus:outline-none"
                >
                  {field.countryCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder={field.placeholder}
                  id={field.id}
                  name={field.id}
                  className="border border-gray-300 py-1 px-3 flex-1 rounded-md focus:outline-none w-4/5"
                />
              </div>
            ) : (
              // Other Input Fields
              <input
                type={field.type}
                placeholder={field.placeholder}
                id={field.id}
                name={field.id}
                className="border border-gray-300 py-1 px-3 rounded-md  focus:outline-none w-4/5"
                  />
            )}
          </div> 
        ))}
          </div>
            
            <p className="font-semibold py-3">Address</p>
            
            <div className="flex gap-3">
            <input
                type="checkbox"
                className="Custom-Checked"
                 checked/>
              <label htmlFor="">Same as Member Address</label>   
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {AddressformFields.map((field) => (
        <div key={field.id} className="flex flex-col gap-2">
          <label htmlFor={field.id} className="font-normal">
            {field.label}
          </label>

          {/* Select Dropdown */}
          {field.type === "select" ? (
            <select
              id={field.id}
              name={field.id}
              className="border border-gray-300 py-1 px-3 rounded-md w-4/5 focus:outline-none"
            >
              <option value="">{field.placeholder}</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            // Other Input Fields
            <input
              type={field.type}
              placeholder={field.placeholder}
              id={field.id}
              name={field.id}
              className="border border-gray-300 py-1 px-3 rounded-md focus:outline-none w-4/5"
            />
          )}
        </div>
      ))}
    </div>
       
    </form>
        </div>
        

        <div className="relative">
        <p className="mx-14 border-b-2 border-gray-100 my-5"></p>
        <button
          
          className="bg-[#1C9401] text-white font-medium tracking-wide text-lg py-3 px-8 rounded-full absolute -bottom-20 right-8 mb-0 mr-4"
        >
          Update Details
        </button>
        </div>
        </div>
    </>
  )
}

export default FamilyDetailsUpdate;
