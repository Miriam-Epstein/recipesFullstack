
export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  name: string;
  description: string;
  image: string;
  level: string;
  time: string;
  type: string;
  ingredients: Ingredient[];
  _id?: string;
  userId?: string;
}



