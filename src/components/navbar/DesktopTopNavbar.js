import { Grid } from "@mui/material";
import Image from "next/image";
import banner from "src/assets/svg/banner.jpg";
import Logo from "src/assets/svg/Screenshotlogo.png";

export default function DesktopTopNavbar() {
  return (
    <div className="py-8 flex justify-center w-full  text-center">
      <div className="container">
        <Grid container>
          <Grid item xs={12} md={4} lg={3}>
            <div className="relative h-28 w-[45%] hidden lg:block">
              <Image
                fill
                loading="lazy"
                src={Logo}
                className="w-full h-full object-cover"
                alt="Sample image"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={12} lg={9}>
            <div className="flex justify-end w-full">
              <div className="add-container h-28 w-3/4 relative">
                <Image
                  fill
                  loading="lazy"
                  src={banner}
                  className="w-full h-full object-cover"
                  alt="Sample image"
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
