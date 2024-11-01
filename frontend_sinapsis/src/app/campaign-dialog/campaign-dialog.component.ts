import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-campaign-dialog',
  standalone: true,
  imports: [CommonModule, MatListModule],
  template: `
    <h2>Campañas Asociadas</h2>
    <mat-list>
      <mat-list-item *ngFor="let campaign of data">
        <div>
          <strong>{{ campaign.name }}</strong>
          <p>Fecha: {{ campaign.process_date | date }}</p>
          <p>
            Estado:
            <span [ngClass]="getStatusClass(campaign.process_status)">
              {{ getStatusLabel(campaign.process_status) }}
            </span>
          </p>
          <p>Mensaje: {{ campaign.message_text }}</p>
        </div>
      </mat-list-item>
    </mat-list>
  `,
  styles: [
    `
      h2 {
        margin-top: 0;
        font-size: 1.2em;
        font-weight: bold;
        color: #333;
      }
      mat-list-item {
        border-bottom: 1px solid #e0e0e0;
        padding: 1px 0;
        min-height: 125px;
      }
      .status-pending {
        color: #fbc02d; /* amarillo */
        font-weight: bold;
      }
      .status-in-progress {
        color: #1976d2; /* azul */
        font-weight: bold;
      }
      .status-completed {
        color: #388e3c; /* verde */
        font-weight: bold;
      }
    `,
  ],
})
export class CampaignDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any[]) {}

  // Método para obtener la etiqueta del estado
  getStatusLabel(status: number): string {
    switch (status) {
      case 1:
        return 'Pendiente';
      case 2:
        return 'En Proceso';
      case 3:
        return 'Finalizada';
      default:
        return 'Desconocido';
    }
  }

  // Método para aplicar la clase CSS según el estado
  getStatusClass(status: number): string {
    switch (status) {
      case 1:
        return 'status-pending';
      case 2:
        return 'status-in-progress';
      case 3:
        return 'status-completed';
      default:
        return '';
    }
  }
}
