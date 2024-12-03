import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  selectedImage: number = 1;
  imagePaths: string[] = [
    'assets/images/OIP.jpg',
    'assets/images/OIF.jpg',
    'assets/images/download.jpg',
    'assets/images/download (1).jpg'
  ];

  selectImage(imageIndex: number) {
    this.selectedImage = imageIndex; // Update the selected image index
  }
}
