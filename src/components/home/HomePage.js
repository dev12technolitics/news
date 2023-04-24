import dynamic from "next/dynamic";
import { useGetAllCategories } from "src/services/categoryServices";
import { useGetAllNews } from "src/services/news";
import { FadeIn } from "../animate";
import { ErrorScreen, LoadingScreen } from "../basics";

const DynamicHomeNews = dynamic(() => import("./HomeNews"));
const DynamicMobileHomeNews = dynamic(() => import("./MobileHomeNews"));

export default function HomePage() {
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

  if (categoriesLoading || newsLoading) return <LoadingScreen />;

  if (categoriesError || newsError) return <ErrorScreen />;

  return (
    <div>
      <div className="md:block hidden">
        <FadeIn durationTime="1s">
          <DynamicHomeNews newsAllData={newsAllData} />
        </FadeIn>
      </div>
      <div className="md:hidden">
        <FadeIn durationTime="1s">
          <DynamicMobileHomeNews
            categoriesAllData={categoriesAllData}
            newsAllData={newsAllData}
          />
        </FadeIn>
      </div>
    </div>
  );
}
