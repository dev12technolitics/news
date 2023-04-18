// import React from 'react'

const ContactCard = () => {
  return (
    <div>
      <div>
        <div className="flex w-screen items-center justify-center  bg-white">
          <div className="container mx-auto my-4 px-4 lg:px-20">
            <div className="my-4 mr-auto w-full rounded-2xl p-8 shadow-2xl md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40">
              <div className="flex">
                <h1 className="text-3xl font-bold uppercase">
                  Send us a <br /> message
                </h1>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <input
                  className="mt-2 w-full rounded-lg bg-gray-100 p-3 text-gray-900 focus:outline-none"
                  type="text"
                  placeholder="First Name*"
                />
                <input
                  className="mt-2 w-full rounded-lg bg-gray-100 p-3 text-gray-900 focus:outline-none"
                  type="text"
                  placeholder="Last Name*"
                />
                <input
                  className="mt-2 w-full rounded-lg bg-gray-100 p-3 text-gray-900 focus:outline-none"
                  type="email"
                  placeholder="Email*"
                />
                <input
                  className="mt-2 w-full rounded-lg bg-gray-100 p-3 text-gray-900 focus:outline-none"
                  type="number"
                  placeholder="Phone*"
                />
              </div>
              <div className="my-4">
                <textarea
                  placeholder="Message*"
                  className="mt-2 h-32 w-full rounded-lg bg-gray-100 p-3 text-gray-900 focus:outline-none"
                  defaultValue={''}
                />
              </div>
              <div className="my-2 w-1/2 lg:w-1/4">
                <button
                  className="w-full rounded-lg p-3 text-sm font-bold uppercase tracking-wide 
                text-gray-100 focus:outline-none"
                >
                  Send Message
                </button>
              </div>
            </div>
            <div className="ml-auto w-full rounded-2xl px-8 py-12 lg:-mt-96 lg:w-2/6">
              <div className="flex flex-col text-white">
                <h1 className="my-4 text-4xl font-bold uppercase">
                  Drop in our office
                </h1>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam tincidunt arcu diam, eu feugiat felis fermentum id.
                  Curabitur vitae nibh viverra, auctor turpis sed, scelerisque
                  ex.
                </p>
                <div className="my-4 flex w-2/3 lg:w-1/2">
                  <div className="flex flex-col">
                    <i className="fas fa-map-marker-alt pt-2 pr-2"></i>
                  </div>
                  <i className="fas fa-map-marker-alt pt-2 pr-2">
                    <div className="flex flex-col">
                      <h2 className="text-2xl">Main Office</h2>
                      <p className="text-gray-400">
                        5555 Tailwind RD, Pleasant Grove, UT 73533
                      </p>
                    </div>
                  </i>
                </div>
                <i className="fas fa-map-marker-alt pt-2 pr-2">
                  <div className="my-4 flex w-2/3 lg:w-1/2">
                    <div className="flex flex-col">
                      <i className="fas fa-phone-alt pt-2 pr-2"></i>
                    </div>
                    <i className="fas fa-phone-alt pt-2 pr-2">
                      <div className="flex flex-col">
                        <h2 className="text-2xl">Call Us</h2>
                        <p className="text-gray-400">Tel: xxx-xxx-xxx</p>
                        <p className="text-gray-400">Fax: xxx-xxx-xxx</p>
                      </div>
                    </i>
                  </div>
                  <i className="fas fa-phone-alt pt-2 pr-2">
                    <div className="my-4 flex w-2/3 lg:w-1/2">
                      <a
                        href="https://www.facebook.com/ENLIGHTENEERING/"
                        target="_blank"
                        rel="noreferrer"
                        className="mx-1 inline-block h-8 w-8 rounded-full bg-white pt-1 text-center"
                      >
                        <i className="fab fa-facebook-f text-shade-blue-900"></i>
                      </a>
                      <i className="fab fa-facebook-f text-shade-blue-900">
                        <a
                          href="https://www.linkedin.com/company/enlighteneering-inc-"
                          target="_blank"
                          rel="noreferrer"
                          className="mx-1 inline-block h-8 w-8 rounded-full bg-white pt-1 text-center"
                        >
                          <i className="fab fa-linkedin-in text-shade-blue-900"></i>
                        </a>
                        <i className="fab fa-linkedin-in text-shade-blue-900"></i>
                      </i>
                    </div>
                    <i className="fab fa-facebook-f text-shade-blue-900">
                      <i className="fab fa-linkedin-in text-shade-blue-900"></i>
                    </i>
                  </i>
                </i>
              </div>
              <i className="fas fa-map-marker-alt pt-2 pr-2">
                <i className="fas fa-phone-alt pt-2 pr-2">
                  <i className="fab fa-facebook-f text-shade-blue-900">
                    <i className="fab fa-linkedin-in text-shade-blue-900"></i>
                  </i>
                </i>
              </i>
            </div>
            <i className="fas fa-map-marker-alt pt-2 pr-2">
              <i className="fas fa-phone-alt pt-2 pr-2">
                <i className="fab fa-facebook-f text-shade-blue-900">
                  <i className="fab fa-linkedin-in text-shade-blue-900"></i>
                </i>
              </i>
            </i>
          </div>
          <i className="fas fa-map-marker-alt pt-2 pr-2">
            <i className="fas fa-phone-alt pt-2 pr-2">
              <i className="fab fa-facebook-f text-shade-blue-900">
                <i className="fab fa-linkedin-in text-shade-blue-900">
                  {/* COMPONENT CODE */}
                </i>
              </i>
            </i>
          </i>
        </div>
      </div>
    </div>
  )
}

export default ContactCard
