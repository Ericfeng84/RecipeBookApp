import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router, Routes} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipes.service';
import {DataStorageService} from '../../shared/data-storage.service';
import {Recipe} from '../recipe-model';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  index: string;
  editMode = false;
  recipe: Recipe;
  recipeForm: FormGroup;


  constructor(private routes: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.routes.params.subscribe(
      (params: Params) => {
        this.index = params['id'];
        this.editMode = params['id'] != null;
        this.formInit();
      }
    );
  }

  formInit() {
    // let recipeId = '';
    let recipeName = '';
    let recipeImageURL = '';
    let recipeDec = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.recipe = this.recipeService.chooseRecipe;
      console.log(this.recipe);
      // recipeId = recipe._id;
      recipeName = this.recipe.name;
      recipeImageURL = this.recipe.imagePath;
      recipeDec = this.recipe.description;
      if (this.recipe.recipeIngredients) {
        for (const ingredient of this.recipe.recipeIngredients) {
          // @ts-ignore
          recipeIngredients.push(
            new FormGroup(
              {
                           'name': new FormControl(ingredient.name, Validators.required),
                            'amount': new FormControl(ingredient.amount,
                              [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }

    this.recipeForm = new  FormGroup({
      // '_id': new FormControl(recipeId),
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDec, Validators.required),
      'imagePath': new FormControl(recipeImageURL, Validators.required),
      'recipeIngredients': recipeIngredients
    });

    }
  onSubmit() {
    if (this.editMode) {
      this.recipe.name = this.recipeForm.value.name;
      this.recipe.description = this.recipeForm.value.description;
      this.recipe.imagePath = this.recipeForm.value.imagePath;
      this.recipe.recipeIngredients = this.recipeForm.value.recipeIngredients;

      this.recipeService.updateRecipe(this.index, this.recipe).subscribe(
        () => {this.recipeService.updateLocalRecipes(this.recipe);
        this.recipeService.chooseRecipeUpdate( this.recipeForm.value); }
      );
    } else {
      console.log("add new")
      this.recipeService.addNewRecipe(this.recipeForm.value).subscribe(
        (data: Recipe) => {
          console.log(data);
          this.recipeService.recipes.push(data)});
    }
    this.onCancel();
  }

  addIngredient() {
    console.log('next');
    (<FormArray>this.recipeForm.get('recipeIngredients')).push(new FormGroup(
      {'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null,
                  [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }) );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.routes});
  }

  delIngredient(index: number) {
    (<FormArray>this.recipeForm.get('recipeIngredients')).removeAt(index);
  }


}
