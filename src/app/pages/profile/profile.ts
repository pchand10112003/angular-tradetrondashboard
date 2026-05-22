import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  showErrorDialog = false;
  errorMessage = '';

  profile = {
    name: 'Testing',
    email: 'testing@gmail.com',
    phone: '1234567890',
    address: 'Tamilnadu',
    country: 'India',
    state: 'Tamil Nadu',
    description: ''
  };

  saveProfile() {
    if (!this.profile.name.trim()) {
      this.showError('Name is required.');
      return;
    }

    if (!this.profile.phone.trim()) {
      this.showError('Phone number is required.');
      return;
    }

    if (!/^[0-9]{10}$/.test(this.profile.phone)) {
      this.showError('Phone number must be 10 digits.');
      return;
    }

    if (!this.profile.address.trim()) {
      this.showError('Address is required.');
      return;
    }

    if (!this.profile.country) {
      this.showError('Country is required.');
      return;
    }

    if (!this.profile.state) {
      this.showError('State is required.');
      return;
    }

    alert('Profile saved successfully!');
  }

  showError(message: string) {
    this.errorMessage = message;
    this.showErrorDialog = true;
  }

  closeErrorDialog() {
    this.showErrorDialog = false;
    this.errorMessage = '';
  }
}