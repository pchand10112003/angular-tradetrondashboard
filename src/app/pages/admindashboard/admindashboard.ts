import { Component, OnInit } from '@angular/core';
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
export class Admindashboard implements OnInit {

  showErrorDialog = false;
  errorMessage = '';

  editIndex: number | null = null;
  editId: string | null = null;

  adminboard = {
    symbol: '',
    option: '',
    sticke: '',
    no_of_lot: 1,
  };

  adminboardList: any[] = [];

  ngOnInit() {
    this.loadAdminBoard();
  }

  loadAdminBoard() {
    // fetch('/.netlify/functions/adminboard-create')
    fetch('https://coruscating-cocada-9b23ad.netlify.app/.netlify/functions/adminboard-create')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.adminboardList = data.data;
        }
      })
      .catch(() => {
        this.showError('Failed to load table data.');
      });
  }

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
    if (this.adminboardList.length === 0) {
      this.showError('Table is empty. Please create at least one record.');
      return;
    }

    const newRecords = this.adminboardList.filter(item => !item._id);

    if (newRecords.length === 0) {
      this.showError('No new records to save.');
      return;
    }

    // fetch('/.netlify/functions/adminboard-create', {
    fetch('https://coruscating-cocada-9b23ad.netlify.app/.netlify/functions/adminboard-create',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'BUY',
        items: newRecords
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Buy table details saved successfully');
          this.adminboardList = data.data;
          this.resetForm();
        } else {
          this.showError(data.message || 'Save failed');
        }
      })
      .catch(() => {
        this.showError('Server connection failed');
      });
  }

  editAdminBoard(index: number) {
    const item = this.adminboardList[index];

    this.adminboard = {
      symbol: item.symbol,
      option: item.option,
      sticke: item.sticke,
      no_of_lot: item.no_of_lot,
    };

    this.editIndex = index;
    this.editId = item._id || null;
  }

  updateAdminBoard() {
    if (!this.validateForm()) {
      return;
    }

    if (this.editIndex === null) {
      this.showError('Please select a record to update.');
      return;
    }

    if (!this.editId) {
      this.adminboardList[this.editIndex] = { ...this.adminboard };
      this.resetForm();
      this.editIndex = null;
      return;
    }

    fetch('/.netlify/functions/adminboard-create', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.editId,
        ...this.adminboard
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Updated successfully');
          this.loadAdminBoard();
          this.resetForm();
          this.editIndex = null;
          this.editId = null;
        } else {
          this.showError(data.message || 'Update failed');
        }
      })
      .catch(() => {
        this.showError('Server connection failed');
      });
  }

  deleteAdminBoard(index: number) {
    const item = this.adminboardList[index];

    if (!item._id) {
      this.adminboardList.splice(index, 1);
      return;
    }

    fetch('/.netlify/functions/adminboard-create', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item._id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.loadAdminBoard();
        } else {
          this.showError(data.message || 'Delete failed');
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