import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-brokers-exchanges',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './brokers-exchanges.html',
  styleUrl: './brokers-exchanges.css'
})
export class BrokersExchanges {

  showBrokerModal = false;
  showErrorDialog = false;
  showExchangeDropdown = false;

  selectedBroker = '';
  selectedExchanges: string[] = [];

  errorMessage = '';

  brokersList = [
    '5 Paisa (Xstream)',
    '5paisa (Symphony)',
    'Abstox',
    'AC Agarwal ODIN',
    'AC Agarwal Pro XTS',
    'Upstox',
    'Zerodha'
  ];

  exchangeList = [   
    'NFO (INR ₹)',
    'MCX (INR ₹)',
    'CDS (INR ₹)',   
    'BSE_IDX (INR ₹)',    
  ];

  openBrokerModal() {
    this.showBrokerModal = true;
    this.selectedBroker = '';
    this.selectedExchanges = [];
    this.errorMessage = '';
    this.showExchangeDropdown = false;
  }

  closeBrokerModal() {
    this.showBrokerModal = false;
    this.selectedBroker = '';
    this.selectedExchanges = [];
    this.showExchangeDropdown = false;
  }

  toggleExchangeDropdown() {
    this.showExchangeDropdown = !this.showExchangeDropdown;
  }

  toggleExchange(exchange: string) {
    if (this.selectedExchanges.includes(exchange)) {
      this.selectedExchanges = this.selectedExchanges.filter(item => item !== exchange);
    } else {
      this.selectedExchanges.push(exchange);
    }
  }

  saveBroker() {
    if (!this.selectedBroker) {
      this.throwError('Please select a broker.');
      return;
    }

    if (this.selectedExchanges.length === 0) {
      this.throwError('Please select at least one exchange.');
      return;
    }

    try {
      console.log('Broker:', this.selectedBroker);
      console.log('Exchanges:', this.selectedExchanges);
      this.closeBrokerModal();
    } catch {
      this.throwError('Something went wrong while saving broker.');
    }
  }

  throwError(message: string) {
    this.errorMessage = message;
    this.showErrorDialog = true;
  }

  closeErrorDialog() {
    this.showErrorDialog = false;
    this.errorMessage = '';
  }
}