import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.html',
  styleUrl: './message.css'
})
export class MessageComponent {
  @Input() type: 'success' | 'error' = 'success';
  @Input() message = '';
  @Input() showDashboardButton = false;

  @Output() dashboardClick = new EventEmitter<void>();

  goDashboard() {
    this.dashboardClick.emit();
  }
}