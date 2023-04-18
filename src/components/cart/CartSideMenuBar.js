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

export default function xxCartSideBar() {
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
        width: anchor === "top" || anchor === "bottom" ? "auto" : 570,
        height: "600px",
      }}
      role="presentation"
    >
      <Divider />

      <div className="flex justify-between px-2">
        <h5 className="mb-5 ml-1 text-base font-bold uppercase">Order List</h5>
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
                  <RxHamburgerMenu className="text-theme-primary-main" />{" "}
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
            {cartItems?.length > 0 && (
              <Box sx={{ p: 2 }}>
                <AppButton
                  fullWidth
                  size="large"
                  variant="contained"
                  title={"Checkout"}
                  href="/orders/checkout"
                  endIcon={<RiShoppingCart2Line className="text-sm" />}
                />
              </Box>
            )}
          </Drawer>
        </Fragment>
      ))}
    </Box>
  );
}
