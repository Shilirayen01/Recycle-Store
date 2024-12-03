import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/produits'; // Update to your backend API
  // Angular Service:


  constructor(private http: HttpClient) {}  

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  // Implement the uploadImage method
  uploadImage(formData: FormData): Observable<{ filename: string; path: string }> {
    const uploadUrl = `${this.apiUrl}/upload`;
    return this.http.post<{ filename: string; path: string }>(uploadUrl, formData).pipe(
      catchError((error) => {
        console.error('File upload failed:', error);
        return throwError(() => new Error('File upload failed'));
      })
    );
  }
  
  
  

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.produit_id}`, product);
  }
  
}
