import { FadeRight } from "src/components/animate";
import { NewsDetailpage } from "src/components/home";
const Post = () => {
  return (
    <>
      <section className="">
        <FadeRight durationTime={"1s"}>
          <NewsDetailpage />
        </FadeRight>
      </section>
    </>
  );
};

export default Post;
