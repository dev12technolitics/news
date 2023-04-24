import { useEffect, useState } from "react";
import CategoriesBaseCard from "./CategoriesBaseCard";

export default function NewsPage({ newsAllData, setpageLoading, categories }) {
  const [openTab, setOpenTab] = useState("All");
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    setCardData(newsAllData);
  }, [newsAllData]);

  const filterCardData = (itemId) => {
    setOpenTab(itemId);
    let newArray = newsAllData?.filter((item) => item?.categoryId == itemId);
    setCardData(newArray);
  };

  useEffect(() => {
    if (openTab == "All") {
      setCardData(newsAllData);
    }
  }, [newsAllData, openTab]);

  const filterAllData = () => {
    setOpenTab("All");
    setCardData(newsAllData);
  };

  return (
    <>
      <div className="flex justify-center w-full text-center">
        <div className="container mt-10">
          <div className="w-full flex flex-col mt-8">
            <div className="mx-4">
              <div
                className="flex flex-row 
             gap-y-2 overflow-scroll"
              >
                <div
                  onClick={() => filterAllData()}
                  className={`mr-1 flex justify-center items-center
                 ${
                   openTab == "All"
                     ? "tab_button_active py-2 px-4"
                     : "tab_button py-2 px-4"
                 }`}
                >
                  All
                </div>
                {categories?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => filterCardData(item?._id)}
                      className={`mr-1 flex justify-center items-center ${
                        openTab == item?._id
                          ? "tab_button_active  py-2 px-4"
                          : "tab_button py-2 px-4"
                      }`}
                    >
                      <span className="">{item?.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative flex w-full">
              <div className="flex-auto">
                <div className="justify-center">
                  <div className="flex flex-col justify-center w-full my-4">
                    <CategoriesBaseCard
                      cardData={cardData}
                      setpageLoading={setpageLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
