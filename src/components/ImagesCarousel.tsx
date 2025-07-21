import { spring, useCurrentFrame, useVideoConfig } from "remotion";

import { Image } from "./Image";

export const ImagesCarousel = ({ images }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Handle empty or single image cases
  if (!images || images.length === 0) {
    return null;
  }

  const springConfig = {
    mass: 0.3,
    stiffness: 150,
  };

  // Adjust animation based on number of images
  const slideCount = images.length;
  const shouldAnimate = slideCount > 1;

  const translate1 = shouldAnimate
    ? spring({
        fps,
        from: 0,
        to: 100,
        frame: frame - 50,
        config: springConfig,
      })
    : 0;

  const translate2 =
    shouldAnimate && slideCount > 2
      ? spring({
          fps,
          from: 100,
          to: 200,
          frame: frame - 110,
          config: springConfig,
        })
      : translate1;

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
      <div
        className="flex h-full w-full"
        style={{
          transform: `translateX(-${frame < 110 ? translate1 : translate2}%)`,
        }}
      >
        {images.map((image, index) => (
          <Image
            src={image}
            className="h-full w-full flex-shrink-0 object-contain object-center"
            key={`${image}-${index}`}
          />
        ))}
        {/* Pad with empty divs if fewer than 3 images */}
        {images.length === 1 && (
          <>
            <div className="h-full w-full flex-shrink-0 bg-gray-100" />
            <div className="h-full w-full flex-shrink-0 bg-gray-100" />
          </>
        )}
        {images.length === 2 && (
          <div className="h-full w-full flex-shrink-0 bg-gray-100" />
        )}
      </div>
    </div>
  );
};
