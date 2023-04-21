// import React from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
import { FOOTER_LINKS } from "src/data/app-data-links";

const MobileFooter = () => {
  return (
    <div>
      <div className="mobile_slider shadow-shadow-primary md:hidden block w-full bottom-0 bg-white z-10 fixed">
        <div className="grid grid-cols-3 w-full bg-white pt-2 pb-1 justify-center">
          <MobileFooterList list={FOOTER_LINKS} />
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;

const MobileFooterList = ({ list = [] }) => {
  const router = useRouter();
  let currentPath = router?.pathname;
  return (
    <>
      {list?.map((item) => {
        const Icon = item?.icon;
        return (
          <div className="flex justify-center " key={item.path}>
            <Link href={item.path}>
              <div>
                <div className="w-full justify-center flex">
                  <Icon className="text-xl" />
                </div>
                <span className="text-sm capitalize tracking-[0.5px]">
                  {item.value}
                </span>

                {currentPath == item.path ? (
                  <div className="rounded-lg w-full border-2 border-theme-primary-main" />
                ) : null}
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};
