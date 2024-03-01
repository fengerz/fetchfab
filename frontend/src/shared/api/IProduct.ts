import { ICategory } from "./ICategory";
import { IUser } from "./IUser";

export interface IProduct {
  category: ICategory;
  comments_count?: number;
  created_at: string;
  description: string;
  downloads_count?: number;
  id: number;
  is_liked?: boolean;
  likes_count?: number;
  slug: string;
  tags: string;
  title: string;
  updated_at: string;
  user: IUser;
  views_count?: number;
  poster?: string;
  "3d_model"?: string;
}
