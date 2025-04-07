const UpdateDetailsBtn = ({ onClick }) => {
  return (
    <>
      <div className="relative">
        {/* <p className="mx-14 border-b-2 border-gray-100 my-5"></p> */}
        <button
          onClick={onClick}
          className="bg-[#007183] text-white font-medium tracking-wide text-lg py-3 px-6 rounded-full absolute -bottom-10 -right-5 mr-4"
        >
          Update Details
        </button>
      </div>
    </>
  );
};         

export default UpdateDetailsBtn;
