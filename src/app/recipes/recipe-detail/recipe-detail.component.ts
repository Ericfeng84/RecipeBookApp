import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe-model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {RecipeService} from '../recipes.service';
import {ActivatedRoute, Params, Router, Routes} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  chooseRecipe: Recipe;
  constructor(private recipeService: RecipeService,
                private routes: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.routes.params.subscribe(
      (params: Params) => {
        this.chooseRecipe = this.recipeService.getRecipeItem(params['name']);
      }
    );
  }
  addShoppingList() {
    this.recipeService.addItems(this.chooseRecipe.recipeIngredients);
  }

  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.routes});
    console.log('edit');
  }
}
