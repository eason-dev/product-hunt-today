import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraMotionBlur } from "@remotion/motion-blur";
import { Image } from "./Image";

export const ImagesCarousel = ({ images }: { images: string[] }) => {
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

  const currentTranslate = frame < 110 ? translate1 : translate2;
  // Calculate motion blur intensity based on transition state
  const isTransitioning =
    (frame > 45 && frame < 65) || (frame > 105 && frame < 125); // Wider transition window
  const shutterAngle = isTransitioning ? 270 : 0.1; // Higher angle for more noticeable blur
  const samples = isTransitioning ? 6 : 1; // Reduce samples when not transitioning

  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
      <CameraMotionBlur shutterAngle={shutterAngle} samples={samples}>
        <div
          className="flex h-full w-full"
          style={{
            transform: `translateX(-${currentTranslate}%)`,
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
      </CameraMotionBlur>
    </div>
  );
};
