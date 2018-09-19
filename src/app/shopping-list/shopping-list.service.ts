import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';


export class ShoppingListService {
  private ingredients: Ingredient[] = [];
  editItemIndex = new Subject<number>();
  ingredientChange = new Subject<Ingredient[]>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngItem(addItem: Ingredient) {
    this.ingredients.push(addItem);
    this.ingredientChange.next(this.ingredients);
  }

  addIngItems(addItem: Ingredient[]) {
    this.ingredients.push(...addItem);
    this.ingredientChange.next(this.ingredients);
  }

  getIngIndex(index: number) {
    return this.ingredients[index];
  }

  updateIng(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChange.next(this.ingredients);
  }

  delIng(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChange.next(this.ingredients);
  }
}
