// import React from 'react'
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = ({ setpageLoading }) => {
  return (
    <div className="w-full">
      <div className="md:block hidden">
        <DesktopNavbar setpageLoading={setpageLoading} />
      </div>
      <div className="md:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;
