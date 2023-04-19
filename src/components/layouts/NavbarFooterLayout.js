import { Footer } from "../footer/Footer";
import Navbar from "../navbar/Navbar";

function NavbarFooterLayout({ children }) {
  return (
    <section className="">
      <div className="w-screen">
        <Navbar />
      </div>
      <div className="min-h-screen w-screen md:mx-auto custom-max-screen:max-w-7xl">
        {children}
      </div>
      <Footer />
    </section>
  );
}

export default NavbarFooterLayout;
