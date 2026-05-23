import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

    constructor(private toastr: ToastrService) {}

  editIndex: number | null = null;

  adminboard = {
    symbol: '',
    option: '',
    sticke: '',
    no_of_lot: 1,
  };

  adminboardList: any[] = [];

  // Create or update table data

//   createAdminBoard() {

//   if (!this.adminboard.symbol) {
//     this.showError('Symbol is required.');
//     return;
//   }

//   if (!this.adminboard.option) {
//     this.showError('Option is required.');
//     return;
//   }

//   if (!this.adminboard.sticke) {
//     this.showError('Stick is required.');
//     return;
//   }

//   if (!this.adminboard.no_of_lot || this.adminboard.no_of_lot <= 0) {
//     this.showError('No.Of.Lot must be greater than 0.');
//     return;
//   }

//   fetch('/.netlify/functions/adminboard-create', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(this.adminboard)
//   })
//   .then(res => res.json())
//   .then(data => {
//     if (data.success) {
//       this.adminboardList.push({
//         ...this.adminboard,
//         id: data.id
//       });

//       this.resetForm();
//             // alert('Saved successfully');
//        this.toastr.success('Inserted Successful', 'Success');
//     } else {
//       // this.showError(data.message);
//        this.toastr.error(data.message, 'Admin Inserted Failed');
//     }
//   })
//   .catch(() => {
//     this.showError('Server connection failed');
//   });
// }

// Table Add The Details

//   buyAdminBoard() {

//   if (!this.adminboard.symbol) {
//     this.showError('Symbol is required.');
//     return;
//   }

//   if (!this.adminboard.option) {
//     this.showError('Option is required.');
//     return;
//   }

//   if (!this.adminboard.sticke) {
//     this.showError('Stick is required.');
//     return;
//   }

//   if (!this.adminboard.no_of_lot || this.adminboard.no_of_lot <= 0) {
//     this.showError('No.Of.Lot must be greater than 0.');
//     return;
//   }

//   fetch('http://localhost:3000/api/adminboard/buy', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(this.adminboard)
//   })
//   .then(res => res.json())
//   .then(data => {
//     if (data.success) {
//       this.adminboardList.push({
//         ...this.adminboard,
//         id: data.id
//       });

//       this.resetForm();
//     } else {
//       this.showError(data.message || 'Buy details not saved.');
//     }
//   })
//   .catch(() => {
//     this.showError('Backend server not connected.');
//   });
// }

// // Select
// fetch('/.netlify/functions/adminboard-create')

// // Insert
// fetch('/.netlify/functions/adminboard-create', { method: 'POST' })

// // Update
// fetch('/.netlify/functions/adminboard-create', { method: 'PUT' })

// // Delete
// fetch('/.netlify/functions/adminboard-create', { method: 'DELETE' })

createAdminBoard() {

  if (!this.validateForm()) {
    return;
  }

  const duplicate = this.adminboardList.some(item =>
    item.symbol === this.adminboard.symbol &&
    item.option === this.adminboard.option &&
    item.sticke === this.adminboard.sticke &&
    Number(item.no_of_lot) === Number(this.adminboard.no_of_lot)
  );

  if (duplicate) {
    this.showError('Duplicate details already added.');
    this.resetForm();
    return;
  }

  this.adminboardList.push({ ...this.adminboard });

  this.resetForm();
}

buyAdminBoard() {

  if (!this.validateForm()) {
    return;
  }

  fetch('/.netlify/functions/adminboard-create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...this.adminboard,
      type: 'BUY'
    })
  })
  .then(res => res.json())
  .then(data => {

    if (data.success) {
      this.toastr.success('Admin Details Inserted Successful', 'Success');
      this.resetForm();
    } 
    else {
      this.toastr.error(data.message, 'Admin Details Inserted Failed');
    }

  })
  .catch(() => {
    this.showError('Server connection failed');
  });
}

validateForm(): boolean {

  if (!this.adminboard.symbol) {
    this.showError('Symbol is required.');
    return false;
  }

  if (!this.adminboard.option) {
    this.showError('Option is required.');
    return false;
  }

  if (!this.adminboard.sticke) {
    this.showError('Stick is required.');
    return false;
  }

  if (!this.adminboard.no_of_lot || this.adminboard.no_of_lot <= 0) {
    this.showError('No.Of.Lot must be greater than 0.');
    return false;
  }

  return true;
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