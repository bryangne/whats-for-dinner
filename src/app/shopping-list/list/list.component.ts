import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../item.model';
import { GroceriesService } from '../groceries.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditModalComponent } from '../add-edit-modal/add-edit-modal.component';
import { AuthService } from 'src/app/authentication/auth.service';
import { Router } from '@angular/router';

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
  // tslint:disable-next-line: max-line-length
  constructor(private groceriesService: GroceriesService, private authService: AuthService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    // subscribe to the grocery items only when the grocery service connects with the database
    this.subscribeToGroceryList()
  }

  async subscribeToGroceryList() {
    // if the groceries service has not yet connected to the database, do so
    console.log('no grocery list yet')
    await this.groceriesService.subscribeAfterAuth()
    this.itemSub = this.groceriesService.itemsChanged.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );
  }

  ngOnDestroy() {
    // only unsubscribe when the grocery subscription has been made successfully
    if (this.groceriesService.grocerySubscription) {
      this.itemSub.unsubscribe();
    }
  }

  // opens up the modal component
  // TODO: close the modal after adding or editing a grocery
  openAddEditModal(): void {
    const dialogRef = this.dialog.open(AddEditModalComponent, {
      // width: '250px',
      data: { addMode: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
    });
  }

  logout() {
    // only unsubscribe when the grocery subscription has been made successfully
    if (this.groceriesService.grocerySubscription) {
      this.itemSub.unsubscribe()
    }
    // clear out the grocery service db sub before logging out
    this.groceriesService.clearSubOnLogout()
    // log out of the auth service and navigate user to the login page
    this.authService.logout().then(res => {
      this.router.navigate(['login'])
    }, err => {
      console.log(err)
    })
  }

}
