import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameinput') nameInput: ElementRef;
  @ViewChild('numberinput') numberInput: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  addList() {
    this.shoppingListService.addIngItem(new Ingredient(this.nameInput.nativeElement.value, this.numberInput.nativeElement.value));
    console.log(this.shoppingListService.getIngredients())
  }
}
