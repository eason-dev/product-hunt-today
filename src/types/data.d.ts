declare module "*/today.json" {
  interface Product {
    name: string;
    tagline: string;
    description: string;
    url: string;
    rank: number;
    thumbnail: string;
    votesCount: number;
    user: {
      name: string;
      profileImage: any;
    };
    images: string[];
    topics: string[];
  }

  interface Data {
    date: string;
    products: Product[];
    isMiddayPost?: boolean;
  }

  const data: Data;
  export default data;
}
