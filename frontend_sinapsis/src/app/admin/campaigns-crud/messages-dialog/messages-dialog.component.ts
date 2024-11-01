import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages-dialog',
  standalone: true,
  imports: [MatListModule, CommonModule],
  templateUrl: './messages-dialog.component.html',
  styleUrls: ['./messages-dialog.component.css'],
})
export class MessagesDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  getStatusLabel(status: number): string {
    switch (status) {
      case 1:
        return 'Pendiente';
      case 2:
        return 'Enviado';
      case 3:
        return 'Error';
      default:
        return 'Desconocido';
    }
  }

  getStatusClass(status: number): string {
    switch (status) {
      case 1:
        return 'status-pending';
      case 2:
        return 'status-sent';
      case 3:
        return 'status-error';
      default:
        return '';
    }
  }
}
