import { interpolate, useCurrentFrame } from "remotion";

import { Image } from "./Image";
import { ImagesCarousel } from "./ImagesCarousel";
import { Rank } from "./Rank";
import { fontStyles } from "./GoogleFonts";

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
      <div className="mb-6 flex items-center justify-between gap-8">
        <div className="flex flex-grow items-center gap-8 overflow-hidden">
          <Image src={thumbnail} className="h-40 w-40 rounded-2xl" />
          <div className="flex-grow">
            <h2
              className="mb-2 line-clamp-2 text-6xl leading-tight font-medium text-gray-800"
              style={fontStyles.productName}
            >
              {name}
            </h2>
            <div className="overflow-fadeout-right flex items-center gap-2">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="box-border flex-shrink-0 rounded-lg border-2 border-gray-400 bg-gray-50 px-4 py-2 text-2xl text-gray-500"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <Rank rank={rank} />
          <div className="flex gap-4 rounded-lg border-4 border-[#db4200] bg-[#f64900] px-4 py-2 text-center text-white">
            <p className="text-4xl font-semibold">▲</p>
            <p className="text-4xl font-semibold">{votesCount}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p
          className="line-clamp-3 text-4xl leading-normal text-gray-700"
          style={fontStyles.body}
        >
          {description}
        </p>
      </div>

      <ImagesCarousel images={images} />
    </div>
  );
};
