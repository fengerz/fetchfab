import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

export interface ICollection {
  id: number;
  title: string;
  description: string;
  slug: string;
  user: IUser;
  created_at: string;
  updated_at: string;
  products_count: number;
  poster_products: IProduct[];
  has_product?: boolean;
}
