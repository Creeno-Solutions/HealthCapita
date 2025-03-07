import PhrUpdateHeader from "../../../../../CommonComponents/PhrUpdateHeader/PhrUpdateHeader";
import { PhrAssets } from "../../../../../assets/PHR/assets";
const PhrProfileUpdate = () => {
  const formFields = [
    {
      id: "firstname",
      label: "First Name",
      type: "text",
      placeholder: "Enter first name",
    },
    {
      id: "middlename",
      label: "Middle Name",
      type: "text",
      placeholder: "Enter middle name",
    },
    {
      id: "lastname",
      label: "Last Name",
      type: "text",
      placeholder: "Enter last name",
    },
    {
      id: "dob",
      label: "Date Of Birth",
      type: "date",
      placeholder: "Choose a date",
    },
    {
      id: "gender",
      label: "Gender",
      type: "select",
      options: ["Male", "Female", "Other"],
      placeholder: "Select gender",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter Your Email",
    },
    {
      id: "mobile",
      label: "Mobile Number",
      type: "phone",
      placeholder: "Enter Mobile Number",
    },

    {
      id: "phone",
      label: "Landline No.",
      type: "tel",
      placeholder: "Enter Landline number",
    },
    {
      id: "height",
      label: "Height (ft.-inch)",
      type: "select",
      options: ["4'0''", "4'6''", "5'0''", "5'6''", "6'0''", "6'5''"],
      placeholder: "Select height",
    },
    {
      id: "weight",
      label: "Weight (kgs)",
      type: "number",
      placeholder: "Enter weight",
    },
    {
      id: "bloodgroup",
      label: "Blood Group",
      type: "select",
      options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      placeholder: "Select blood group",
    },
    {
      id: "maritalstatus",
      label: "Marital Status",
      type: "select",
      options: ["Married", "Unmarried"],
      placeholder: "Select Status",
    },
    {
      id: "spousename",
      label: "Spouse Name",
      type: "text",
      placeholder: "Enter spouse name",
    },
    {
      id: "noofchildren",
      label: "No. of Children",
      type: "number",
      placeholder: "Enter no. of children",
    },
    {
      id: "address",
      label: "Address",
      type: "textarea",
      placeholder: "Enter your address",
    },
    {
      id: "pobox",
      label: "P.O. Box",
      type: "number",
      placeholder: "Enter P.O. box",
    },
    {
      id: "country",
      label: "Country",
      type: "select",
      options: ["India", "USA", "UK"],
      placeholder: "Select Country",
    },
    {
      id: "governate",
      label: "Governate",
      type: "select",
      options: ["Northern", "Southern", "Other"],
      placeholder: "Select Governate",
    },
    {
      id: "area",
      label: "Area",
      type: "select",
      options: ["A Ali", "JNTU", "Other"],
      placeholder: "Select Area",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        <PhrUpdateHeader Title={"Personal Details"} />
        <div className="w-[100%] flex">
          <form className="py-4 px-4 sm:px-6 md:px-4 lg:px-12 w-[70%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <div className="col-span-3 flex gap-4">
                {["firstname", "middlename", "lastname"].map((id) => {
                  const field = formFields.find((f) => f.id === id);
                  return (
                    <div key={field.id} className="flex flex-col w-full">
                      <label htmlFor={field.id}>{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        id={field.id}
                        name={field.id}
                        className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Date of Birth & Gender (1 Row) */}
              <div className="col-span-3 flex gap-4 items-center">
                {["dob", "gender", "email"].map((id) => {
                  const field = formFields.find((f) => f.id === id);
                  return (
                    <div key={field.id} className="flex flex-col w-full">
                      <label htmlFor={field.id}>{field.label}</label>
                      {field.type === "select" ? (
                        <select
                          id={field.id}
                          name={field.id}
                          className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none"
                        >
                          <option value="">{field.placeholder}</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          id={field.id}
                          name={field.id}
                          className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="col-span-3 flex gap-4">
  {["mobile", "phone"].map((id) => {
    const field = formFields.find((f) => f.id === id);
    return (
      <div key={field.id} className="flex flex-col w-full">
        <label htmlFor={field.id}>{field.label}</label>
        <div className="flex items-center gap-2">
          <select className="border border-gray-300 py-2 px-2 rounded-md focus:outline-none w-30">
            <option value="+1">+1</option>
            <option value="+91">+91</option>
            <option value="+44">+44</option>
            <option value="+61">+61</option>
          </select>
          <input
            type={field.type}
            placeholder={field.placeholder}
            id={field.id}
            name={field.id}
            className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none placeholder:text-sm placeholder:text-gray-400"
          />
        </div>
      </div>
    );
  })}
</div>


              {/* Height & Weight (Separate Row) */}
              <div className="col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["height", "weight"].map((id) => {
                    const field = formFields.find((f) => f.id === id);
                    return (
                      <div key={field.id} className="flex flex-col">
                        <label htmlFor={field.id}>{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          id={field.id}
                          name={field.id}
                          className="border border-gray-300 py-2 px-3 rounded-md w-4/4 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Blood Group Type & Rhesus Factor (Separate Row) */}
              <div className="col-span-3">
                <div className="flex gap-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="bloodgroup">Blood Group Type</label>
                    <select
                      id="bloodgroup"
                      name="bloodgroup"
                      className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none"
                    >
                      <option value="">Select</option>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                        (bg) => (
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="rhesus">Rhesus Factor</label>
                    <select
                      id="rhesus"
                      name="rhesus"
                      className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none"
                    >
                      <option value="">Select</option>
                      {["Positive", "Negative"].map((rf) => (
                        <option key={rf} value={rf}>
                          {rf}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Marital Status, Spouse Name, No. of Children (1 Row) */}
              <div className="col-span-3 flex gap-4">
                {["maritalstatus", "spousename", "noofchildren"].map((id) => {
                  const field = formFields.find((f) => f.id === id);
                  return (
                    <div key={field.id} className="flex flex-col w-full">
                      <label htmlFor={field.id}>{field.label}</label>
                      {field.type === "select" ? (
                        <select
                          id={field.id}
                          name={field.id}
                          className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        >
                          <option value="">{field.placeholder}</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          id={field.id}
                          name={field.id}
                          className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* P.O. Box, Country, Governate (1 Row) */}
              <div className="col-span-3 flex gap-4">
                {["country", "governate", "pobox"].map((id) => {
                  const field = formFields.find((f) => f.id === id);
                  return (
                    <div key={field.id} className="flex flex-col w-full">
                      <label htmlFor={field.id}>{field.label}</label>
                      {field.type === "select" ? (
                        <select
                          id={field.id}
                          name={field.id}
                          className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none"
                        >
                          <option value="">{field.placeholder}</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          id={field.id}
                          name={field.id}
                          className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Area (1 Row) */}
              <div className="col-span-4 flex gap-4">
                <div className="flex flex-col w-1/4">
                  <label htmlFor="area">Area</label>
                  <select
                    id="area"
                    name="area"
                    className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none"
                  >
                    <option value="">Select area</option>
                    {formFields
                      .find((f) => f.id === "area")
                      .options.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Address (Full Width) */}
              <div className="col-span-3">
                <div className="flex flex-col">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    placeholder="Enter your Address here.."
                    rows="2  "
                    className="border border-gray-300 py-2 px-3 rounded-md w-full focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
          </form>

          <div className="w-[25%] mt-20 mr-14">
            <div className="bg-[#EBF8FF] py-4 px-4 rounded-xl w-4/4">
              <h2 className="text-lg font-semibold text-[#004EBA] mb-2 py-2">
                Upload Image
              </h2>
              <div className="p-2 rounded-lg shadow-sm border border-gray-400 border-dashed py-2">
                <label className="flex items-center justify-center space-x-2 mb-2 cursor-pointer">
                  <img
                    src={PhrAssets.UploadIcon}
                    alt="Upload Icon"
                    className="w-6 h-6"
                  />
                  <span className="text-gray-600 font-medium py-2">
                    Upload Image
                  </span>
                  <input type="file" className="hidden" />
                </label>
                <div className="flex items-center justify-center space-x-2 pt-1">
                  <img
                    src={PhrAssets.InfoCircle}
                    alt="Info Icon"
                    className="w-3 h-3"
                  />
                  <span className="text-[#004EBA] text-sm py-2">
                    You can upload 1 file, not exceeding 10MB
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <p className="mx-14 border-b-2 border-gray-100 my-5"></p>
        <button className="bg-[#1C9401] text-white font-medium tracking-wide text-lg py-3 px-8 rounded-full absolute -bottom-20 right-8 mb-0 mr-4">
          Update Details
        </button>
      </div>
    </>
  );
};

export default PhrProfileUpdate;

//  <div className="w-full">
// <div className="bg-blue-100 py-2 px-4 rounded-xl shadow-md">
//   <h2 className="text-lg font-semibold text-gray-700 mb-2">Upload Image</h2>
//   <div className="p-2 rounded-lg shadow-sm border border-gray-400 border-dashed py-2 px-4">
//     <label className="flex items-center space-x-2 mb-2 cursor-pointer">
//       <img src={PhrAssets.UploadIcon} alt="Upload Icon" className="w-6 h-6" />
//       <span className="text-gray-600 font-medium">Upload Image</span>
//       <input type="file" className="hidden" />
//     </label>
//     <div className="flex items-center space-x-2 pt-1">
//       <img src={PhrAssets.InfoCircle} alt="Info Icon" className="w-6 h-6" />
//       <span className="text-gray-500">Max file size: 10MB</span>
//     </div>
//   </div>
// </div>
// </div>
