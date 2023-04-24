import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { AiFillPhone } from "react-icons/ai";
import { BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FaBlenderPhone, FaFacebook } from "react-icons/fa";
import { MdClose, MdEmail } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { AppButton } from "../basics";
import AppIconButton from "../basics/AppIconButton";

export default function SideMenuBar() {
  const { push } = useRouter();
  const [search, setSearch] = useState("");
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleSubmit = (e, anchor) => {
    if (e.code === "Enter" || e.code === "NumpadEnter" || e.which === 13) {
      e.preventDefault();
      router.push(`/p?search=${search}`);
      setState({ ...state, [anchor]: false });
    }
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 600,
        height: "600px",
      }}
      role="presentation"
      className="h-[87vh] overflow-scroll relative"
    >
      <Divider />

      <div className="flex justify-end mt-14 w-10/12 mx-auto">
        <span
          className="mt-6 cursor-pointer text-xl"
          onClick={toggleDrawer(anchor, false)}
        >
          <span className="transition-all duration-500 hover:rotate-90">
            <MdClose size={30} />
          </span>
        </span>
      </div>

      <div className="flex justify-center mt-6">
        <div className="w-10/12 h-fit mx-auto flex justify-center">
          <div
            className="relative border-dark-grey border-b-3 flex items-center 
          w-full h-14 sm:h-20 focus-within:border-[#ff5451] bg-white overflow-hidden"
          >
            <input
              className="peer h-full w-full outline-none font-semibold text-gray-400 pl-3 text-base sm:text-3xl"
              type="text"
              id="search"
              style={{
                background: "white",
              }}
              onKeyDown={(e) => handleSubmit(e, anchor)}
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="grid place-items-center h-full w-12 text-gray-500 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Stack className="bg-[#fff] w-10/12 h-fit flex justify-end">
          <div className="capitalize w-full">
            <h1 className="font-bold text-lg md:text-2xl capitalize mt-0">
              Contact Information
            </h1>
            <h5 className="font-robo text-xl font-normal mt-2 text-[#6b7074]">
              Theodore Lowe, Ap #867-859
              <br /> Sit Rd, Azusa New York
            </h5>
            <h1 className="font-bold text-md md:text-lg capitalize mt-0">
              We Are Available 24/ 7. Call Now.
            </h1>
            <div className="mb-2">
              <a className="tel flex items-center" href="tel:(888) 456-2790">
                <AiFillPhone className="mr-4 text-[#6b7074]" size={20} />
                <span className="font-medium text-[#6b7074]">
                  {" "}
                  (888) 456-2790
                </span>
              </a>
            </div>
            <div className="mb-2">
              <a className="tel flex items-center" href="tel:(121) 255-53333">
                <FaBlenderPhone className="mr-4 text-[#6b7074]" size={20} />
                <span className="font-medium text-[#6b7074]">
                  {" "}
                  (121) 255-53333
                </span>
              </a>
            </div>
            <div className="mb-2">
              <a
                className="tel flex items-center"
                href="mailto:example@domain.com"
              >
                <MdEmail className="mr-4 text-[#6b7074]" size={20} />{" "}
                <span className="font-medium text-[#6b7074]">
                  example@domain.com
                </span>
              </a>
            </div>

            <h1 className="font-bold text-md md:text-lg capitalize mt-10">
              Find us here
            </h1>
            <div>
              <a
                target={"_blank"}
                rel="noreferrer"
                // href={`https://www.facebook.com/sharer.php?u=${socialSharePath}`}
              >
                <button className="cursor-poinetr mr-3 inline-flex items-center space-x-2 rounded-full bg-[#121213] p-3 font-semibold text-white">
                  <FaFacebook size={18} />
                </button>
              </a>
              <a
                target={"_blank"}
                rel="noreferrer"
                // href={`https://api.whatsapp.com/send?text=${socialSharePath}`}
              >
                <button className="cursor-poinetr mr-3 inline-flex items-center space-x-2 rounded-full bg-[#121213] p-3 font-semibold text-white">
                  <BsWhatsapp size={18} />
                </button>
              </a>
              <a
                target={"_blank"}
                rel="noreferrer"
                // href={`https://twitter.com/intent/tweet?text=${socialSharePath}`}
              >
                <button className="cursor-poinetr mr-3 inline-flex items-center space-x-2 rounded-full bg-[#121213] p-3 font-semibold text-white">
                  <BsTwitter size={18} />
                </button>
              </a>
              <a
                target={"_blank"}
                className="cursor-poinetr"
                rel="noreferrer"
                // href={`https://www.instagram.com/?url=${socialSharePath}`}
              >
                <button className="cursor-poinetr inline-flex items-center space-x-2 rounded-full bg-[#121213] p-3 font-semibold text-white">
                  <BsInstagram size={18} />
                </button>
              </a>
            </div>
            <Stack spacing={3} className="flex mt-8">
              <AppButton
                size="large"
                variant="contained"
                title="Contact Us"
                onClick={() => push("/contact-us")}
              />
              <AppButton
                size="large"
                variant="contained"
                title="Become A Reporter"
                onClick={() => push("/news")}
              />
            </Stack>
          </div>
        </Stack>
      </div>
    </Box>
  );

  return (
    <Box className="cursor-pointer">
      {["right"].map((anchor) => (
        <Fragment key={anchor}>
          <Box onClick={toggleDrawer(anchor, true)}>
            <AppIconButton
              Icon={
                <RxHamburgerMenu
                  className="text-theme-primary-main"
                  size={30}
                />
              }
              color="white"
            />
          </Box>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </Box>
  );
}
