import DesktopFooter from "./DesktopFooter";
import MobileFooter from "./MobileFooter";
export const Footer = () => {
  return (
    <div className="w-full">
      <div className="hidden md:block">
        <DesktopFooter />
      </div>
      <div className="md:hidden mt-[60px]">
        <MobileFooter />
      </div>
    </div>
  );
};
