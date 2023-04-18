import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NAVBAR_LINKS } from "src/data/app-data-links";
import { logout } from "src/redux/slices/userSlice";
import { useGetAllCategories } from "src/services/categoryServices";
import { CartSideMenuBar } from "../cart";
import DesktopTopNavbar from "./DesktopTopNavbar";
export default function DesktopNavbar({ userData }) {
  const { push, pathname } = useRouter();
  const dispatch = useDispatch();
  const { data } = useGetAllCategories();
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const changeNavbarShadow = () => {
    if (window.scrollY >= 80) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", changeNavbarShadow);
  }, []);

  const handleSearch = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter" || e.which === 13) {
      e.preventDefault();
      push(`/p?search=${search}`);
    }
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //logout function
  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.setItem("userVisit", false);
    push("/");
  };
  return (
    <>
      <DesktopTopNavbar />
      <div
        className="w-screen z-50 py-4 transition-all duration-300"
        style={{
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <div className="w-full">
          <nav className="container mx-auto">
            <div className="flex items-center h-16 justify-center space-x-2">
              <div className="w-full">
                <ul className="relative flex w-full gap-4">
                  <Link className="cursor-pointer" href="/">
                    <li
                      className="group uppercase lg:text-[16px] 
                                  font-[535]
                            hover:text-theme-primary-main px-3 py-2 rounded-md leading-7"
                    >
                      Home
                    </li>
                  </Link>
                  {NAVBAR_LINKS?.map((item, index) => {
                    return (
                      <div key={index}>
                        <Link className="cursor-pointer" href={item?.link}>
                          <li
                            className="group uppercase lg:text-[16px] 
                                  font-[535]
                            hover:text-theme-primary-main px-3 py-2 rounded-md leading-7"
                          >
                            {item?.name}
                          </li>
                        </Link>
                      </div>
                    );
                  })}
                </ul>
              </div>

              <div className="p-2 border-red">
                <CartSideMenuBar />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
