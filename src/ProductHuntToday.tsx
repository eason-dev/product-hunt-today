import { Sequence, useVideoConfig } from "remotion";

import { BaseBackground } from "./components/BaseBackground";
import { ContentWrapper } from "./components/ContentWrapper";
import { ProductDetail } from "./components/ProductDetail";
import { ProductList } from "./components/ProductList";
import useProductHuntData from "./hooks/useProductHuntData";

export const ProductHuntToday = () => {
  const videoConfig = useVideoConfig();
  const { products, date, isMiddayPost } = useProductHuntData();

  return (
    <div
      style={{
        flex: 1,
        background: "linear-gradient(135deg, #da5630 0%, #e91e63 100%)",
      }}
    >
      {/* Background */}
      <Sequence from={0} durationInFrames={videoConfig.durationInFrames}>
        <BaseBackground date={date} isMiddayPost={isMiddayPost} />
      </Sequence>

      {/* ProductList */}
      <Sequence from={0} durationInFrames={150} name="ProductList">
        <ContentWrapper>
          <ProductList products={products} />
        </ContentWrapper>
      </Sequence>

      {/* ProductDetails */}
      {products.map((product, index) => (
        <Sequence
          from={150 + index * 180}
          durationInFrames={180}
          name={product.name}
          key={product.rank}
        >
          <ContentWrapper>
            <ProductDetail product={product} />
          </ContentWrapper>
        </Sequence>
      ))}
    </div>
  );
};
