import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-main-store-products',
  templateUrl: './main-store-products.component.html',
  styleUrl: './main-store-products.component.css'
})
export class MainStoreProductsComponent implements OnInit {
  products: Product[] = [];

   // Local image mapping
   imageMap: { [key: string]: string } = {
    "Product 1": "../../assets/images/product.jpg",
    "Product 2": "assets/images/product2.jpg",
    "Product 3": "assets/images/product3.jpg",
    // Add more product-image mappings here
  };



  constructor(private productService: ProductService,private http: HttpClient) { }

  ngOnInit(): void {
    this.loadAllData();

  }




  // Load initial data
  loadAllData(): void {
    this.productService.getProducts().subscribe((products) => {
      console.log(products);  // Log the product data to check the structure
      this.products = products.map((product) => {
        product.image_url = this.imageMap[product.nom_produit] || '../../assets/images/product.jpg';
        return product;
      });
    });
  }
  

}
