import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddEditModalComponent } from '../add-edit-modal/add-edit-modal.component';
import { GroceriesService } from '../groceries.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() item: Item
  constructor(public dialog: MatDialog, private groceriesService: GroceriesService) { }

  ngOnInit(): void {
  }

  onEdit() {
    const dialogRef = this.dialog.open(AddEditModalComponent, {
      // width: '250px',
      data: {addMode: false, item: this.item}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed')
    })
  }

  onDelete() {
    this.groceriesService.deleteGrocery(this.item.id).then(res => { });
  }

}
