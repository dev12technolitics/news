import { Badge, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Fragment, useState } from "react";
import { MdClose } from "react-icons/md";
import { RiShoppingCart2Line } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";

import { useDispatch, useSelector } from "react-redux";
import { AppButton } from "../basics";
import AppIconButton from "../basics/AppIconButton";

export default function SideMenuBar() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    left: false,
  });
  const { userType } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 470,
        height: "600px",
      }}
      role="presentation"
      className="h-[87vh] overflow-scroll relative"
    >
      <Divider />

      <div className="flex justify-between w-11/12 mx-auto">
        <h5 className="mb-5 ml-1 text-base font-bold uppercase">List</h5>
        <span
          className="mt-6 cursor-pointer text-xl"
          onClick={toggleDrawer(anchor, false)}
        >
          <span className="transition-all duration-500 hover:rotate-90">
            <MdClose />
          </span>
        </span>
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
                <Badge badgeContent={cartItems?.length} color="primary">
                  <RxHamburgerMenu
                    className="text-theme-primary-main"
                    size={30}
                  />{" "}
                </Badge>
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
            <Box className="absolute bottom-0 w-full left-0">
              {cartItems?.length > 0 && (
                <Box sx={{ p: 2 }}>
                  <AppButton
                    fullWidth
                    size="large"
                    variant="contained"
                    title={"CHECKOUT"}
                    href="/orders/checkout"
                    endIcon={<RiShoppingCart2Line className="text-sm" />}
                  />
                </Box>
              )}
            </Box>
          </Drawer>
        </Fragment>
      ))}
    </Box>
  );
}