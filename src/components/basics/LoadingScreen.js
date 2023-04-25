import Logo from "src/assets/svg/logo";

const LoadingScreen = () => {
  return (
    <section className="w-full h-full">
      <div className="flex h-screen w-full items-center justify-center">
        <Logo />
      </div>
    </section>
  );
};

export default LoadingScreen;
