import { FadeRight } from "src/components/animate";
import { NewsDetail } from "src/components/news";

const NewsDetailPage = () => {
  return (
    <>
      <FadeRight durationTime={"1s"}>
        <NewsDetail />
      </FadeRight>
    </>
  );
};

export default NewsDetailPage;
