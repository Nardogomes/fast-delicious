import Image, { ImageProps } from "next/image";

const PromoBanner = (props: ImageProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      width={0}
      height={0}
      className="w-full h-auto object-contain"
      sizes="100vw"
      quality={100}
      {...props}
    />
  )
}

export default PromoBanner;