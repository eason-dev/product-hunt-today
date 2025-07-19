import data from "../../data/today.json";

export default function useProductHuntData() {
  const { products, date } = data;
  return { products, date };
}
