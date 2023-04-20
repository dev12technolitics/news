import {
  AiOutlineAppstore,
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

export const NAVBAR_LINKS = [
  {
    link: "/news",
    name: "News",
  },
  {
    link: "/business",
    name: "Business",
  },
  {
    link: "/lifestyle",
    name: "Lifestyle",
  },
  {
    link: "/technology",
    name: "Technology",
  },
];

export const FOOTER_LINKS = [
  {
    value: "home",
    path: "/",
    icon: AiOutlineHome,
  },
  {
    value: "products",
    path: "/categories",
    icon: AiOutlineShoppingCart,
  },
  {
    value: "blog",
    path: "/blogs",
    icon: AiOutlineAppstore,
  },
  {
    value: "account",
    path: "/account/profile",
    icon: AiOutlineUser,
  },
];
export const MOBILE_NAVBAR_LINKS = [
  {
    link: "/",
    name: "home",
  },
  {
    link: "/categories",
    name: "categories",
  },
  {
    link: "/blogs",
    name: "blog",
  },
  {
    link: "/contact-us",
    name: "contact",
  },
  {
    link: "/privacy-policy",
    name: "Privacy Policy",
  },
];
export const FOOTER_LINKS_HERCO = [
  // {
  //   link: '/about-us',
  //   name: 'about us',
  // },
  {
    link: "/categories",
    name: "Shop",
  },
  {
    link: "/blogs",
    name: "Blog",
  },
  {
    link: "/privacy-policy",
    name: "Privacy",
  },
  {
    link: "/auth/dealership-registration",
    name: "Dealership Enquiry",
  },
];
