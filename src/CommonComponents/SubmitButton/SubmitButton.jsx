import React from "react";

const SubmitButton = ({ onClick }) => {
  return (
    <>
      <div className="relative">
        {/* <p className="mx-14 border-b-2 border-gray-100 my-5"></p> */}
        <button
          onClick={onClick}
          className="bg-[#007183] text-white font-medium tracking-wide text-lg py-2 px-6 rounded-full absolute bottom-28 right-4 mr-4"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default SubmitButton;

// const SubmitButton = ({ onClick }) => {
//   return (
//     <>
//       <div className="relative">
//         {/* <p className="mx-14 border-b-2 border-gray-100 my-5"></p> */}
//         <button
//           onClick={onClick}
//           className="bg-[#007183] text-white font-medium tracking-wide text-lg py-3 px-6 rounded-full absolute -bottom-12 right-4 mr-4"
//         >
//           Submit
//         </button>
//       </div>
//     </>
//   );
// };

// export default SubmitButton;
