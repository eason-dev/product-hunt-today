import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraMotionBlur } from "@remotion/motion-blur";
import { Image } from "./Image";

export const EnhancedImagesCarousel = ({ images }: { images: string[] }) => {
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
    (frame > 50 && frame < 58) || (frame > 110 && frame < 118);
  const shutterAngle = isTransitioning ? 180 : 0.1; // Use 0.1 instead of 0 to avoid array length issues

  return (
    <div className="relative aspect-[16/9] overflow-hidden">
      <CameraMotionBlur shutterAngle={shutterAngle} samples={8}>
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
