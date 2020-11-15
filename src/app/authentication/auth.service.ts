import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) { 
    console.log('auth service created')
  }
  firebaseID: string
  // TODO: add the first name and last name parameters
  register(email, password) {
    const myEmail = email
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
          // set up the user's database entries
          const id = res.user.uid
          this.firebaseID = id
          const user = {
            email: myEmail
          }
          this.firestore.collection('users').doc(id).set(user)
          resolve(res)
        }, err => {
          console.log(err)
          reject(err)
        })
    })
  }

  login(email, password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          // grab the user's database id when they log in
          resolve(res)
        }, err => reject(err))
    })
  }

  logout() {
    this.firebaseID = ''
    return this.firebaseAuth.signOut()
  }

  // get the firebase user id after logging in
  getID(): string {
    const uid = firebase.auth().currentUser.uid
    return uid
  }
}
