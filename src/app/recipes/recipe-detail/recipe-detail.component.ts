import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe-model';
import {RecipeService} from '../recipes.service';
import {ActivatedRoute, Params, Router, Routes} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  chooseRecipe: Recipe;
  recipeIndex: number;
  constructor(private recipeService: RecipeService,
                private routes: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.routes.params.subscribe(
      (params: Params) => {
        this.chooseRecipe = this.recipeService.getRecipeItem(+params['id']);
        this.recipeIndex = +params['id'];
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

  delRecipe() {
    this.recipeService.delRecipe(this.recipeIndex);
    this.router.navigate(['/']);
  }
}
