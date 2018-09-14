import {Component, OnInit, Input} from '@angular/core';
import {Recipe} from '../../recipe-model';
import {RecipeService} from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeItem: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  selectRecipeDetail(){
    this.recipeService.selectRecipe.emit(this.recipeItem);
  }
}
