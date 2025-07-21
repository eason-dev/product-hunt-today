import { interpolate, useCurrentFrame } from "remotion";

import { Image } from "./Image";
import { ImagesCarousel } from "./ImagesCarousel";
import { Rank } from "./Rank";

export const ProductDetailProduct = ({ product }) => {
  const { rank, thumbnail, name, topics, description, images, votesCount } =
    product;
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translate = interpolate(frame, [0, 8], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity: opacity, transform: `translateY(${translate}px)` }}>
      <div className="mb-6 flex items-center justify-between gap-6">
        <div className="flex flex-grow items-center gap-6 overflow-hidden">
          <div className="relative">
            <Image
              src={thumbnail}
              className="h-28 w-28 rounded-2xl"
              style={{
                boxShadow: "0 0 20px rgba(218, 86, 48, 0.3)",
              }}
            />
          </div>
          <div className="flex-grow">
            <h2 className="mb-2 line-clamp-2 text-4xl leading-10 font-medium text-gray-800">
              {name}
            </h2>
            <div className="overflow-fadeout-right flex items-center gap-1">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="box-border flex-shrink-0 rounded-lg border border-gray-400 bg-gray-50 px-3 py-1.5 text-base text-gray-500"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Rank rank={rank} delay={0} />
          <div
            className="flex gap-2 rounded-lg px-3 py-2 text-center text-white"
            style={{
              background: "linear-gradient(135deg, #f64900 0%, #e91e63 100%)",
              boxShadow: "0 4px 15px 0 rgba(246, 73, 0, 0.4)",
            }}
          >
            <p className="text-2xl font-semibold">▲</p>
            <p className="text-2xl font-semibold">
              {Math.floor(
                interpolate(frame, [0, 30], [0, votesCount], {
                  extrapolateRight: "clamp",
                }),
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="line-clamp-4 text-3xl leading-9 text-gray-700">
          {description}
        </p>
      </div>

      <ImagesCarousel images={images} />
    </div>
  );
};
