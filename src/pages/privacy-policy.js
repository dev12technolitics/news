// import React from 'react'
import { DefaultSeo } from 'next-seo'
import GlobalSEO from '../data/next-seo.data'
import { FadeRight } from 'src/components/animate'
import Link from 'next/link'
function PrivacyPolicy() {
  return (
    <>
      <DefaultSeo {...GlobalSEO.global} {...GlobalSEO['/privacy-policy']} />
      <FadeRight durationTime={'1s'}>
        <section className="md:container mx-auto px-5 md:my-20 my-16">
          <h1 className="text-[25px] font-robo font-semibold tracking-wide theme_text text-center my-7 capitalize">
            Privacy Policy
          </h1>
          <div className="md:w-10/12 mx-auto mt-10">
            <div className="mb-7">
              <p className="font-light text-justify text-base font-robo leading-7">
                Robot Power, Inc. (&quot;Robot Power&quot; or &quot;we&quot;)
                takes the privacy of its users very seriously. This Privacy
                Policy explains how we collect, use, and share information from
                our users, including how we use the data collected through our
                mobile app, Robot Power.
              </p>
            </div>
            <div className="mb-7">
              <p className="font-light text-justify text-base font-robo leading-7">
                We collect information about you when you use the Robot Power
                mobile app, including when you register for an account, sign
                into the app, use the features of the app, or access content. We
                also collect information about your device, such as the type of
                device, its operating system, and other device-specific
                information.
              </p>
            </div>
            <div className="mb-7">
              <p className="font-light text-justify text-base font-robo leading-7">
                We use the information we collect from you to provide you with a
                better experience with Robot Power. This includes providing you
                with personalized content, making suggestions, and providing
                technical support. We may also use the information to improve
                our products and services, to customize your experience, to
                market our services, and to detect and prevent fraud.
              </p>
            </div>
            <div className="mb-7">
              <p className="font-light text-justify text-base font-robo leading-7">
                We may share certain information with third-party companies in
                order to provide our services, such as our advertising partners.
                We will never share any of your personal information with these
                third parties, and we will not use your personal information for
                any purpose other than providing our services.
              </p>
            </div>
            <div className="mb-7">
              <p className="font-light text-justify text-base font-robo leading-7">
                We take your privacy seriously and take steps to ensure that
                your information is secure. We use secure server software and
                take other measures to protect the security of your information.
              </p>
            </div>
            <div className="mb-7">
              <p className="font-light text-justify text-base font-robo leading-7">
                If you have any questions about this Privacy Policy, please
                contact us at{' '}
                <Link href="mailto:info@robotpower.com" legacyBehavior>
                  <a target="_blank" className="text-blue-600">
                    info@robotpower.com
                  </a>
                </Link>
                {'.'}
              </p>
            </div>
          </div>
        </section>
      </FadeRight>
    </>
  )
}

export default PrivacyPolicy
