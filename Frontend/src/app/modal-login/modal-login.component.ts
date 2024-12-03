import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { LoggedUser } from '../models/loggedUser';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css'],
})
export class ModalLoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private userService:UserService,private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Username field
      password: ['', [Validators.required]], // Password field
    });
  }



  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
  
      console.log('Username:', username);
      console.log('Password:', password);
  
      this.userService.login(username, password).subscribe({
        next: (data: any) => {
          console.log('Login response:', data); // Check the structure of the response
  
          // Check that we get both username and role in the response
          if (data && data.username && data.role) {
            const loggedUser = new LoggedUser(data.username, data.role); // Password is not needed
  
            console.log('LoggedUser:', loggedUser);
  
            // Navigate based on the user role
            if (loggedUser.role === 'admin') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/home']);
            }
          } else {
            alert('Invalid username or password.');
          }
        },
        error: (err) => {
          console.error('Error during login:', err);
          alert('Invalid username or password.');
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
  
  
  

}
