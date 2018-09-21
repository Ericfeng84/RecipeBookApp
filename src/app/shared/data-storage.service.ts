import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipes.service';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipes/recipe-model';

@Injectable()
export class DataStorageService{
 constructor(private receiptService: RecipeService, private http: HttpClient){}

 storeData() {
   console.log(this.receiptService.getRecipe());
   return this.http.post('http://localhost:8000/recipes', this.receiptService.getRecipe(),{responseType: 'json'} )
 }

 getData() {
   this.http.get('http://localhost:8000/recipes').subscribe((data: Recipe[]) => {
     this.receiptService.setRecipe(data);
   });
 }
}
