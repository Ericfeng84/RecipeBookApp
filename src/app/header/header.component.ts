import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../recipes/recipes.service';
import {DataStorageService} from '../shared/data-storage.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private recipeService: RecipeService, private dataStorageService: DataStorageService) { }

  // onSave(){
  //
  //   this.dataStorageService.storeData().subscribe(
  //     data => {
  //       console.log(data);
  //     }
  //   );
  // }

  onGet() {
    // this.dataStorageService.getData();
  }
  ngOnInit() {
  }
}
