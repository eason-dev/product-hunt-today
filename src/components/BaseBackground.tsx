import { formatInTimeZone } from "date-fns-tz";

export const BaseBackground = ({ date }) => {
  return (
    <div className="relative h-full w-full p-8">
      <div className="relative flex h-full w-full flex-col rounded-xl bg-white p-4">
        <h1
          className="text-center text-4xl font-bold"
          style={{ color: "#da5630" }}
        >
          Top 5 on Product Hunt yesterday
        </h1>
        <h2 className="text-center text-2xl text-gray-400">
          {formatInTimeZone(
            new Date(date),
            "America/Los_Angeles",
            "MMMM d, yyyy",
          )}
        </h2>
      </div>
      <span className="fixed right-8 bottom-1 float-right text-xl font-light text-white">
        @ProductHunToday
      </span>
    </div>
  );
};
