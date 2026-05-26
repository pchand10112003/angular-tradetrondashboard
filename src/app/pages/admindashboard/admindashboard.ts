import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './admindashboard.html',
  styleUrl: './admindashboard.css',
})
export class Admindashboard implements OnInit {

  // webhookUrl = 'https://coruscating-cocada-9b23ad.netlify.app/.netlify/functions/adminboard-create';

  // webhookUrl = 'http://localhost:8888/.netlify/functions/tradingview-webhook';

  webhookUrl =window.location.hostname === 'localhost'
  ? 'http://localhost:8888/.netlify/functions/tradingview-webhook'
  : 'https://coruscating-cocada-9b23ad.netlify.app/.netlify/functions/tradingview-webhook';

  latestSignal: any = null;

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

  constructor(private http: HttpClient) {}

 ngOnInit(): void {

  console.log('ADMIN PAGE LOADED');

  this.connectTradingview();

  setInterval(() => {
    this.getTradingviewSignal();
  }, 3000);
}

  getTradingviewSignal() {

  this.http.get<any>(this.webhookUrl).subscribe({
    next: (res) => {

      console.log('Latest Signal:', res);

      this.latestSignal = res.latestSignal;
      console.log(this.latestSignal);


    },
    error: (err) => {
      console.log(err);
    }
  });

}

  connectTradingview(): void {
    console.log('Connecting webhook:', this.webhookUrl);

    this.http.get<any>(this.webhookUrl).subscribe({
      next: (res) => {
        console.log('Webhook Connected:', res);
        alert('Webhook connected successfully');
      },
      error: (err) => {
        console.error('Webhook Error:', err);
        alert('Webhook connection failed. Run netlify dev first.');
      }
    });
  }

  createAdminBoard() {
    if (!this.validateForm()) return;

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

    this.http.post<any>(this.webhookUrl, {
      type: 'BUY',
      items: newRecords
    }).subscribe({
      next: (data) => {
        console.log('SAVE RESPONSE:', data);

        if (data.success) {
          alert('Buy table details saved successfully');
          this.adminboardList = data.data || [];
          this.resetForm();
        } else {
          this.showError(data.message || 'Save failed');
        }
      },
      error: (err) => {
        console.log('SAVE ERROR:', err);
        this.showError('Server connection failed');
      }
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
    if (!this.validateForm()) return;

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

    this.http.put<any>(this.webhookUrl, {
      id: this.editId,
      ...this.adminboard
    }).subscribe({
      next: (data) => {
        if (data.success) {
          alert('Updated successfully');
          this.resetForm();
          this.editIndex = null;
          this.editId = null;
        } else {
          this.showError(data.message || 'Update failed');
        }
      },
      error: (err) => {
        console.log('UPDATE ERROR:', err);
        this.showError('Server connection failed');
      }
    });
  }

  deleteAdminBoard(index: number) {
    const item = this.adminboardList[index];

    if (!item._id) {
      this.adminboardList.splice(index, 1);
      return;
    }

    this.http.delete<any>(this.webhookUrl, {
      body: { id: item._id }
    }).subscribe({
      next: (data) => {
        if (data.success) {
          this.adminboardList.splice(index, 1);
        } else {
          this.showError(data.message || 'Delete failed');
        }
      },
      error: (err) => {
        console.log('DELETE ERROR:', err);
        this.showError('Server connection failed');
      }
    });
  }

  ConnectExchange() {
    console.log('Connecting The Exchange');
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