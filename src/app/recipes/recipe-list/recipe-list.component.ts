import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe-model';
import {RecipeService} from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // @ts-ignore
  recipes: Recipe[] = [];


  constructor(private recipesService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipe();
    this.recipesService.receipesChange.subscribe((data:Recipe[]) => this.recipes = data)
  }



}
