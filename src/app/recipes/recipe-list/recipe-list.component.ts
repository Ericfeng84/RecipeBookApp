import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe-model';
import {RecipeService} from '../recipes.service';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // @ts-ignore
  recipes: Recipe[] = [];
  isLoading = true;


  constructor(private recipesService: RecipeService) { }

  ngOnInit() {
    this.getRecipe()
    // this.recipesService.receipesChange.subscribe((data: Recipe[]) => this.recipes = data)
  }

  getRecipe() {
    this.recipesService.getRecipe().subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
        this.recipesService.setRecipe(data);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }



}
