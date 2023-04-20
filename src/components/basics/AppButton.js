import { LoadingButton } from "@mui/lab";
// import React from 'react'

export default function AppButton({
  title = "App Button",
  themeColor,
  ...otherProps
}) {
  const themeColorChanger = () => {
    if (themeColor === "secondary") {
      let classes = "";
      if (otherProps?.variant === "contained") {
        classes =
          "bg-theme-secondary hover:bg-theme-secondary hover:bg-opacity-75 hover:shadow-none active:border-theme-secondary hover:border-theme-secondary active:text-white hover:text-white";
      } else if (otherProps?.variant === "outlined") {
        classes =
          "text-theme-secondary border border-theme-secondary active:border-theme-secondary hover:border-theme-secondary hover:bg-theme-secondary hover:bg-opacity-[0.2] hover:shadow-none hover:text-theme-secondary active:text-theme-secondary";
      }
      return classes;
    }
  };
  const classes = themeColorChanger();
  const buttonCustomStyle = {
    border: otherProps?.variant == "contained" && "1px solid transparent",

    "&:hover": {
      background: otherProps?.variant == "contained" && "white",
      color: (theme) =>
        otherProps?.variant == "contained" && theme.palette.primary.main,
      border: (theme) =>
        otherProps?.variant == "contained" &&
        `1px solid ${theme.palette.primary.main}`,
      // : otherProps?.variant == 'outlined'
      // ? 'linear-gradient(270deg, #0095ed -1.84%, #151ecf 103.16%)'
      // : 'none',
      // border:
      //   otherProps?.variant == 'contained'
      //     ? '1.1px solid #575FF0'
      //     : otherProps?.variant == 'outlined'
      //     ? '1.1px solid transparent'
      //     : 'none',
      // color:
      //   otherProps?.variant == 'contained'
      //     ? 'transparent'
      //     : otherProps?.variant == 'outlined'
      //     ? 'white'
      //     : 'none',
      // backgroundClip: otherProps?.variant == 'contained' ? 'text' : 'none',
    },
  };

  return (
    <LoadingButton
      sx={buttonCustomStyle}
      className={`font-robo ${classes}`}
      {...otherProps}
    >
      {title}
    </LoadingButton>
  );
}
