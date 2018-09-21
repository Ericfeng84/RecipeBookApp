import {Recipe} from './recipe-model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {

  // @ts-ignore
  private recipes: Recipe[] = [];
  receipesChange = new Subject<Recipe[]>();
  //   new Recipe('Apple Honey Glazed Chicken',
  //     'This is my favorite chicken recipe. Everyone in my family loves this recipe and it is super easy',
  //     'https://images.media-allrecipes.com/userphotos/720x405/5511701.jpg',
  //     [new Ingredient('meat', 5),
  //                         new Ingredient('apple', 7)
  //     ]),
  //   new Recipe('Chicken Honey Nut Stir Fry',
  //     'This is my favorite chicken recipe. Everyone in my family loves this recipe and it is super easy',
  //     'https://cdn.pixabay.com/photo/2015/10/26/07/21/soup-1006694_960_720.jpg',
  //     [new Ingredient('fish', 5),
  //       new Ingredient('tomato', 7)]),
  // ];
  constructor(private shoppingListService: ShoppingListService) {}
  getRecipe() {
    return this.recipes;
  }

  getRecipeItem(index: number) {
    return this.recipes[index];
  }

  addItems(ingredients: Ingredient[]) {
    this.shoppingListService.addIngItems(ingredients);
  }

  addNewRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  setRecipe(recipe: Recipe[]) {
    this.recipes = recipe;
    this.receipesChange.next(recipe);
  }

  updateRecipe(index: number, updateRecipe: Recipe) {
    this.recipes[index] = updateRecipe;

  }

  delRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

}
