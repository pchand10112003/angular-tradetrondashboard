import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admindashboard.html',
  styleUrl: './admindashboard.css',
})
export class Admindashboard {

  showErrorDialog = false;
  errorMessage = '';

  editIndex: number | null = null;

  adminboard = {
    symbol: '',
    option: '',
    sticke: '',
    no_of_lot: 1,
  };

  adminboardList: any[] = [];

  // Create or update table data

  createAdminBoard() {

  if (!this.adminboard.symbol) {
    this.showError('Symbol is required.');
    return;
  }

  if (!this.adminboard.option) {
    this.showError('Option is required.');
    return;
  }

  if (!this.adminboard.sticke) {
    this.showError('Stick is required.');
    return;
  }

  if (!this.adminboard.no_of_lot || this.adminboard.no_of_lot <= 0) {
    this.showError('No.Of.Lot must be greater than 0.');
    return;
  }

  fetch('/.netlify/functions/adminboard-create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.adminboard)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      this.adminboardList.push({
        ...this.adminboard,
        id: data.id
      });

      this.resetForm();
      alert('Saved successfully');
    } else {
      this.showError(data.message);
    }
  })
  .catch(() => {
    this.showError('Server connection failed');
  });
}

// Table Add The Details

  buyAdminBoard() {

  if (!this.adminboard.symbol) {
    this.showError('Symbol is required.');
    return;
  }

  if (!this.adminboard.option) {
    this.showError('Option is required.');
    return;
  }

  if (!this.adminboard.sticke) {
    this.showError('Stick is required.');
    return;
  }

  if (!this.adminboard.no_of_lot || this.adminboard.no_of_lot <= 0) {
    this.showError('No.Of.Lot must be greater than 0.');
    return;
  }

  fetch('http://localhost:3000/api/adminboard/buy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.adminboard)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      this.adminboardList.push({
        ...this.adminboard,
        id: data.id
      });

      this.resetForm();
    } else {
      this.showError(data.message || 'Buy details not saved.');
    }
  })
  .catch(() => {
    this.showError('Backend server not connected.');
  });
}

  // Edit selected row
  editAdminBoard(index: number) {
    this.adminboard = { ...this.adminboardList[index] };
    this.editIndex = index;
  }

  // Delete selected row
  deleteAdminBoard(index: number) {
    this.adminboardList.splice(index, 1);
    this.resetForm();
  }

  // Clear form
  resetForm() {
    this.adminboard = {
      symbol: '',
      option: '',
      sticke: '',
      no_of_lot: 1,
    };
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