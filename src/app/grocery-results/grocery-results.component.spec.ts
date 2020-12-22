import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryResultsComponent } from './grocery-results.component';

describe('GroceryResultsComponent', () => {
  let component: GroceryResultsComponent;
  let fixture: ComponentFixture<GroceryResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
