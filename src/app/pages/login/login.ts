import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';
  emailError = '';
  passwordError = '';
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {}

  login_check() {
    this.emailError = '';
    this.passwordError = '';

    const emailValue = this.email.trim();
    const passwordValue = this.password.trim();

    let hasError = false;

    if (emailValue === '') {
      this.emailError = 'Email is required';
      hasError = true;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(emailValue)) {
        this.emailError = 'Invalid email format';
        hasError = true;
      }
    }

    if (passwordValue === '') {
      this.passwordError = 'Password is required';
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Demo Login for Netlify
    if (emailValue === 'admin@gmail.com' && passwordValue === '123456') {
      const demoUser = {
        id: 1,
        name: 'Admin',
        email: emailValue
      };

      localStorage.setItem('user', JSON.stringify(demoUser));

      this.toastr.success('Login Successful', 'Success');

      this.email = '';
      this.password = '';

      this.router.navigate(['/dashboard']);
    } else {
      this.toastr.error('Invalid Email Or Password', 'Login Failed');
    }
  }
}










// These IS Real Local Host API Connection
// import { Component } from '@angular/core';

// import { CommonModule } from '@angular/common';

// import { FormsModule } from '@angular/forms';

// import { Router } from '@angular/router';

// import { AuthService } from '../../services/auth';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './login.html',
//   styleUrl: './login.css'
// })

// export class Login {

//   email = '';
//   password = '';
//   emailError = '';
//   passwordError = ''; 
//   showPassword = false;
  
//   togglePassword() {
//     this.showPassword = !this.showPassword;
//   }
  
//   constructor(private router: Router, private authService: AuthService,  private toastr: ToastrService ) {}

//   login_check() {
//     this.emailError = '';
//     this.passwordError = '';  

//     const emailValue = this.email.trim();
//     const passwordValue = this.password.trim();
//     let hasError = false;

//     // EMAIL
//     if (emailValue === '') {
//       this.emailError = 'Email is required';
//       hasError = true;
//     }
//     else {
//       const emailPattern =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//       if (!emailPattern.test(emailValue)) {
//         this.emailError = 'Invalid email format';
//         hasError = true;
//       }
//     }
//     // PASSWORD
//     if (passwordValue === '') 
//     {
//       this.passwordError = 'Password is required';
//       hasError = true;
//     }
//     if (hasError) {
//       return;
//     }   

//     const loginData = {
//       email: emailValue,
//       password: passwordValue
//     };

//     this.authService.login(loginData).subscribe({
//       next: (response) => {        
//         localStorage.setItem('user', JSON.stringify(response.user));
//         this.toastr.success('Login Successful', 'Success');
//         this.email = '';
//         this.password = '';
//         this.router.navigate(['/dashboard']);
//       }, 
//       error: (error) => 
//       {                    
//         this.toastr.error('Invalid Email Or Password', 'Login Failed');
//       }
//     });
//   }
// }

