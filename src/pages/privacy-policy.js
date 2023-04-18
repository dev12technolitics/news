// import React from 'react'
import { DefaultSeo } from 'next-seo'
import GlobalSEO from '../data/next-seo.data'
import { FadeRight } from 'src/components/animate'
function PrivacyPolicy() {
  return (
    <>
      <DefaultSeo {...GlobalSEO.global} {...GlobalSEO['/privacy-policy']} />
      <FadeRight durationTime={'1s'}>
        <section className="md:container mx-auto px-5 md:my-20 my-16">
          <h1 className="text-[25px]  font-robo font-semibold tracking-wide theme_text text-center my-7 capitalize">
            Privacy Policy
          </h1>
          <div className="md:w-10/12 mx-auto mt-10">
            <div className="mb-7">
              <p className="font-light text-justify text-base font-robo leading-7">
                At Opus Innovation, we respect your privacy. We are committed to
                protecting any personal information that you provide to us when
                using our website. This privacy policy is intended to provide
                you with information regarding the ways we collect and use the
                data you provide to us.
              </p>
            </div>
            <div className="mb-7">
              <p className="font-light text-justify text-base font-robo leading-7">
                We may collect non-personal information such as your IP address,
                type of browser you use, the pages you visit, and the time and
                date of your visits. This non-personal information is used to
                help us analyze website usage and improve our services. We may
                also collect personal information such as your name, email
                address, and other contact information when you register or
                purchase products on our website.
              </p>
            </div>
            <div className="mb-7">
              <p className="font-light text-justify text-base font-robo leading-7">
                We use the information we collect from you to provide you with a
                better user experience, customize our services to meet your
                needs, and send you promotional materials about products and
                services that may interest you. We may also use the information
                for internal purposes such as research and development, customer
                service, and marketing.
              </p>
            </div>
            <div className="mb-7">
              <p className="font-light text-justify text-base font-robo leading-7">
                We may share your personal information with third parties such
                as our business partners, affiliates, and service providers;
                however, we will not share your information with any third
                parties for the purpose of marketing or advertising.
              </p>
            </div>
            <div className="mb-7">
              <p className="font-light text-justify text-base font-robo leading-7">
                We strive to keep your personal information secure. We have
                implemented various security measures to protect the information
                we collect from unauthorized access and disclosure.
              </p>
            </div>
            <div className="mb-7">
              <p className="font-light text-justify text-base font-robo leading-7">
                If you have any questions or concerns about our privacy policy,
                please contact us. We appreciate your trust in us and will do
                our best to protect your privacy.
              </p>
            </div>
          </div>
        </section>
      </FadeRight>
    </>
  )
}

export default PrivacyPolicy
