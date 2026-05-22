import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageComponent } from '../../shared/message/message';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageComponent],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class UsersComponent {
  successMessage = '';
  errorMessage = '';
  editIndex: number | null = null;

  user = {
    name: '',
    email: '',
    password: '',
    mobile: '',
    status: '1'
  };

  users: any[] = [
    {
      name: 'Admin User',
      email: 'admin@tradetron.com',
      mobile: '9876543210',
      status: 'Active'
    },
    {
      name: 'Test User',
      email: 'test@tradetron.com',
      mobile: '9876501234',
      status: 'Active'
    }
  ];

  constructor(private router: Router) {}

  goDashboard() {
    this.router.navigate(['/dashboard']);
  }

  saveUser() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.user.name || !this.user.email || !this.user.password) {
      this.showError('Name, email and password are required');
      return;
    }

    if (!this.user.email.includes('@')) {
      this.showError('Please enter valid email address');
      return;
    }

    if (this.editIndex !== null) {
      this.users[this.editIndex] = {
        name: this.user.name,
        email: this.user.email,
        mobile: this.user.mobile,
        status: this.user.status === '1' ? 'Active' : 'Blocked'
      };

      this.showSuccess('User updated successfully');
    } else {
      this.users.push({
        name: this.user.name,
        email: this.user.email,
        mobile: this.user.mobile,
        status: this.user.status === '1' ? 'Active' : 'Blocked'
      });

      this.showSuccess('User created successfully');
    }

    this.resetForm();
  }

  editUser(item: any, index: number) {
    this.editIndex = index;

    this.user = {
      name: item.name,
      email: item.email,
      password: '******',
      mobile: item.mobile,
      status: item.status === 'Active' ? '1' : '0'
    };
  }

  deleteUser(index: number) {
    const confirmDelete = confirm('Are you sure you want to delete this user?');

    if (!confirmDelete) {
      return;
    }

    this.users.splice(index, 1);
    this.showSuccess('User deleted successfully');
    this.resetForm();
  }

  resetForm() {
    this.user = {
      name: '',
      email: '',
      password: '',
      mobile: '',
      status: '1'
    };

    this.editIndex = null;
  }

  showSuccess(message: string) {
    this.errorMessage = '';
    this.successMessage = message;

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  showError(message: string) {
    this.successMessage = '';
    this.errorMessage = message;

    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}