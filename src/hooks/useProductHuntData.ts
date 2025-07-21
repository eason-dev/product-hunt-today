export default function useProductHuntData() {
  // Use environment variable to determine if this is a midday post
  const isMiddayPost = process.env.MIDDAY_POST === "true";
  
  // Import the correct data file
  let data: {
    date: string;
    products: any[];
    isMiddayPost?: boolean;
  };

  if (isMiddayPost) {
    data = require("../../data/midday.json");
  } else {
    data = require("../../data/today.json");
  }

  const { products, date } = data;
  // Use the environment variable to determine isMiddayPost, not the data file
  return { products, date, isMiddayPost };
}
