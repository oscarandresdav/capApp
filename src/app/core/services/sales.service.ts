import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Sale } from './../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  constructor(
    private firestore: AngularFirestore
  ) { }

  getSales() {
    return this.firestore.collection('sales').snapshotChanges();
  }

  addSale(item: Sale) {
    return this.firestore.collection('sales').add(item);
  }

  updateSale(id: string, item: Sale) {
    return this.firestore.doc(`sales/${id}`).update(item);
  }

  deleteSale(id: string) {
    return this.firestore.doc(`sales/${id}`).delete();
  }
}
