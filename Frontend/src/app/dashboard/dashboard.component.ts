import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service'; 
import { UserService } from '../services/user.service'; 
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  products: Product[] = [];
  keyword: string = '';
  productKeyword: string = '';
  activeView: 'dashboard' | 'usersTable' | 'productsTable' | 'addProductForm' | 'editProductForm' = 'dashboard';
  selectedProduct: Product | null = null; 
  selectedDate: Date | null = null;  
  selectedFile: File | null = null;



  constructor(private userService: UserService, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  setActiveView(view: 'dashboard' | 'usersTable' | 'productsTable' | 'addProductForm'| 'editProductForm') {
    this.activeView = view;
  }

  loadAllData(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
    this.productService.getProducts().subscribe((products) => (this.products = products));
  }

  parseDate(dateString: string): Date | null {
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; 
      const day = parseInt(dateParts[2], 10);

      const date = new Date(year, month, day);

      if (!isNaN(date.getTime())) {
        return date;
      } else {
        alert("Date invalide.");
        return null;
      }
    } else {
      alert("Format de date invalide. Utilisez le format yyyy-MM-dd.");
      return null;
    }
  }

  selectProductForEdit(product: Product): void {
    this.selectedProduct = product;
  }
  

  updateProduct(form: NgForm): void {
    if (form.valid && this.selectedProduct) {
      this.selectedProduct.nom_produit = form.value['nom_produit'];
      this.selectedProduct.image_url = form.value['image_url'];
      this.selectedProduct.prix = form.value['prix'];
      this.selectedProduct.description = form.value['description'];
  
      const updateDate = form.value['update_date'];
      this.selectedProduct.update_date = updateDate ? new Date(updateDate) : null; 
  
      this.productService.updateProduct(this.selectedProduct).subscribe(
        () => {
          alert('Product updated successfully');
          this.loadAllData();  // Refresh the data
          this.selectedProduct = null;  
        },
        (error: any) => {
          alert('Error updating product: ' + error.message);
        }
      );
    } else {
      alert('Please fill out all required fields.');
    }
  }
      


  addProduct(form: NgForm): void {
    if (form.valid) {
      const nom_produit = form.value['nom_produit'];
      const prix = form.value['prix'];
      const image_url = form.value['image_url'];
      const description = form.value['description'];
      const create_date = form.value['create_date'] + " 00:00:00"; 
  
      const createDateObj = new Date(create_date);
      const updateDateObj = createDateObj
  
      const newProduct = new Product(
        nom_produit,
        image_url,
        prix,
        description,
        createDateObj,
        updateDateObj
      );
  
      console.log('Product to send:', newProduct);
  
      this.productService.addProduct(newProduct).subscribe(
        {
          next: (data) => {
            console.log('Product added successfully!', data);
            form.reset();
            alert('Product added successfully!');
          },
          error: (err) => {
            console.error('Error adding product:', err);
            alert('Failed to add the product. Please try again.');
          },
        }
      );
    } else {
      alert('Please fill out all required fields.');
    }
  }
  

  searchUsers(): void {
    if (!this.keyword.trim()) {
      this.loadAllData();
      return;
    }
    this.users = this.users.filter((user) =>
      user.first_name.toLowerCase().includes(this.keyword.toLowerCase()) ||
      user.last_name.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }

  searchProducts(): void {
    if (!this.productKeyword.trim()) {
      this.loadAllData();
      return;
    }
    this.products = this.products.filter((product) =>
      product.nom_produit.toLowerCase().includes(this.productKeyword.toLowerCase())
    );
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== userId);
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.products = this.products.filter((product) => product.produit_id !== productId);
    });
  }

  
}
