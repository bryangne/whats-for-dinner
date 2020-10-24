import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  // tslint:disable-next-line: max-line-length
  items: Item[] = [];
  itemsChanged = new Subject<Item[]>();

  constructor(private firestore: AngularFirestore) {
    this.firestore.collection('Groceries').snapshotChanges().subscribe(res => {
      this.items = [];
      res.forEach(databaseItem => {
        const item: any = databaseItem.payload.doc.data();
        item.id = databaseItem.payload.doc.id;
        this.items.push(item);
      });
      console.log(this.items)
      this.itemsChanged.next([...this.items]);
    });
  }


  getGroceries() {
    // console.log('getting groceries!')
    // this.firestore.collection('Groceries').snapshotChanges().subscribe(res => {
    //   this.items = [];
    //   res.forEach(databaseItem => {
    //     const item: any = databaseItem.payload.doc.data();
    //     item.id = databaseItem.payload.doc.id;
    //     this.items.push(item);
    //   });
    //   console.log(this.items)
    //   this.itemsChanged.next([...this.items]);
    // });

  }

  getGroceriesUpdated() {
    return [...this.items];
  }

  addGrocery(item: Item) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('Groceries').add(item).then(res => {
        console.log(res);
      }, err => reject(err));
    });
  }

  updateGrocery(item: Item) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('Groceries').doc(item.id).set({name: item.name, details: item.details, amount: item.amount})
    })
  }

  deleteGrocery(id: string) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('Groceries').doc(id).delete();
    })
  }
}
