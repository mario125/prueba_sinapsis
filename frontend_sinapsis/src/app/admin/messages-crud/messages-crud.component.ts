import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessagesService } from '../../services/messages.service';
import { CampaignService } from '../../services/campaign.service';
import { DatePipe, CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-messages-crud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
  ],
  templateUrl: './messages-crud.component.html',
  styleUrls: ['./messages-crud.component.css'],
  providers: [MessagesService, CampaignService, DatePipe],
})
export class MessagesCrudComponent implements OnInit {
  filterForm: FormGroup;
  campaigns: any[] = [];
  messages: any[] = [];
  defaultStartDate: string;
  defaultEndDate: string;

  constructor(
    private fb: FormBuilder,
    private messagesService: MessagesService,
    private campaignService: CampaignService,
    private datePipe: DatePipe
  ) {
    const today = new Date();
    this.defaultStartDate =
      this.datePipe.transform(
        new Date(today.getFullYear() - 5, today.getMonth(), today.getDate()),
        'yyyy-MM-dd'
      ) || '';
    this.defaultEndDate =
      this.datePipe.transform(
        new Date(today.getFullYear() + 5, today.getMonth(), today.getDate()),
        'yyyy-MM-dd'
      ) || '';

    this.filterForm = this.fb.group({
      campaign_id: [null],
      startDate: [this.defaultStartDate],
      endDate: [this.defaultEndDate],
    });
  }

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.campaignService
      .getCampaigns(this.defaultStartDate, this.defaultEndDate)
      .subscribe((response) => {
        this.campaigns = response.data;
        if (this.campaigns.length > 0) {
          this.filterForm.controls['campaign_id'].setValue(
            this.campaigns[0].id
          );
          this.loadMessages();
        }
      });
  }

  loadMessages(): void {
    const { campaign_id, startDate, endDate } = this.filterForm.value;

    const formattedStartDate =
      this.datePipe.transform(startDate, 'yyyy-MM-dd') || '';
    const formattedEndDate =
      this.datePipe.transform(endDate, 'yyyy-MM-dd') || '';

    this.messagesService
      .getMessages(formattedStartDate, formattedEndDate, campaign_id)
      .subscribe((response) => {
        this.messages = response.data;
      });
  }

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
