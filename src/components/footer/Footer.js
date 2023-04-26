import DesktopFooter from "./DesktopFooter";
export const Footer = ({ setpageLoading }) => {
  return (
    <div className="w-full">
      <div className="hidden md:block">
        <DesktopFooter setpageLoading={setpageLoading} />
      </div>
      {/* <div className="md:hidden mt-[60px]">
        <MobileFooter />
      </div> */}
    </div>
  );
};
