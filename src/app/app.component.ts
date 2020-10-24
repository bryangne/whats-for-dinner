import { Component } from '@angular/core';
import { GroceriesService } from './shopping-list/groceries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'whats-for-dinner';
  constructor() { }
}
