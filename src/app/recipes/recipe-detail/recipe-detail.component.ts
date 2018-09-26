import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe-model';
import {RecipeService} from '../recipes.service';
import {ActivatedRoute, Params, Router, Routes} from '@angular/router';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  chooseRecipe: Recipe;
  recipeIndex: string;
  constructor(private recipeService: RecipeService,
                private routes: ActivatedRoute,
              private router: Router,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.routes.params.subscribe((params: Params) => {
      this.chooseRecipe = this.recipeService.chooseRecipe;
    });


   this.recipeIndex = this.chooseRecipe._id;
      }

  addShoppingList() {
    this.recipeService.addItems(this.chooseRecipe.recipeIngredients);
  }

  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.routes});
    console.log('edit');
  }

  delRecipe() {
    this.recipeService.delRecipe(this.recipeIndex).subscribe((data: string) => {
      console.log(data);
      this.recipeService.delLocalRecipe(this.chooseRecipe)});
    this.router.navigate(['/']);
  }
 }
