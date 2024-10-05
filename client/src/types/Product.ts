type Product = {
  _id: string;
  name: string;
  bakery: string;
  price: string;
  description: string;
  image?: { name: string; base: string }[];
  ingredients?: string[];
  nutrition?: {
    calories: string;
    fats: string;
    carbs: string;
    protiens: string;
  };
  reviews: string[];
};

export default Product;
