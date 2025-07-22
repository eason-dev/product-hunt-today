import { formatInTimeZone } from "date-fns-tz";
import { noise2D } from "@remotion/noise";
import { useCurrentFrame } from "remotion";
import { fontStyles } from "./GoogleFonts";

export const BaseBackground = ({ date, isMiddayPost = false }) => {
  const frame = useCurrentFrame();

  // Create subtle noise texture
  const createNoiseGradient = () => {
    const gradientStops = [];

    for (let i = 0; i <= 100; i += 10) {
      const noiseValue = noise2D("seed", i, frame * 0.01) * 0.12; // Balanced noise animation
      const lightness = 0.5 + noiseValue;
      gradientStops.push(
        `hsl(${isMiddayPost ? 6 : 16}, ${isMiddayPost ? 74 : 62}%, ${lightness * 100}%) ${i}%`,
      );
    }

    return `linear-gradient(135deg, ${gradientStops.join(", ")})`;
  };

  return (
    <div
      className="relative h-full w-full p-16"
      style={{ background: createNoiseGradient() }}
    >
      <div className="relative flex h-full w-full flex-col rounded-2xl bg-white p-8">
        <h1
          className="text-center text-6xl font-bold"
          style={{
            color: isMiddayPost ? "#e74c3c" : "#da5630",
            ...fontStyles.heading,
            lineHeight: 1.2,
          }}
        >
          {isMiddayPost
            ? "What's Hot on Product Hunt Now"
            : "Top 5 on Product Hunt yesterday"}
        </h1>
        <h2
          className="text-center text-5xl text-gray-400"
          style={fontStyles.body}
        >
          {formatInTimeZone(
            new Date(date),
            "America/Los_Angeles",
            "MMMM d, yyyy",
          )}
        </h2>
      </div>
      <span
        className="fixed right-16 bottom-2 float-right text-4xl font-light text-white"
        style={fontStyles.body}
      >
        @ProductHunToday
      </span>
    </div>
  );
};
