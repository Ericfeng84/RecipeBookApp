import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slform: NgForm;
  editItemIndex: number;
  editMode = false;
  subscription: Subscription;
  editItem: {name: string, amount: number};

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.editItemIndex.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editItem = this.shoppingListService.getIngIndex(index);
        this.slform.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
        console.log(this.slform);
    }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addList(f: NgForm) {
    const values = f.value;
    const newIngredient = new Ingredient(values.name, values.amount);
    if (this.editMode) {
      this.shoppingListService.updateIng(this.editItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngItem(newIngredient);
    }
    this.editMode = false;
    f.resetForm();
  }

  onClear() {
    this.slform.resetForm();
    this.editMode = false;
  }

  onDel() {
    this.shoppingListService.delIng(this.editItemIndex);
    this.slform.resetForm();
    this.editMode = false;
  }
}
