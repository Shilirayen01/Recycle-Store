import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trending-products',
  templateUrl: './trending-products.component.html',
  styleUrls: ['./trending-products.component.css']
})
export class TrendingProductsComponent implements OnInit {

  products = [
    {
      id: 1,
      name: 'Vase',
      image: '../../assets/images/product.jpg',
      price: 98.8,
    },
    {
      id: 1,
      name: 'Table',
      image: '../../assets/images/product1.jpg',
      price: 500,
    },
    {
      id: 1,
      name: 'Sac à main',
      image: '../../assets/images/product2.jpg',
      price: 20,
    },

    // More product objects here
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
