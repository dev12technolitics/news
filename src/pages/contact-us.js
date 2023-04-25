import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/system";
import { DefaultSeo, LogoJsonLd } from "next-seo";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { AiFillPhone } from "react-icons/ai";
import { BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FaBlenderPhone, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FadeRight } from "src/components/animate";
import { AppButton } from "src/components/basics";
import { RHFTextField } from "src/components/hook-form";
import FormProvider from "src/components/hook-form/FormProvider";
import { useCreateContactEnquiry } from "src/services/contactServices";
import { allowOnlyNumbers } from "src/utils/utils-fun";
import * as Yup from "yup";
import GlobalSEO, { SITE_LOGO, SITE_URL } from "../data/next-seo.data";
// ----------------------------------------------------------------------
// export const config = {
//   // eslint-disable-next-line camelcase
//   unstable_runtimeJS: false,
// }
ContactUs.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function ContactUs() {
  const { mutate, isLoading } = useCreateContactEnquiry();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const ContactUsSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    emailId: Yup.string()
      .email("Email must be a valid email address")
      .notRequired(),
    contactNo: Yup.string()
      .min(10, "Contact number must be atleast 10 digits")
      .max(10, "Contact number must be only 10 digits")
      .matches(phoneRegExp, "Contact number is not valid"),
  });

  const defaultValues = useMemo(
    () => ({
      name: "",
      contactNo: "",
      emailId: "",
      remarks: "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(ContactUsSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const values = watch()

  const onSubmit = async (data) => {
    console.log("data", data);
    const payload = {
      name: data?.name,
      contactNo: data?.contactNo,
      emailId: data?.emailId,
      remarks: data?.remarks,
    };
    mutate(payload, {
      onSuccess: () => {
        reset();
      },
    });
  };
  return (
    <>
      <DefaultSeo {...GlobalSEO.global} {...GlobalSEO["/contact-us"]} />
      <LogoJsonLd logo={SITE_LOGO} url={SITE_URL} />
      <FadeRight durationTime={"1s"}>
        <div className="bg-[#F9F9F9] mt-[-3px] md:mt-0">
          <div className="grid grid-cols-6">
            <div className=" md:col-span-6 lg:col-span-4 sm:col-span-6 col-span-6">
              <div className="pt-0 sm:pt-10">
                <Stack className="bg-[#fff] md:mx-24 mx-4 md:my-10 mt-[4.5rem]">
                  <div className="py-8 md:py-20 rounded-2xl w-full md:px-16 px-4 h-full mx-auto">
                    <div className="capitalize w-full">
                      <h1 className="font-bold text-md md:text-3xl capitalize mt-0 ">
                        Send Us a Message
                      </h1>
                      <h5 className="font-robo md:text-xl text-lg font-normal md:mt-2 mt-[-7px] text-[#6b7074]">
                        Your email address will not be published.
                        <br /> All the fields are required.
                      </h5>
                    </div>

                    <div className="my-4">
                      <FormProvider
                        methods={methods}
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <Stack
                          spacing={{
                            xs: 2,
                            sm: 2,
                            md: 4,
                            lg: 4,
                          }}
                        >
                          <RHFTextField
                            sx={{ background: "white" }}
                            name="name"
                            label="Name"
                          />

                          <RHFTextField
                            sx={{ background: "white" }}
                            name="contactNo"
                            label="Contact No."
                            onChange={(e) => {
                              setValue("contactNo", allowOnlyNumbers(e));
                            }}
                          />
                          <RHFTextField
                            sx={{ background: "white" }}
                            name="emailId"
                            label="Email Id"
                          />

                          <RHFTextField
                            multiline
                            rows={6}
                            name="remarks"
                            label="Remarks"
                            sx={{ background: "white" }}
                          />
                          <div className="flex justify-start">
                            <AppButton
                              type="submit"
                              size="large"
                              variant="contained"
                              title="Submit"
                              loading={isLoading}
                              loadingIndicator="Loading..."
                            />
                          </div>
                        </Stack>
                      </FormProvider>
                    </div>
                  </div>
                </Stack>
              </div>
            </div>

            <div className="sm:col-span-6 col-span-6 md:col-span-6 lg:col-span-2">
              <div
                className="pt-0 sm:pt-10 lg:pr-24 md:pr-24 md:pl-24 lg:pl-0 
             md:h-full h-fit  flex justify-center items-center mx-4 md:mx-0 my-0"
              >
                <Stack className="bg-[#fff] my-10 h-fit w-full">
                  <div className="py-8 md:py-16 rounded-2xl w-full px-4 md:px-12  h-full mx-auto">
                    <div className="capitalize w-full">
                      <h1 className="font-bold text-2xl md:text-3xl capitalize mt-0">
                        Contact Information
                      </h1>
                      <h5 className="text-lg md:text-xl font-normal md:mt-2 mt-[-10px]   text-[#6b7074]">
                        Theodore Lowe, Ap #867-859
                        <br /> Sit Rd, Azusa New York
                      </h5>
                      <h1 className="font-bold text-lg md:text-xl capitalize md:mt-0 mt-[-10px]">
                        We Are Available 24/ 7. Call Now.
                      </h1>
                      <div className="mb-2">
                        <a
                          className="tel flex items-center"
                          href="tel:(888) 456-2790"
                        >
                          <AiFillPhone
                            className="mr-4 text-[#6b7074]"
                            size={20}
                          />
                          <span className="font-medium text-[#6b7074]">
                            {" "}
                            (888) 456-2790
                          </span>
                        </a>
                      </div>
                      <div className="mb-2">
                        <a
                          className="tel flex items-center"
                          href="tel:(121) 255-53333"
                        >
                          <FaBlenderPhone
                            className="mr-4 text-[#6b7074]"
                            size={20}
                          />
                          <span className="font-medium text-[#6b7074]">
                            {" "}
                            (121) 255-53333
                          </span>
                        </a>
                      </div>
                      <div className="mb-2">
                        <a
                          className="tel flex items-center"
                          href="mailto:example@domain.com"
                        >
                          <MdEmail className="mr-4 text-[#6b7074]" size={20} />{" "}
                          <span className="font-medium text-[#6b7074]">
                            example@domain.com
                          </span>
                        </a>
                      </div>

                      <h1 className="font-bold text-lg md:text-xl capitalize md:mt-10 mt-6">
                        Find us here
                      </h1>
                      <div>
                        <a
                          target={"_blank"}
                          rel="noreferrer"
                          // href={`https://www.facebook.com/sharer.php?u=${socialSharePath}`}
                        >
                          <button className="cursor-poinetr mr-3 inline-flex items-center space-x-2 rounded-full bg-[#121213] p-3 font-semibold text-white">
                            <FaFacebook size={18} />
                          </button>
                        </a>
                        <a
                          target={"_blank"}
                          rel="noreferrer"
                          // href={`https://api.whatsapp.com/send?text=${socialSharePath}`}
                        >
                          <button className="cursor-poinetr mr-3 inline-flex items-center space-x-2 rounded-full bg-[#121213] p-3 font-semibold text-white">
                            <BsWhatsapp size={18} />
                          </button>
                        </a>
                        <a
                          target={"_blank"}
                          rel="noreferrer"
                          // href={`https://twitter.com/intent/tweet?text=${socialSharePath}`}
                        >
                          <button className="cursor-poinetr mr-3 inline-flex items-center space-x-2 rounded-full bg-[#121213] p-3 font-semibold text-white">
                            <BsTwitter size={18} />
                          </button>
                        </a>
                        <a
                          target={"_blank"}
                          className="cursor-poinetr"
                          rel="noreferrer"
                          // href={`https://www.instagram.com/?url=${socialSharePath}`}
                        >
                          <button className="cursor-poinetr inline-flex items-center space-x-2 rounded-full bg-[#121213] p-3 font-semibold text-white">
                            <BsInstagram size={18} />
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </FadeRight>
    </>
  );
}
