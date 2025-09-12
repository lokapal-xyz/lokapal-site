import NextImage, { ImageProps } from "next/image";

// Merge the props of Next.js Image component and a regular img tag
type CustomImageProps = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> & {
  src: string;
  alt: string;
  width?: number; // Make these optional
  height?: number; // Make these optional
};

export default function Image({
  src,
  alt,
  width,
  height,
  quality = 100, // Default quality to 75 (or remove to use Next.js default)
  ...props
}: CustomImageProps) {
  if (!src) return null;

  // Next.js requires width and height for static images.
  // A common pattern is to either:
  // 1. Make the caller provide them.
  // 2. Use `fill` for responsive images.
  // 3. Use `sizes` and `width/height` with `layout="responsive"` (deprecated).
  //
  // If you are using this component for icons, you must pass `width` and `height`.
  if (typeof width !== "number" || typeof height !== "number") {
    console.warn("The `Image` component requires both `width` and `height` props for static images.");
    // Or throw an error to fail early
    // throw new Error("`width` and `height` are required for this `Image` component.");
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      {...props}
    />
  );
}