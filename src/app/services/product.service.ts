import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '@/interfaces/product.interface';

@Injectable({providedIn: 'root'})
export class ProductService {
  private http = inject(HttpClient)

  getProducts() {
   return this.http.get<IProduct[]>("https://api.escuelajs.co/api/v1/products")
  }
  
}