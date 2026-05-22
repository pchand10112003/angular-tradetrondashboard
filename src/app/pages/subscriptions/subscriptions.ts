import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './subscriptions.html',
  styleUrl: './subscriptions.css'
})
export class Subscriptions {

  subscriptionData = [
    {
      title: 'Free : NSE/NFO',
      allowed: '1',
      used: 'NIL'
    },
    {
      title: 'Free : MCX',
      allowed: '1',
      used: 'NIL'
    },
    {
      title: 'Free : CDS',
      allowed: '2',
      used: '1'
    },
    {
      title: 'Premium : Equity',
      allowed: '10',
      used: '3'
    }
  ];
}