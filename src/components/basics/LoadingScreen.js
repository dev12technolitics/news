import Image from "next/image";
import Logo from "src/assets/svg/Screenshotlogo.png";

const LoadingScreen = () => {
  return (
    <section className="w-full h-full">
      <div className="flex h-screen w-full items-center justify-center">
        <div className=" flex h-[80px] w-[130px] items-center justify-center sm:h-[140px] sm:w-[150px]">
          <Image
            src={Logo}
            alt="Picture of the author"
            width={120}
            height={70}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default LoadingScreen;
