import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { ProductListProduct } from "./ProductListProduct";

export const ProductList = ({ products }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  const opacity = interpolate(
    frame,
    [videoConfig.durationInFrames - 8, videoConfig.durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <div
      className="flex h-full flex-col justify-between"
      style={{ opacity: opacity }}
    >
      {products.map((product, index) => (
        <ProductListProduct
          key={product.name}
          product={product}
          transitionStart={index * 10}
        />
      ))}
    </div>
  );
};
