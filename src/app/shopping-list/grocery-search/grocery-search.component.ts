import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-grocery-search',
  templateUrl: './grocery-search.component.html',
  styleUrls: ['./grocery-search.component.sass']
})
export class GrocerySearchComponent implements OnInit {
  private api_url = environment.edamamAPI;
  searchList: string[]
  search: string;
  searchForm = new FormGroup({
    searchText: new FormControl('')
  })
  timeout: any = null

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    
  }

  onSubmit() {
    this.router.navigate(['/search/groceries/' + this.search])
  }

  onKeySearch(event: any) {
    // Show 'Searching...' while the user is typing
    this.searchList = ['Searching...']
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      // if the search box is empty don't send the autocomplete request
      // and clear the autocomplete
      if (event.target.value) {
        // console.log('search for: '+this.search)
        const api_query = this.api_url + "/search/autocomplete/" + this.search;
      this.http.get<string[]>(api_query).subscribe(data => {
        this.searchList = data
        // console.log(this.searchList)
      })
      } else {
        this.searchList = []
      }
    }, 500)
  }



}
