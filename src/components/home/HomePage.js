import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useGetAllCategories } from "src/services/categoryServices";
import { useGetAllNews } from "src/services/news";
import { FadeIn } from "../animate";
import { ErrorScreen } from "../basics";

const DynamicHomeNews = dynamic(() => import("./HomeNews"));
const DynamicMobileHomeNews = dynamic(() => import("./MobileHomeNews"));

export default function HomePage({ setpageLoading }) {
  const {
    data: categoriesAllData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetAllCategories();

  const {
    data: newsAllData,
    isLoading: newsLoading,
    isError: newsError,
  } = useGetAllNews();

  useEffect(() => {
    if (!categoriesLoading && !newsLoading) {
      setpageLoading(false);
    }
  }, [categoriesLoading, newsLoading]);

  if (categoriesError || newsError) return <ErrorScreen />;

  return (
    <div>
      <div className="md:block hidden">
        <FadeIn durationTime="1s">
          <DynamicHomeNews
            newsAllData={newsAllData}
            newsLoading={newsLoading}
          />
        </FadeIn>
      </div>
      <div className="md:hidden">
        <FadeIn durationTime="1s">
          <DynamicMobileHomeNews
            categories={categoriesAllData}
            categoriesLoading={categoriesLoading}
            newsAllData={newsAllData}
            newsLoading={newsLoading}
            setpageLoading={setpageLoading}
          />
        </FadeIn>
      </div>
    </div>
  );
}
