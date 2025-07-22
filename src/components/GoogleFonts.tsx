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
    fontWeight: 800, // Extra bold for main headings
    letterSpacing: "-0.02em", // Tighter letter spacing
  },
  body: {
    fontFamily: fonts.body,
    fontWeight: 400,
    letterSpacing: "-0.01em",
  },
  productName: {
    fontFamily: fonts.heading,
    fontWeight: 700, // Bold for product names
    letterSpacing: "-0.015em",
  },
  productTagline: {
    fontFamily: fonts.body,
    fontWeight: 300, // Light for taglines
    letterSpacing: "0",
  },
};
