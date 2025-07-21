import { Composition } from "remotion";

import { ProductHuntToday } from "./ProductHuntToday";

export const RemotionVideo = () => {
  return (
    <>
      <Composition
        id="ProductHuntToday"
        component={ProductHuntToday}
        durationInFrames={1050}
        fps={30}
        width={720}
        height={720}
      />
    </>
  );
};
