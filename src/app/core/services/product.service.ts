import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(){
    return this.http.get<Product[]>(`${environment.api_url}/catalog`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${environment.api_url}/catalog/${id}`);
  }

  createProduct(product: Product){
    return this.http.post(`${environment.api_url}/catalog`, product);
  }

  updateProduct(id: string, changes: Partial<Product>){
    return this.http.patch(`${environment.api_url}/catalog/${id}`, changes);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.api_url}/catalog/${id}`);
  }

}
