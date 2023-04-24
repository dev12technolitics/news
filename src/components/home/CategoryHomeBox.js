import Image from "next/image";
import bgImg from "../../assets/svg/detali2.jpg";

export function CategoryHomeBox({ item, redirectUrl, redirectPath }) {
  const { icon, name, slug } = item || {};

  return (
    <>
      <div className="relative border-2 w-20 h-20 border-red-900 rounded-full p-1  aspect-square animate-opacityAnimation">
        <Image
          src={bgImg}
          alt={name}
          className="rounded-full h-full w-full overflow-hidden object-cover"
        />
      </div>
    </>
  );
}
