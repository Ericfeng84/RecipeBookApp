import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipes.service';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipes/recipe-model';

@Injectable()
export class DataStorageService {
 constructor(private receiptService: RecipeService, private http: HttpClient) {}

 // createData(recipe: Recipe) {
 //   return this.http.post('http://localhost:8000/recipes', recipe,{responseType: 'json'} )
 // }

 getData() {
   this.http.get('http://localhost:8000/recipes').subscribe((data: Recipe[]) => {
     this.receiptService.setRecipe(data);
   });
 }
 getRecipe(id: string) {
    const urls = 'http://localhost:8000/recipes/' + id;
    return this.http.get(urls)
  }

  delRecipe(id: string) {
    const urls = 'http://localhost:8000/recipes/' + id;
    return this.http.delete(urls);
  }
  
  updateRecipe(id: string, recipe: Recipe) {
    const urls = 'http://localhost:8000/recipes/' + id;
    return this.http.post(urls, recipe);
  }
}
