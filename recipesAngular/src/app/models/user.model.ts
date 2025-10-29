
export interface User {
  userName: string;
  password: string;
  address: string;
  phone: string;
  isAdmin: boolean;
  favoriteRecipes: string[];
  _id?: string;
}
