import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  constructor(private router: Router) {}

  isDarkMode = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }
  
showLogoutToast = false;

openLogoutToast() {
  this.showLogoutToast = true;
}

cancelLogout() {
  this.showLogoutToast = false;
}

confirmLogout() {
  this.showLogoutToast = false;
  this.router.navigate(['/login']);
} 

}