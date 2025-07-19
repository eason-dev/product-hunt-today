import { spring, useCurrentFrame, useVideoConfig } from "remotion";

import { Image } from "./Image";

export const ImagesCarousel = ({ images }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const springConfig = {
    mass: 0.3,
    stiffness: 150,
  };

  const translate1 = spring({
    fps,
    from: 0,
    to: 100,
    frame: frame - 50,
    config: springConfig,
  });

  const translate2 = spring({
    fps,
    from: 100,
    to: 200,
    frame: frame - 110,
    config: springConfig,
  });

  return (
    <div className="relative overflow-hidden aspect-[16/9]">
      <div
        className="flex h-full w-full"
        style={{
          transform: `translateX(-${frame < 110 ? translate1 : translate2}%)`,
        }}
      >
        {images.map((image) => (
          <Image
            src={image}
            className="h-full w-full flex-shrink-0 object-contain object-center"
            key={image}
          />
        ))}
      </div>
    </div>
  );
};
