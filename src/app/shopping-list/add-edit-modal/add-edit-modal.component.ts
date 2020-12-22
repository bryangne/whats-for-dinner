import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroceriesService } from '../groceries.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.css']
})

export class AddEditModalComponent implements OnInit {
  addMode = true;
  name: string;
  details: string;
  amount: number;
  id?: string;
  modalForm = new FormGroup({
    nameText: new FormControl('', Validators.required),
    descText: new FormControl('', Validators.required),
    amountNum: new FormControl('', [Validators.required, Validators.min(1)]),
  });
  constructor(private groceriesService: GroceriesService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.addMode = data.addMode;
    if(!this.addMode) {
      this.name = data.item.name;
      this.details = data.item.details;
      this.amount = data.item.amount;
      this.id = data.item.id;
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // cast item into any so that id can be added simply by setting item.id
    const item: any = {name: this.name, details: this.details, amount: this.amount};
    if (this.addMode) {
      this.groceriesService.addGrocery(item).then(res => {
        // Do something after adding a grocery if necessary
      });
    } else if (!this.addMode) {
      item.id = this.id;
      this.groceriesService.updateGrocery(item).then(res => { });
    }
  }

}
