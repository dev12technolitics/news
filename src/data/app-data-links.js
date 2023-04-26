import {
  AiOutlineAppstore,
  AiOutlineHome,
  AiOutlineShoppingCart,
} from "react-icons/ai";

export const NAVBAR_LINKS = [
  {
    link: "/news",
    name: "News",
  },
  {
    link: "/contact-us",
    name: "Contact Us",
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
    value: "Contact Us",
    path: "/contact-us",
    icon: AiOutlineShoppingCart,
  },
  {
    value: "News",
    path: "/news",
    icon: AiOutlineAppstore,
  },
];
export const MOBILE_NAVBAR_LINKS = [
  {
    link: "/",
    name: "home",
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
