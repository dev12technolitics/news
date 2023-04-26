import { Footer } from "../footer/Footer";
import Navbar from "../navbar/Navbar";

function NavbarFooterLayout({ children, setpageLoading }) {
  return (
    <section className="">
      <div className="w-screen">
        <Navbar setpageLoading={setpageLoading} />
      </div>
      <div className="min-h-screen w-screen md:mx-auto custom-max-screen:max-w-7xl">
        {children}
      </div>
      <Footer setpageLoading={setpageLoading} />
    </section>
  );
}

export default NavbarFooterLayout;
