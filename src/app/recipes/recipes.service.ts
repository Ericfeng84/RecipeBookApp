import {Recipe} from './recipe-model';
import {EventEmitter} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

export class RecipeService{

  // @ts-ignore
  private recipes: Recipe[] = [
    new Recipe('Apple Honey Glazed Chicken',
      'This is my favorite chicken recipe. Everyone in my family loves this recipe and it is super easy',
      'https://images.media-allrecipes.com/userphotos/720x405/5511701.jpg',
      [new Ingredient('meat', 5),
                          new Ingredient('apple', 7)
      ]),
    new Recipe('Chicken Honey Nut Stir Fry',
      'This is my favorite chicken recipe. Everyone in my family loves this recipe and it is super easy',
      'https://cdn.pixabay.com/photo/2015/10/26/07/21/soup-1006694_960_720.jpg',
      [new Ingredient('fish', 5),
        new Ingredient('tomato', 7)]),
  ];
  selectRecipe = new EventEmitter<Recipe>();

  getRecipe() {
    return this.recipes.slice();
  }

}