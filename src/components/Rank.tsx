import { spring, useCurrentFrame, useVideoConfig } from "remotion";

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

export const Rank = ({ rank, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame: frame - delay,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 0.5,
    },
  });
  if (!Number.isInteger(rank) || rank > 5 || rank < 1) return null;

  return (
    <div
      className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
      style={{
        ...RANK_TO_COLOR[rank],
        transform: `scale(${scale})`,
        boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.15)",
      }}
    >
      <p className="text-3xl font-bold">{rank}</p>
    </div>
  );
};
