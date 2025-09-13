import NextImage, { ImageProps } from "next/image";

// Merge the props of Next.js Image component and a regular img tag
type CustomImageProps = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'> & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export default function Image({
  src,
  alt,
  width,
  height,
  quality = 75, // Reduced from 100 to 75 for better performance
  sizes,
  priority = false,
  ...props
}: CustomImageProps) {
  if (!src) return null;

  // Provide default dimensions if not specified
  const defaultWidth = width || 800;
  const defaultHeight = height || 600;

  // Default sizes for responsive images
  const defaultSizes = sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw";

  return (
    <NextImage
      src={src}
      alt={alt}
      width={defaultWidth}
      height={defaultHeight}
      quality={quality}
      sizes={defaultSizes}
      priority={priority}
      // Add loading optimization
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQAAAAEAAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bK"
      style={{
        width: '100%',
        height: 'auto',
        ...props.style
      }}
      {...props}
    />
  );
}