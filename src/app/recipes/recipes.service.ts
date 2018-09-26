import {Recipe} from './recipe-model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';
import {HttpClient} from '../../../node_modules/@angular/common/http';

@Injectable()
export class RecipeService {

  // @ts-ignore
  recipes: Recipe[] = [];
  receipesChange = new Subject<Recipe[]>();
  chooseRecipe: Recipe;

  constructor(private shoppingListService: ShoppingListService, private http: HttpClient) {}
  getRecipe() {
    return this.http.get('http://localhost:8000/recipes');
  }

  getRecipeItem() {
    return this.chooseRecipe;
  }

  addItems(ingredients: Ingredient[]) {
    this.shoppingListService.addIngItems(ingredients);
  }

  addNewRecipe(recipe: Recipe) {
    console.log(recipe)
    return this.http.post('http://localhost:8000/recipes', recipe);
  }

  setRecipe(recipe: Recipe[]) {
    this.recipes = recipe;
    this.receipesChange.next(recipe);
  }

  updateRecipe(index: string, updateRecipe: Recipe) {
    const urls = 'http://localhost:8000/recipes/' + index;
    return this.http.put(urls, updateRecipe);
  }


  chooseRecipeUpdate(recipe: Recipe){
    this.chooseRecipe = recipe
  }

  updateLocalRecipes(recipe: Recipe){
    const pos = this.recipes.map(elem => elem._id).indexOf(recipe._id);
    this.recipes[pos] = recipe;
  }

  delLocalRecipe(recipe: Recipe){
    const pos = this.recipes.map(elem => elem._id).indexOf(recipe._id);
    this.recipes.splice(pos,1);
    console.log(this.recipes)
  }

  delRecipe(id: string) {
    const urls = 'http://localhost:8000/recipes/' + id;
    console.log(urls);
    return this.http.delete(urls);
  }

}
