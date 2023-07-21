import { IIngredient } from "./IIngredient";

export interface IRecipe {
    id?: string;
    name: string;
    description: string;
    ingredients: IIngredient[];
}