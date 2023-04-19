import { useRouter } from "next/router";
import { FadeRight } from "src/components/animate";
import { ErrorScreen } from "src/components/basics";
import { BlogDetailCard } from "src/components/cards";
import { useGetAllBlog, useGetOneBlogById } from "src/services/blogServices";

const Blog = () => {
  const { query } = useRouter();
  const id = query?.slug?.split("-")?.pop();

  const { data, isLoading, isError } = useGetOneBlogById(id);
  const { data: allBlog, isLoading: allBlogLoading } = useGetAllBlog();

  if (isError) return <ErrorScreen />;
  return (
    <>
      {/* <NextSeo
        title={'Herco Transformers || Blogs: ' + oneBlog?.blog_title}
        openGraph={{
          title: oneBlog?.title,
          url: `https://www.hercotransformers.com/blogs/${oneBlog?._id}`,
          images: [
            {
              url: oneBlog?.blog_image,
              width: 800,
              height: 600,
              alt: oneBlog?.blog_title,
            },
          ],
        }}
      /> */}
      <>
        <FadeRight durationTime={"1s"}>
          <BlogDetailCard
            data={data}
            allBlog={allBlog}
            isLoading={isLoading}
            allBlogLoading={allBlogLoading}
          />
        </FadeRight>
      </>
    </>
  );
};

export default Blog;

// export async function getServerSideProps(context) {
//   const id = context.query?.slug?.split('-')?.pop()
//   const response = await api.get(`/blog/one/${id}`)
//   const oneBlog = response.data.blog
//   return {
//     props: { oneBlog },
//   }
// }
