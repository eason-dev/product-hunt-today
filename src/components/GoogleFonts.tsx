import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily: interFont } = loadFont();

export const fonts = {
  inter: interFont,
  heading: interFont,
  body: interFont,
};

export const fontStyles = {
  heading: {
    fontFamily: fonts.heading,
    fontWeight: 700,
  },
  body: {
    fontFamily: fonts.body,
    fontWeight: 400,
  },
  productName: {
    fontFamily: fonts.heading,
    fontWeight: 600,
  },
  productTagline: {
    fontFamily: fonts.body,
    fontWeight: 400,
  },
};
