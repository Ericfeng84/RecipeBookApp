import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe-model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {RecipeService} from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() chooseRecipe: Recipe;
  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
  }
  addShoppingList(){
    this.recipeService.addItems(this.chooseRecipe.recipeIngredients);
  }
}
