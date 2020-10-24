import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../item.model';
import { GroceriesService } from '../groceries.service';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddEditModalComponent } from '../add-edit-modal/add-edit-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

// export interface dialogData {
//   item?: Item

// }

export class ListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  private itemSub: Subscription;
  constructor(private groceriesService: GroceriesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.groceriesService.getGroceries();
    this.itemSub = this.groceriesService.itemsChanged.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );
  }

  ngOnDestroy() {
    this.itemSub.unsubscribe();
  }

  openAddEditModal(): void {
    const dialogRef = this.dialog.open(AddEditModalComponent, {
      // width: '250px',
      data: {addMode: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
    });
  }

}
