import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Catalogo } from '../models/catalogo';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  constructor(private http: HttpClient) { }

  getAllProducts(){
    return this.http.get<Catalogo[]>(`${environment.api_url}/catalog`);
  }

  getProduct(id: string) {
    return this.http.get<Catalogo>(`${environment.api_url}/catalog/${id}`);
  }

  createProduct(product: Catalogo){
    return this.http.post(`${environment.api_url}/catalog`, product);
  }

  updateProduct(id: string, changes: Partial<Catalogo>){
    return this.http.patch(`${environment.api_url}/catalog/${id}`, changes);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.api_url}/catalog/${id}`);
  }

}
