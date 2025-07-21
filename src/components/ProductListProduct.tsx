import { interpolate, useCurrentFrame } from "remotion";

import { Image } from "./Image";
import { Rank } from "./Rank";

export const ProductListProduct = ({ product, transitionStart }) => {
  const frame = useCurrentFrame();

  const opacity =
    frame < 3
      ? 1
      : interpolate(frame, [transitionStart, transitionStart + 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  const translate =
    frame < 3
      ? 0
      : interpolate(frame, [transitionStart, transitionStart + 10], [20, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  return (
    <div
      className="mb-8 flex items-center justify-between gap-6"
      style={{ opacity: opacity, transform: `translateY(${translate}px)` }}
    >
      <div className="flex items-center gap-5">
        <Rank rank={product.rank} delay={transitionStart} />
        <div className="relative">
          <Image
            src={product.thumbnail}
            className="h-20 w-20 rounded-xl"
            style={{
              boxShadow: "0 0 15px rgba(218, 86, 48, 0.2)",
            }}
          />
        </div>

        <div>
          <h2 className="line-clamp-2 text-4xl leading-10 font-medium text-gray-800">
            {product.name}
          </h2>
          <h3 className="line-clamp-2 text-3xl leading-8 text-gray-600">
            {product.tagline}
          </h3>
        </div>
      </div>
      <div
        className="flex flex-col rounded-lg px-3 py-2 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #f64900 0%, #e91e63 100%)",
          boxShadow: "0 3px 10px 0 rgba(246, 73, 0, 0.3)",
        }}
      >
        <p className="text-2xl font-semibold">▲</p>
        <p className="text-2xl font-semibold">{product.votesCount}</p>
      </div>
    </div>
  );
};
