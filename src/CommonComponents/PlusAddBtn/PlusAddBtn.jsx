import { PhrAssets } from "../../assets/PHR/assets";

const PlusAddBtn = ({ onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="text-[#007183] font-semibold text-base flex items-center gap-1 justify-center"
      >
        <img src={PhrAssets.PlusAdd} alt="" /> Add
      </button>
    </>
  );
};

export default PlusAddBtn;