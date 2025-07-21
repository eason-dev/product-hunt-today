import { formatInTimeZone } from "date-fns-tz";

export const BaseBackground = ({ date, isMiddayPost = false }) => {
  return (
    <div className="relative h-full w-full p-6">
      <div
        className="relative flex h-full w-full flex-col rounded-2xl p-8"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
        }}
      >
        <h1
          className="mt-4 text-center text-5xl font-bold"
          style={{
            background: "linear-gradient(135deg, #da5630 0%, #e91e63 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {isMiddayPost
            ? "Top 5 Trending Now"
            : "Top 5 on Product Hunt yesterday"}
        </h1>
        <h2 className="mt-2 text-center text-3xl text-gray-400">
          {formatInTimeZone(
            new Date(date),
            "America/Los_Angeles",
            "MMMM d, yyyy",
          )}
        </h2>
      </div>
      <span className="fixed right-6 bottom-4 float-right text-2xl font-light text-white">
        @ProductHunToday
      </span>
    </div>
  );
};
