import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  // tslint:disable-next-line: max-line-length
  items: Item[] = [];
  grocerySubscription: Subscription
  itemsChanged = new Subject<Item[]>();

  constructor(private firestore: AngularFirestore, private authService: AuthService) { 
    console.log('grocery service created')
  }

  // call this function if the grocery subscription doesn't exist yet
  subscribeAfterAuth() {
    const uid = this.authService.getID()
    console.log(uid)
    // console.log('subscribing to grocery list')
    this.grocerySubscription = this.firestore.collection('users').doc(uid)
      .collection('groceries').snapshotChanges().subscribe(res => {
        // console.log('getting grocery list')
        this.items = [];
        res.forEach(databaseItem => {
          const item: any = databaseItem.payload.doc.data();
          item.id = databaseItem.payload.doc.id;
          this.items.push(item);
        });
        console.log(this.items)
        this.itemsChanged.next([...this.items]);
      }, err => console.log(err));
  }

  // clear out the subscription before logging out
  clearSubOnLogout() {
    this.grocerySubscription.unsubscribe()
  }

  getGroceriesUpdated() {
    return [...this.items];
  }

  addGrocery(item: Item) {
    const uid = this.authService.getID()
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('users').doc(uid)
        .collection('groceries').add(item).then(res => {
          console.log(res);
        }, err => reject(err));
    });
  }

  updateGrocery(item: Item) {
    const uid = this.authService.getID()
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('users').doc(uid)
        .collection('groceries').doc(item.id)
        .set({ name: item.name, foodId: item.foodId, nutrients: item.nutrients, amount: item.amount })
        .then(res => {
          console.log(res)
        }, err => reject(err))
    })
  }

  deleteGrocery(id: string) {
    const uid = this.authService.getID()
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('users').doc(uid)
        .collection('groceries').doc(id).delete()
        .then(res => {
          console.log(res)
        }, err => reject(err))
    })
  }
}
