import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private subsription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subsription = this.shoppingListService.ingredientChange.subscribe(
      (ingredients: Ingredient[]) => {this.ingredients = ingredients; }
    );
  }

  ngOnDestroy() {
    this.subsription.unsubscribe();
  }

  editItem(i: number) {
    this.shoppingListService.editItemIndex.next(i);
  }
}

