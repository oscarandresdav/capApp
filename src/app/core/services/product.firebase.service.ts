import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductFirebaseService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getProducts() {
    return this.firestore.collection('product').snapshotChanges();
  }

  addProduct(product: Product) {
    return this.firestore.collection('product').add(product);
  }

  updateProduct(id: string, product: Product) {
    return this.firestore.doc(`product/${id}`).update(product);
  }

  deleteProduct(id: string) {
    return this.firestore.doc(`product/${id}`).delete();
  }
}
