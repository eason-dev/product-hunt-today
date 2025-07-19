import { Gif } from "@remotion/gif";
import { Img } from "remotion";

export const Image = ({ src, ...other }) => {
  if (src.includes(".gif")) {
    return <Gif src={src} {...other} />;
  }

  return <Img src={src} {...other} />;
};
