import Image, { type ImageProps } from "next/image";

// A product screenshot that follows the site theme: `foo.png` in light mode,
// its `foo-dark.png` twin in dark mode. Both are in the markup so the swap is
// pure CSS (no flash, works before hydration); the hidden one is display:none,
// which a lazy-loaded image never fetches.
export function darkShot(src: string) {
  return src.replace(/\.png$/, "-dark.png");
}

export function ThemedScreenshot({ src, alt, className = "", ...props }: Omit<ImageProps, "src"> & { src: string }) {
  return (
    <>
      <Image src={src} alt={alt} className={`${className} dark:hidden`} {...props} />
      <Image src={darkShot(src)} alt={alt} className={`${className} hidden dark:inline`} {...props} />
    </>
  );
}
