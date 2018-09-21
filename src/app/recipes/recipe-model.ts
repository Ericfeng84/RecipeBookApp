import {Ingredient} from '../shared/ingredient.model';

export class Recipe {
  public _id: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public recipeIngredients: Ingredient[];

  constructor (_id: string, name: string, des: string, imagePath: string, recipeIngredients: Ingredient[]) {
    this._id = _id;
    this.name = name;
    this.description = des;
    this.imagePath = imagePath;
    this.recipeIngredients = recipeIngredients;
  }

}
