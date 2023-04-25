/* eslint-disable camelcase */
export const SITE_URL = "https://www.vanderashtra.com";
export const SITE_NAME = "vande rashtra";
export const SITE_LOGO = SITE_URL + "/logo.png";
export const SITE_FAVICON = SITE_URL + "/robo_fav.png";
export const SITE_BANNER = SITE_URL + "/logo.png";

const GlobalSEO = {
  global: {
    title: "Welcome to vande rashtra",
    description:
      "Welcome to the homepage of Website Robot Power Tools! Check out our selection of the latest products and services that are available to you. Visit us today for more information and to make your purchase.",
    openGraph: {
      type: "website",
      locale: "en_IE",
      url: SITE_URL,
      site_name: SITE_NAME,
      title: "Welcome to Robot Power Tools: High Quality Power Tools",
      description:
        "Welcome to the homepage of Website Robot Power Tools! Check out our selection of the latest products and services that are available to you. Visit us today for more information and to make your purchase.",
      images: [
        {
          url: SITE_BANNER,
          width: 1067,
          height: 725,
          alt: SITE_NAME,
        },
      ],
    },
    // twitter: {
    //   handle: "@akbarbhai",
    //   site: SITE_NAME,
    //   cardType: "summary_large_image",
    // },
    additionalLinkTags: [
      {
        rel: "icon",
        href: SITE_FAVICON,
      },
      {
        rel: "apple-touch-icon",
        // href: SITE_ICO_DIR + "apple-icon-76x76.png",
        sizes: "76x76",
      },
      {
        rel: "manifest",
        // href: SITE_ICO_DIR + "manifest.json",
      },
    ],
  },
  "/": {
    title: "Welcome to vande rashtra",
    description:
      "Welcome to the homepage of Website Robot Power Tools! Check out our selection of the latest products and services that are available to you. Visit us today for more information and to make your purchase.",
    openGraph: {
      image: SITE_BANNER,
      type: "website",
      locale: "en_IE",
      url: SITE_URL,
      site_name: SITE_NAME,
      title: "Welcome to Robot Power Tools: High Quality Power Tools",
      description:
        "Welcome to the homepage of Website Robot Power Tools! Check out our selection of the latest products and services that are available to you. Visit us today for more information and to make your purchase.",
      images: [
        {
          url: `https://www.robotpowertools.com/logo.png`,
          width: 1067,
          height: 725,
          alt: SITE_NAME,
        },
      ],
    },
  },
  "/blogs": {
    title: "Blog Page of Website Robot Power Tools | Latest Updates & News",
    description:
      "Keep up to date on the latest news and trends from the Website Robot Power Tools team. Read our blogs to learn more about the products and services we provide.",

    openGraph: {
      image: SITE_BANNER,
      type: "website",
      locale: "en_IE",
      url: SITE_URL,
      site_name: SITE_NAME,
      title: "Blog Page of Website Robot Power Tools | Latest Updates & News",
      description:
        "Keep up to date on the latest news and trends from the Website Robot Power Tools team. Read our blogs to learn more about the products and services we provide.",
      images: [
        {
          url: `https://www.robotpowertools.com/logo.png`,
          width: 1067,
          height: 725,

          alt: SITE_NAME,
        },
      ],
    },
  },
  "/auth/dealership-registration": {
    title:
      "Become a Robot Power Tools Dealer - Partner with a Leading Provider of High-Quality Tools",
    description:
      "Join Robot Power Tools' team as a dealer and gain access to our high-quality products, expert support, and industry expertise. Our dealers are a vital part of our business, and we are committed to providing the support and resources needed to succeed. Contact us today to learn more about becoming a Robot Power Tools dealer.",
    openGraph: {
      image: SITE_BANNER,
      type: "website",
      locale: "en_IE",
      url: SITE_URL,
      site_name: SITE_NAME,
      title:
        "Become a Robot Power Tools Dealer - Partner with a Leading Provider of High-Quality Tools",
      description:
        "Join Robot Power Tools' team as a dealer and gain access to our high-quality products, expert support, and industry expertise. Our dealers are a vital part of our business, and we are committed to providing the support and resources needed to succeed. Contact us today to learn more about becoming a Robot Power Tools dealer.",
      images: [
        {
          url: `https://www.robotpowertools.com/logo.png`,
          width: 1067,
          height: 725,
          alt: SITE_NAME,
        },
      ],
    },
  },
  "/orders/checkout": {
    title: "Robot Power Tools || Checkout",
    description:
      "Robot Power Tools || Checkout: Check your cart and complete order with amzing offers",
    openGraph: {
      image: SITE_BANNER,
      type: "website",
      locale: "en_IE",
      url: SITE_URL,
      site_name: SITE_NAME,
      title: "Robot Power Tools || Checkout",
      description:
        "Robot Power Tools || Checkout: Check your cart and complete order with amzing offers",
      images: [
        {
          url: `https://www.robotpowertools.com/logo.png`,
          width: 1067,
          height: 725,
          alt: SITE_NAME,
        },
      ],
    },
  },
  "/p": {
    title: "Buy Premium Quality Products at Website | Shop Now",
    description:
      "Robot Power offers high-quality, reliable, and efficient power solutions for everyday applications. With an extensive range of products and services, we are your one-stop shop for all your power tools needs.",
    openGraph: {
      image: SITE_BANNER,
      type: "website",
      locale: "en_IE",
      url: SITE_URL,
      site_name: SITE_NAME,
      title: "Buy Premium Quality Products at Website | Shop Now",
      description:
        "Robot Power offers high-quality, reliable, and efficient power solutions for everyday applications. With an extensive range of products and services, we are your one-stop shop for all your power tools needs.",
      images: [
        {
          url: `https://www.robotpowertools.com/logo.png`,
          width: 1067,
          height: 725,
          alt: SITE_NAME,
        },
      ],
    },
  },
  "/categories": {
    title: "Buy Premium Quality Products at Website | Shop Now",
    description:
      "Robot Power offers high-quality, reliable, and efficient power solutions for everyday applications. With an extensive range of products and services, we are your one-stop shop for all your power tools needs.",
    openGraph: {
      image: SITE_BANNER,
      type: "website",
      locale: "en_IE",
      url: SITE_URL,
      site_name: SITE_NAME,
      title: "Buy Premium Quality Products at Website | Shop Now",
      description:
        "Robot Power offers high-quality, reliable, and efficient power solutions for everyday applications. With an extensive range of products and services, we are your one-stop shop for all your power tools needs.",
      images: [
        {
          url: `https://www.robotpowertools.com/logo.png`,
          width: 1067,
          height: 725,
          alt: SITE_NAME,
        },
      ],
    },
  },
  "/offers": {
    title: "Robot Power Tools || Offers",
    description:
      "Robot Power Tools || Offers: Get Amazing Offers on your favourite Products.",
    openGraph: {
      image: SITE_BANNER,
      type: "website",
      locale: "en_IE",
      url: SITE_URL,
      site_name: SITE_NAME,
      title: "Robot Power Tools || Offers",
      description:
        "Robot Power Tools || Offers: Get Amazing Offers on your favourite Products.",
      images: [
        {
          url: `https://www.robotpowertools.com/logo.png`,
          width: 1067,
          height: 725,
          alt: SITE_NAME,
        },
      ],
    },
  },
  "/contact-us": {
    title: "Get in Touch Now",
    description:
      "Get in touch with Website Robot Power Tools and reach out to us with any questions or inquiries. Our experienced team is here to help.",
    openGraph: {
      image: SITE_BANNER,
      type: "website",
      locale: "en_IE",
      url: SITE_URL,
      site_name: SITE_NAME,
      title: "Get in Touch Now",
      description:
        "Get in touch with Website Robot Power Tools and reach out to us with any questions or inquiries. Our experienced team is here to help.",
      images: [
        {
          url: `https://www.robotpowertools.com/logo.png`,
          width: 1067,
          height: 725,
          alt: SITE_NAME,
        },
      ],
    },
  },
  "/auth/login": {
    title: "Login to Website Robot Power Tools | Secure Login",
    description:
      "Login to Website Robot Power Tools to securely access all your account features. Enjoy quick and secure access to your account whenever you need it.",
    openGraph: {
      image: SITE_BANNER,
      type: "website",
      locale: "en_IE",
      url: SITE_URL,
      site_name: SITE_NAME,
      title: "Login to Website Robot Power Tools | Secure Login",
      description:
        "Login to Website Robot Power Tools to securely access all your account features. Enjoy quick and secure access to your account whenever you need it.",
      images: [
        {
          url: `https://www.robotpowertools.com/logo.png`,
          width: 1067,
          height: 725,
          alt: SITE_NAME,
        },
      ],
    },
  },
  "/auth/registration": {
    title: "Register for Website Robot Power Tools",
    description:
      "Create an account to join the Website Robot Power Tools community and gain access to exclusive features. Sign up for a free account today and start exploring the website.",
    openGraph: {
      image: SITE_BANNER,
      type: "website",
      locale: "en_IE",
      url: SITE_URL,
      site_name: SITE_NAME,
      title: "Register for Website Robot Power Tools",
      description:
        "Create an account to join the Website Robot Power Tools community and gain access to exclusive features. Sign up for a free account today and start exploring the website.",
      images: [
        {
          url: `https://www.robotpowertools.com/logo.png`,
          width: 1067,
          height: 725,
          alt: SITE_NAME,
        },
      ],
    },
  },
  "/privacy-policy": {
    title: "Privacy Policy of Robot Power Tools - Secure Your Data Now!",
    description:
      "Learn about Website Robot Power Tools's privacy policy, including how we collect and use your personal data.",
    openGraph: {
      image: SITE_BANNER,
      type: "website",
      locale: "en_IE",
      url: SITE_URL,
      site_name: SITE_NAME,
      title: "Privacy Policy of Robot Power Tools - Secure Your Data Now!",
      description:
        "Learn about Website Robot Power Tools's privacy policy, including how we collect and use your personal data.",
      images: [
        {
          url: `https://www.robotpowertools.com/logo.png`,
          width: 1067,
          height: 725,
          alt: SITE_NAME,
        },
      ],
    },
  },
  "/account/profile": {
    title: "Robot Power Tools || My Profile",
    description:
      "Robot Power Tools || My Profile: Check your profile, wishlists and, orders",
    openGraph: {
      image: SITE_BANNER,
      type: "website",
      locale: "en_IE",
      url: SITE_URL,
      site_name: SITE_NAME,
      title: "Robot Power Tools || My Profile",
      description:
        "Robot Power Tools || My Profile: Check your profile, wishlists and, orders",
      images: [
        {
          url: `https://www.robotpowertools.com/logo.png`,
          width: 1067,
          height: 725,
          alt: SITE_NAME,
        },
      ],
    },
  },
  "/about-us": {
    title: "Get to Know Us : Our Story | Robot Power Tools",
    description:
      "Learn more about Website Robot Power Tools and our mission to provide quality services. Get to know our team and discover our vision for the future.",
    openGraph: {
      image: SITE_BANNER,
      type: "website",
      locale: "en_IE",
      url: SITE_URL,
      site_name: SITE_NAME,
      title: "Get to Know Us : Our Story | Robot Power Tools",
      description:
        "Learn more about Website Robot Power Tools and our mission to provide quality services. Get to know our team and discover our vision for the future.",
      images: [
        {
          url: `https://www.robotpowertools.com/logo.png`,
          width: 1067,
          height: 725,
          alt: SITE_NAME,
        },
      ],
    },
  },
};

export default GlobalSEO;
