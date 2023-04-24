import { useRouter } from "next/router";
import { FadeRight } from "src/components/animate";
import { ErrorScreen, LoadingScreen } from "src/components/basics";
import { NewsDetail } from "src/components/news";
import { useGetOneNewsById } from "src/services/news";

const NewsDetailPage = () => {
  const { query } = useRouter();
  const id = query?.id;
  const { data, isLoading, isError } = useGetOneNewsById(id);
  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;

  console.log("datadata", data);

  return (
    <>
      <FadeRight durationTime={"1s"}>
        <NewsDetail oneNewsData={data} />
      </FadeRight>
    </>
  );
};

export default NewsDetailPage;
