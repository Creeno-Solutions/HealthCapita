import React from "react";

const Save = ({ onClick }) => {
  return (
    <>
      <div className="relative my-3">
        <button
          onClick={onClick}
          className="bg-[#007183] text-white font-medium text-lg py-2 px-8 rounded-full absolute right-3"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default Save;