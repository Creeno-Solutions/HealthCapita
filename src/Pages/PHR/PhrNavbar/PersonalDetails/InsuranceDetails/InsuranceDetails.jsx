import { useNavigate } from "react-router-dom";
import { PhrAssets } from "../../../../../assets/PHR/assets";
import { useState, useEffect } from "react";
import axios from "axios";
import UserInfo from "../../../../../utils/UserInfo";
import PlusAddBtn from "../../../../../CommonComponents/PlusAddBtn/PlusAddBtn";

const InsuranceDetails = ({ showUpdateButton = true }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const userId = 10;

  const openInsuranceUpdatePage = (insuranceDetailsId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/InsuranceDetailsUpdate", { state: { insuranceDetailsId } });
  };
  const openPhrInsuranceAddpage = () => {
    navigate("/InsuranceDetailsUpdate");
  };
  console.log("dataaa", data);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetInsuranceDetail?UserId=${userId}`
        );
        console.log("response get insurance", response);

        if (response?.data?.isData) {
          const responseData = response?.data?.data;
          setData(Array.isArray(responseData) ? responseData : [responseData]);
        }
      } catch (error) {
        console.error("Error fetching insurance details:", error);
      }
    };
    getData();
  }, []);
  const handleDelete = async (insuranceDetailsId) => {
    try {
      const response = await axios.post(
        `https://service.healthcapita.com/api/PHR/DeleteInsuranceDetailsinsuranceDetailsIduserId?insuranceDetailsId=${insuranceDetailsId}&userId=${userId}`
      );
      console.log("response insurance delete", response);
      if (response?.data?.success) {
        const deletedData = await axios.get(
          `https://service.healthcapita.com/api/PHR/GetPhrBloodPressure?userId=${userId}`
        );
        setData(deletedData?.data?.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-5 px-5 my-7 bg-[#F9FAFB] rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            className="p-2 rounded-full bg-[#EBF8FF]"
            src={PhrAssets.Insurance}
            alt="Insurance"
          />
          <p className="font-medium leading-5 text-lg text-[#111928]">
            Insurance Details
          </p>
        </div>
        {showUpdateButton && <PlusAddBtn onClick={openPhrInsuranceAddpage} />}
      </div>
      <p className="border border-gray-300 px-2 my-3"></p>

      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[#D1D5DB]">
              <th className="px-6 py-3 text-left text-base font-medium"></th>
              <th className="px-6 py-3 text-left text-base font-medium">
                Insurance Company
              </th>
              <th className="px-6 py-3 text-left text-base font-medium">TPA</th>
              <th className="px-6 py-3 text-left text-base font-medium">
                Policy No.
              </th>
              <th className="px-6 py-3 text-left text-base font-medium">
                Premium Amount
              </th>
              <th className="px-6 py-3 text-left text-base font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.insuranceDetailsId} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-900 border-b">
                    <img
                      src={PhrAssets.ThreeDotted}
                      alt="Options"
                      className="w-6 h-6 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-b">
                    {item.insuranceCompany}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-b">
                    {item.tpa}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-b">
                    {item.insurancePolicyNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-b">
                    {item.premiumAmount}
                  </td>
                  <td className="px-4 py-4 text-base text-gray-900 border-b">
                    <div className="flex gap-4 items-center">
                      <button
                        onClick={() =>
                          openInsuranceUpdatePage(item.insuranceDetailsId)
                        }
                      >
                        <img src={PhrAssets.Edit} alt="Edit" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.insuranceDetailsId)}
                        className="flex gap-1 items-center text-[#1C9401] font-semibold"
                      >
                        <img src={PhrAssets.Delete} alt="Delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-gray-500 border-b"
                >
                  No insurance details available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsuranceDetails;
