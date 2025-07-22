import { formatInTimeZone } from "date-fns-tz";
import { noise2D } from "@remotion/noise";
import { useCurrentFrame } from "remotion";
import { fontStyles } from "./GoogleFonts";

export const EnhancedBaseBackground = ({ date, isMiddayPost = false }) => {
  const frame = useCurrentFrame();

  // Create subtle noise texture
  const createNoiseGradient = () => {
    const gradientStops = [];

    for (let i = 0; i <= 100; i += 10) {
      const noiseValue = noise2D("seed", i, frame * 0.01) * 0.1;
      const lightness = 0.5 + noiseValue;
      gradientStops.push(
        `hsl(${isMiddayPost ? 13 : 16}, 62%, ${lightness * 100}%) ${i}%`,
      );
    }

    return `linear-gradient(135deg, ${gradientStops.join(", ")})`;
  };

  return (
    <div
      className="relative h-full w-full p-8"
      style={{ background: createNoiseGradient() }}
    >
      <div className="relative flex h-full w-full flex-col rounded-xl bg-white p-4">
        <h1
          className="text-center text-4xl font-bold"
          style={{
            color: isMiddayPost ? "#cc4125" : "#da5630",
            ...fontStyles.heading,
          }}
        >
          {isMiddayPost
            ? "Top 5 Trending on Product Hunt Now"
            : "Top 5 on Product Hunt yesterday"}
        </h1>
        <h2
          className="text-center text-2xl text-gray-400"
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
        className="fixed right-8 bottom-1 float-right text-xl font-light text-white"
        style={fontStyles.body}
      >
        @ProductHunToday
      </span>
    </div>
  );
};
