import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroceryBackendService {
  private api_url = environment.edamamAPI;
  constructor(private http: HttpClient) { }
  autocomplete(query: string) {
    const api_query = this.api_url + "/search/autocomplete/" + query;
    return new Promise<any>((resolve, reject) => {
      this.http.get(api_query)
    })
  }
}
