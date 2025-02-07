import axios from "axios";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

const AllergiesAndDrugs = () => {
 
  const [isLoading, setIsLoading] = useState(true); // Loading state

const defaultData = [
  {
    module: "LifeThreatening",
    allergyDetailId: 1,
    allergyName: "Avocado",
  },
  {
    module: "LifeThreatening",
    allergyDetailId: 2,
    allergyName: "Season Seeds",
  },
  {
    module: "LifeThreatening",
    allergyDetailId: 3,
    allergyName: "Tree nuts"
  },
  {
    module: "LifeThreatening",
    allergyDetailId: 4,
    allergyName: "Egg"
  },
  {
    module: "LifeThreatening",
    allergyDetailId: 5,
    allergyName: "Tomatoes"
  },
  {
    module: "LifeThreatening",
    allergyDetailId: 6,
    allergyName: "Chicken Fowl"
  },
  {
    module: "LifeThreatening",
    allergyDetailId: 7,
    allergyName: "Peanuts"
  },
  {
    module: "LifeThreatening",
    allergyDetailId: 8,
    allergyName: "Peanuts"
  },{
    module: "LifeThreatening",
    allergyDetailId: 9,
    allergyName: "Chestnut"
  },{
    module: "LifeThreatening",
    allergyDetailId: 10,
    allergyName: "Milk"
  },{
    module: "LifeThreatening",
    allergyDetailId: 11,
    allergyName: "Strawberry"
  },{
    module: "LifeThreatening",
    allergyDetailId: 12,
    allergyName: "kiwis"
  },{
    module: "LifeThreatening",
    allergyDetailId: 13,
    allergyName: "Soy"
  },{
    module: "LifeThreatening",
    allergyDetailId: 14,
    allergyName: "Bananas"
  },{
    module: "LifeThreatening",
    allergyDetailId: 15,
    allergyName: "Shellfish Life"
  },{
    module: "LifeThreatening",
    allergyDetailId: 16,
    allergyName: "wheat"
  },{
    module: "LifeThreatening",
    allergyDetailId: 17,
    allergyName: "Fish"
  },{
    module: "LifeThreatening",
    allergyDetailId: 18,
    allergyName: "Other"
  },
  {
    module: "otherLifeThreatening",
    allergyDetailId: 1,
    allergyName: "Idiopathic",
  },
{
      module: "otherLifeThreatening",
      allergyDetailId: 2,
      allergyName: "Insect Stings",
  },
{
    module: "otherLifeThreatening",
    allergyDetailId: 3,
    allergyName: "Latex",
  },
{
    module: "otherLifeThreatening",
    allergyDetailId: 4,
    allergyName: "Sulfite",
  },
{
    module: "otherLifeThreatening",
    allergyDetailId: 5,
    allergyName: "Medication",
  },
{
    module: "otherLifeThreatening",
    allergyDetailId: 6,
    allergyName: "Other",
  },
  {
    module: "FoodSensitivity",
    allergyDetailId: 1,
    allergyName: "Aspartame",
  },
  {
      module: "FoodSensitivity",
      allergyDetailId: 2,
      allergyName: "Chocolate",
  },
    {
      module: "FoodSensitivity",
      allergyDetailId: 3,
      allergyName: "MSG",
  },
     {
      module: "FoodSensitivity",
      allergyDetailId: 4,
      allergyName: "Sulfite",
  },
     {
      module: "FoodSensitivity",
      allergyDetailId: 5,
      allergyName: "Cheese",
  },
     {
      module: "FoodSensitivity",
      allergyDetailId: 6,
      allergyName: "Milk",
  },
     {
      module: "FoodSensitivity",
      allergyDetailId: 7,
      allergyName: "Shellfish",
  },
     {
      module: "FoodSensitivity",
      allergyDetailId: 8,
      allergyName: "Wine/Beer",
    },
  {
    module: "ContactAllergy",
    allergyDetailId: 1,
    allergyName: "Band Aids",
  },
  {
    module: "ContactAllergy",
    allergyDetailId: 2,
    allergyName: "Betadine",
  },
  {
    module: "ContactAllergy",
    allergyDetailId: 3,
    allergyName: "Topical Antibiotics",
  },
  {
    module: "ContactAllergy",
    allergyDetailId: 4,
    allergyName: "Fragrances",
  },
  {
    module: "ContactAllergy",
    allergyDetailId: 5,
    allergyName: "Large localisedines"
  },
  {
    module: "ContactAllergy",
    allergyDetailId: 6,
    allergyName: "Cosmetics",
  },
  {
    module: "ContactAllergy",
    allergyDetailId: 7,
    allergyName: "Nickel jewelery",
  },
  {
    module: "ContactAllergy",
    allergyDetailId: 8,
    allergyName: "Plant",
  },
  {
    module: "ContactAllergy",
    allergyDetailId: 9,
    allergyName: "Latex Rubber",
  },
  {
    module: "ContactAllergy",
    allergyDetailId: 10,
    allergyName: "Soap Detergen",
  },
  {
    module: "ContactAllergy",
    allergyDetailId: 11,
    allergyName: "Other",
  },

  {
    module: "DrugAllergy",
    allergyDetailId: 1,
    allergyName: "Ace Inhibitors",
  },
  {
    module: "DrugAllergy",
    allergyDetailId: 2,
    allergyName: "Cefaclor",
  },
  {
    module: "DrugAllergy",
    allergyDetailId: 3,
    allergyName: "Codeine",
  },    {
    module: "DrugAllergy",
    allergyDetailId: 4,
    allergyName: "Beta Blocker",
  },     {
    module: "DrugAllergy",
    allergyDetailId: 5,
    allergyName: "Insulin",
  },    {
    module: "DrugAllergy",
    allergyDetailId: 6,
    allergyName: "IV Contrast Iodine",
  },     {
    module: "DrugAllergy",
    allergyDetailId: 7,
    allergyName: "Ibuprofen",
  },     {
    module: "DrugAllergy",
    allergyDetailId: 8,
    allergyName: "Penicillin",
  },    {
    module: "DrugAllergy",
    allergyDetailId: 9,
    allergyName: "Sulfa Drugs",
  },    {
    module: "DrugAllergy",
    allergyDetailId: 10,
    allergyName: "Multiple Antibiotic",
  },     {
    module: "DrugAllergy",
    allergyDetailId: 11,
    allergyName: "Aspirin",
  },
  {
    module: "DrugAllergy",
    allergyDetailId: 12,
    allergyName: "Multiple Chemical",
  },
  {
    module: "DrugAllergy",
    allergyDetailId: 13,
    allergyName: "Other",
  },

];

const [data, setData] = useState(defaultData); 

  const GetAllergiesAndDrugsApi = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get(
        "https://service.healthcapita.com/api/PHR/AllergiesandDrugsSenestivity"
      );
      const fetchedData = response?.data;
      setData(fetchedData); // Merge defaultData and fetched data
    } catch (error) {
      console.log(error); // Handle errors
      setData(defaultData); // Fallback to defaultData in case of an error
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    GetAllergiesAndDrugsApi(); // Fetch data on mount
  }, []);

  const renderSection = (title, moduleKey) => (
    <div className="mb-8">
      <h2 className="font-semibold text-lg text-gray-800 mb-4">{title}</h2>
      <div className="flex flex-wrap gap-4">
        {data
          .filter((item) => item.module === moduleKey)
          .map((item) => (
            <div
              key={item.allergyDetailId}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                className="accent-blue-500"
                id={`allergy-${item.allergyDetailId}`}
              />
              <label htmlFor={`allergy-${item.allergyDetailId}`} className="text-gray-700">
                {item.allergyName}
              </label>
            </div>
          ))}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Oval
          visible={true}
          height="40"
          width="40"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {renderSection("Life Threatening", "LifeThreatening")}
      <hr className="my-6 border-gray-300" />
      {renderSection("Other Life Threatening", "otherLifeThreatening")}
      <hr className="my-6 border-gray-300" />
      {renderSection("Food Sensitivity", "FoodSensitivity")}
      <hr className="my-6 border-gray-300" />
      {renderSection("Contact Allergy", "ContactAllergy")}
      <hr className="my-6 border-gray-300" />
      {renderSection("Drug Allergy", "DrugAllergy")}
    </div>
  );
};

export default AllergiesAndDrugs;



