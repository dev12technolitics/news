import { FadeRight } from "src/components/animate";
import { PostDetail } from "src/components/home";

const post = () => {
  //   const { query } = useRouter()
  //   const id = query?.slug?.split('-')?.pop()

  //   const { data, isLoading, isError } = useGetOneBlogById(id)
  //   const { data: allBlog, isLoading: allBlogLoading } = useGetAllBlog()
  //   if (isError) return <ErrorScreen />

  return (
    <>
      <FadeRight durationTime={"1s"}>
        <PostDetail
        // data={data}
        // allBlog={allBlog}
        // isLoading={isLoading}
        // allBlogLoading={allBlogLoading}
        />
      </FadeRight>
    </>
  );
};

export default post;
