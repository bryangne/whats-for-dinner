import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GroceriesService } from '../shopping-list/groceries.service';
import { Item } from '../shopping-list/item.model';


@Component({
  selector: 'app-grocery-results',
  templateUrl: './grocery-results.component.html',
  styleUrls: ['./grocery-results.component.sass']
})
export class GroceryResultsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,
    private groceriesService: GroceriesService) { }
  private api_url = environment.edamamAPI;
  searchQuery: string
  results: any
  nextPage: string
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.searchQuery = params.get('item')
    })
    // console.log(this.searchQuery)
    const api_query = this.api_url + '/search/ingredients/' + this.searchQuery
    this.http.get<any>(api_query).subscribe(data => {
      this.results = data.hints
      if(data._links) {
        this.nextPage = data._links.next.href
      }
      console.log(this.results)
    })
  }

  onAdd(newItem: any) {
    // TODO: make a modal to input amount of groceries to be added
    const item: Item = {name: newItem.food.label, foodId: newItem.food.foodId, nutrients: newItem.food.nutrients, amount: 1}
    if(newItem.food.image) {
      item.imageURL = newItem.food.image
    }
    // console.log(item)
    this.groceriesService.addGrocery(item)
  }

}
