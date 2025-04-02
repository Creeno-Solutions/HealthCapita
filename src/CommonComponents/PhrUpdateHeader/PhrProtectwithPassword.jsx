import { useNavigate } from "react-router-dom";
import { PhrAssets } from "../../assets/PHR/assets";

const PhrProtectwithPassword = ({ Title, isProtected, isDisplayed, onProtectChange, onDisplayChange }) => {
  const navigate = useNavigate();
  const closePage = () => {
    navigate("/phr");
  };

  return (
    <div className="px-2 md:p-5 xl:px-10 lg:px-4 sm:px-4 w-full">
      <div className="pt-3 sm:pt-0 flex flex-col sm:flex-row sm:justify-between sm:mx-3 sm:items-center gap-3">
        <div className="flex flex-row sm:justify-between items-center gap-2">
          <img onClick={closePage} className="text-black sm:w-6 cursor-pointer" src={PhrAssets.ArrowLeft} alt="" />
          <p className="border h-5 sm:h-6 sm:border-l-0 border-l-0 border-gray-400"></p>
          <h2 className="md:text-xl text-base lg:text-2xl leading-5 font-semibold">{Title}</h2>
          <img className="lg:mt-1 h-5 w-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-6" src={PhrAssets.InfoCircle} alt="" />
        </div>
        <div className="flex flex-col md:flex-row md:gap-2 lg:gap-5">
        
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-1 lg:mr-2 border-none checked:bg-[#001940]"
              name="isPasswordProtected" 
              checked={isProtected}
              onChange={onProtectChange}
            />
            <label className="text-[#001940] font-medium">Protect with password</label>
          </div>
      
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-1 lg:mr-2 border-none checked:bg-[#001940]"
              name="isdisplayUnderSummaryPage" 
              checked={isDisplayed}
              onChange={onDisplayChange} 
            />
            <label className="text-[#001940] font-medium">Display under summary page</label>
          </div>
        </div>
      </div>
      <p className="mx-2 border-b-2 border-gray-100 mt-4"></p>
    </div>
  );
};

export default PhrProtectwithPassword;
