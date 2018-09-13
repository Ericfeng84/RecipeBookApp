import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';


export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 30),
    new Ingredient('Orange', 30),
  ];
  ingredientChange = new EventEmitter<Ingredient[]>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngItem(addItem: Ingredient) {
    this.ingredients.push(addItem);
    this.ingredientChange.emit(this.ingredients);
  }

  addIngItems(addItem: Ingredient[]) {
    this.ingredients.push(...addItem);
    this.ingredientChange.emit(this.ingredients);
  }
}
