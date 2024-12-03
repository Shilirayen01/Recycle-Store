import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  currentStep: number = 1;



  constructor(private fb: FormBuilder ,private userService: UserService,private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue],
    });
  }

  // Form validation statuses
  isStep1Valid: boolean = false;
  isStep2Valid: boolean = false;
  isStep3Valid: boolean = false;

  // Handle step navigation
  nextStep(step: number) {
    if (step === 2) {
      this.isStep1Valid = true; // Step 1 is considered valid when moving to Step 2
    }
    if (step === 3) {
      this.isStep2Valid = true; // Step 2 is valid when moving to Step 3
      this.isStep3Valid = (this.signupForm.get('password')?.value === (this.signupForm.get('confirmPassword')?.value) && this.signupForm.get('termsAccepted')?.value);
    }
    this.currentStep = step;
  }

  // Navigate to previous step
  prevStep(step: number) {
    if (step === 1) {
      this.isStep1Valid = false; // Reset validity
      this.isStep2Valid = false; // Reset any subsequent steps if necessary
    } else if (step === 2) {
      this.isStep2Valid = false; // Reset step 2 validity
      this.isStep3Valid = false; // Reset any subsequent steps if necessary
    }
    // Additional logic for other steps can be added here if needed
    this.currentStep = step; // Update the current step
  }

  // Validation for Step 3
  isStep3ValidForm(): boolean {
    return((this.signupForm.get('password')?.value === (this.signupForm.get('confirmPassword')?.value) && this.signupForm.get('termsAccepted')?.value));
  }

  // Complete signup (create user)
  completeSignup() {
    this.isStep3Valid = this.isStep3ValidForm();
    if (this.isStep3Valid) {
      // Extract the form values
      const firstName = this.signupForm.get('firstName')?.value;
      const lastName = this.signupForm.get('lastName')?.value;
      const username = this.signupForm.get('username')?.value;
      const email = this.signupForm.get('email')?.value;
      const password = this.signupForm.get('password')?.value;
      const role = 'guest'; // Default role can be set as 'user'

      // Create new User object
      const newUser = new User(firstName, lastName,username, email,password, role);

      console.log('User to send:', newUser);

      // Call the service to add the user
      this.userService.addUser(newUser).subscribe({
        next: (data) => {
          console.log('User signed up successfully!', data);
          alert('Signup successful!');
          this.signupForm.reset(); // Reset form
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error during signup:', err);
          if (err.error && err.error.details) {
            console.error('Validation errors:', err.error.details);
          } else {
            console.error('Unknown error:', err);
          }
          alert('Signup failed. Please try again.');
        }
        
      });
    } else {
      if (this.signupForm.get('password')?.value !== this.signupForm.get('confirmPassword')?.value) {
        console.log('Passwords do not match.');
      } else {
        console.log('Step 3 validation failed.');
      }
    }
  }
  
}
