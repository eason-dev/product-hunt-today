import dataFile from "../../data/today.json";

// Type assertion to handle optional isMiddayPost
const data = dataFile as {
  date: string;
  products: any[];
  isMiddayPost?: boolean;
};

export default function useProductHuntData() {
  const { products, date, isMiddayPost = false } = data;
  return { products, date, isMiddayPost };
}
