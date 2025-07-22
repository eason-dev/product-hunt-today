import { interpolate, useCurrentFrame } from "remotion";

import { Image } from "./Image";
import { Rank } from "./Rank";
import { fontStyles } from "./GoogleFonts";

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
      className="flex items-center justify-between gap-4"
      style={{ opacity: opacity, transform: `translateY(${translate}px)` }}
    >
      <div className="flex items-center gap-3">
        <Rank rank={product.rank} />
        <Image src={product.thumbnail} className="h-14 w-14 rounded-lg" />

        <div>
          <h2
            className="line-clamp-2 text-3xl leading-8 font-medium text-gray-800"
            style={fontStyles.productName}
          >
            {product.name}
          </h2>
          <h3
            className="line-clamp-2 text-2xl leading-7 text-gray-700"
            style={fontStyles.productTagline}
          >
            {product.tagline}
          </h3>
        </div>
      </div>
      <div className="flex flex-col rounded border-2 border-gray-200 px-2 py-1 text-center text-gray-800">
        <p className="text-xl font-semibold">▲</p>
        <p className="text-xl font-semibold">{product.votesCount}</p>
      </div>
    </div>
  );
};
