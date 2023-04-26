import { Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import Logo from "src/assets/svg/download-removebg-preview.png";
import { useGetAllCategories } from "src/services/categoryServices";
import { ErrorScreen } from "../basics";

const DesktopFooter = ({ setpageLoading }) => {
  const { push } = useRouter();
  const {
    data: categoriesAllData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetAllCategories();

  useEffect(() => {
    if (!categoriesLoading) {
      setpageLoading(false);
    }
  }, [categoriesLoading]);

  if (categoriesError) return <ErrorScreen />;

  return (
    <footer className="flex justify-center m-0 items-center w-full pt-4 bg-[#000]">
      <div className="container mx-auto">
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <div className="flex justify-between items-center ">
              <Link href={"/"}>
                <div className="flex justify-start">
                  <Image
                    alt="footer-img"
                    src={Logo}
                    height={150}
                    width={200}
                    // className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              <div className="flex justify-end">
                <div className="text-white text-lg font-semibold mr-6">
                  Find us here
                </div>
                <Link href="" legacyBehavior>
                  <a target={"blank"}>
                    <RiInstagramFill className="mr-3 text-white text-2xl cursor-pointer" />
                  </a>
                </Link>
                <Link href="" legacyBehavior>
                  <a target={"blank"}>
                    <BsFacebook className="mr-3 text-white text-2xl cursor-pointer" />
                  </a>
                </Link>
                <Link href="" legacyBehavior>
                  <a target={"blank"}>
                    <AiFillTwitterCircle className=" mr-3 text-white text-2xl cursor-pointer" />
                  </a>
                </Link>
                <Link href="" legacyBehavior>
                  <a target={"blank"}>
                    <IoLogoYoutube className=" text-2xl text-white cursor-pointer" />
                  </a>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>

        <div className="border-b-2 border-[#494E51]" />

        <div className="footer-bottom pt-2">
          <ul
            className=""
            style={{
              fontSize: "1.4rem",
              lineHeight: "2.4rem",
              padding: "0",
              listStyle: "none",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {categoriesAllData?.map((item, index) => {
              return (
                <>
                  <li
                    className="text-[#cecece] text-lg cursor-pointer"
                    key={index}
                    onClick={() => push(`/news/${item?.slug}`)}
                  >
                    {item?.name}
                  </li>
                  <li>
                    <hr className="border-b-2 border-b-[#cecece] rotate-90 w-[16px]" />
                  </li>
                </>
              );
            })}
            <li className="text-[#cecece] text-lg">
              <a href="#">Become A Reporter</a>
            </li>
            <li>
              <hr className="border-b-2 border-b-[#cecece] rotate-90 w-[16px]" />
            </li>
            <li className="text-[#cecece] text-lg">
              <Link href="/contact-us">Contact Us</Link>
            </li>
            <li>
              <hr className="border-b-2 border-b-[#cecece] rotate-90 w-[16px]" />
            </li>
            <li className="text-[#cecece] text-lg">
              <Link href="/privacy-policy">Terms And Conditions</Link>
            </li>
            <li>
              <hr className="border-b-2 border-b-[#cecece] rotate-90 w-[16px]" />
            </li>
            <li className="text-[#cecece] text-lg">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>

          <div className="text-[#cecece] text-lg mt-0 mb-[20px]">
            Copyright &copy; 2022 News and Magazine WordPress Theme by{" "}
            <a target="_blank" href="#">
              Axilthemes
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DesktopFooter;
