import { Gif } from "@remotion/gif";
import { Img, OffthreadVideo } from "remotion";

export const Image = ({ src, ...other }) => {
  // Handle GIF files
  if (src.includes(".gif")) {
    return <Gif src={src} {...other} />;
  }

  // Handle video files with OffthreadVideo for better performance
  if (src.includes(".mp4") || src.includes(".webm") || src.includes(".mov")) {
    return <OffthreadVideo src={src} {...other} />;
  }

  // Handle regular images
  return <Img src={src} {...other} />;
};
