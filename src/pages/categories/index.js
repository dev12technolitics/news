import { DefaultSeo, LogoJsonLd } from "next-seo";
import { FadeRight } from "src/components/animate";
import { ErrorScreen } from "src/components/basics";
import GlobalSEO, { SITE_LOGO, SITE_URL } from "../../data/next-seo.data";
import api from "../../services/api";

const CategoriesPage = ({ categories }) => {
  if (!categories?.status) return <ErrorScreen />;

  return (
    <>
      <section className="mx-auto w-mobile-w sm:container my-20">
        <DefaultSeo {...GlobalSEO.global} {...GlobalSEO["/categories"]} />
        <LogoJsonLd logo={SITE_LOGO} url={SITE_URL} />
        <FadeRight durationTime={"1s"}></FadeRight>
      </section>
    </>
  );
};

export default CategoriesPage;

export async function getServerSideProps() {
  const res = await api.get("/category/all");

  const categories = res.data;

  return {
    props: {
      categories,
    },
  };
}
