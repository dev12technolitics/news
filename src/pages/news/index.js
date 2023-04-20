import { FadeRight } from "src/components/animate";
import { NewsPage } from "src/components/news";
const News = () => {
  return (
    <>
      <section className="">
        <FadeRight durationTime={"1s"}>
          <NewsPage />
        </FadeRight>
      </section>
    </>
  );
};

export default News;
