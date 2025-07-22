const RANK_TO_COLOR = {
  1: {
    color: "#fff1b5",
    backgroundColor: "#e3c000",
  },
  2: {
    color: "#efefef",
    backgroundColor: "#b6b6b6",
  },
  3: {
    color: "#ffc179",
    backgroundColor: "#bd6e3c",
  },
  4: {
    color: "#ffc179",
    backgroundColor: "#bd6e3c",
  },
  5: {
    color: "#ffc179",
    backgroundColor: "#bd6e3c",
  },
};

export const Rank = ({ rank }) => {
  if (!Number.isInteger(rank) || rank > 5 || rank < 1) return null;

  return (
    <div
      className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full"
      style={{ ...RANK_TO_COLOR[rank] }}
    >
      <p className="text-4xl font-bold">{rank}</p>
    </div>
  );
};
