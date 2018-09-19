import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router, Routes} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipes.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  index: number;
  editMode = false;
  recipeForm: FormGroup;


  constructor(private routes: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.routes.params.subscribe(
      (params: Params) => {
        this.index = +params['id'];
        this.editMode = params['id'] != null;
        this.formInit();
      }
    );
  }

  formInit() {
    let recipeName = '';
    let recipeImageURL = '';
    let recipeDec = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeItem(this.index);
      recipeName = recipe.name;
      recipeImageURL = recipe.imagePath;
      recipeDec = recipe.description;
      if (recipe.recipeIngredients) {
        for (const ingredient of recipe.recipeIngredients) {
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
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDec, Validators.required),
      'imagePath': new FormControl(recipeImageURL, Validators.required),
      'recipeIngredients': recipeIngredients
    });

    }
  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.index, this.recipeForm.value);
    } else {
      this.recipeService.addNewRecipe(this.recipeForm.value);
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
