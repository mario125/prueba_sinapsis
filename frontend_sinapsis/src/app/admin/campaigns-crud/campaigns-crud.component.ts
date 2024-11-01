import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CampaignService } from '../../services/campaign.service';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DatePipe, CommonModule } from '@angular/common';
import { MessagesDialogComponent } from './messages-dialog/messages-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-campaign-crud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatNativeDateModule,
    MatDialogModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatMenuModule,
  ],
  templateUrl: './campaigns-crud.component.html',
  styleUrls: ['./campaigns-crud.component.css'],
  providers: [CampaignService, UserService, DatePipe],
})
export class CampaignCrudComponent implements OnInit {
  campaignForm: FormGroup;
  users: any[] = [];
  campaigns: any[] = [];
  defaultStartDate: string;
  defaultEndDate: string;
  loadingCampaignId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private campaignService: CampaignService,
    private userService: UserService,
    private dialog: MatDialog,
    private datePipe: DatePipe
  ) {
    this.campaignForm = this.fb.group({
      user_id: [null, Validators.required],
      name: ['', Validators.required],
      process_date: ['', Validators.required],
      process_hour: [
        '',
        [
          Validators.required,
          Validators.pattern(/^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/),
        ],
      ],
      process_status: ['1', Validators.required],
      phone_list: [
        '',
        [Validators.required, Validators.pattern(/^(\+\d{10,15}\|?)+$/)],
      ],
      message_text: ['', Validators.required],
    });

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
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadCampaigns(this.defaultStartDate, this.defaultEndDate);
  }

  loadUsers(): void {
    this.userService.getUserAll().subscribe((response) => {
      this.users = response.data;
    });
  }

  loadCampaigns(startDate: string, endDate: string): void {
    this.campaignService
      .getCampaigns(startDate, endDate)
      .subscribe((response) => {
        this.campaigns = response.data.sort(
          (a: any, b: any) =>
            new Date(b.process_date).getTime() -
            new Date(a.process_date).getTime()
        );
      });
  }

  submitForm(): void {
    if (this.campaignForm.valid) {
      const campaignData = { ...this.campaignForm.value };
      campaignData.process_date = this.datePipe.transform(
        this.campaignForm.get('process_date')?.value,
        'yyyy-MM-dd'
      );

      this.campaignService
        .createCampaign(campaignData)
        .subscribe((response) => {
          alert(response.message);
          this.loadCampaigns(this.defaultStartDate, this.defaultEndDate);
          this.campaignForm.reset({
            process_status: '1',
          });
        });
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }

  editCampaign(campaign: any): void {
    if (campaign.process_status !== 1) {
      alert('Solo se pueden editar campañas en estado Pendiente.');
      return;
    }
    this.campaignForm.patchValue({
      user_id: campaign.user_id,
      name: campaign.name,
      process_date: new Date(campaign.process_date),
      process_hour: campaign.process_hour,
      process_status: campaign.process_status.toString(),
      phone_list: campaign.phone_list,
      message_text: campaign.message_text,
    });
  }

  simulateCampaign(campaign: any): void {
    if (campaign.process_status !== 1) {
      alert(
        "La campaña no está en estado 'pendiente', no se puede simular el envío."
      );
      return;
    }

    this.loadingCampaignId = campaign.id;

    this.campaignService.simulateSend(campaign.id).subscribe({
      next: (response) => {
        alert(response.message);
        this.loadingCampaignId = null;
        this.loadCampaigns(this.defaultStartDate, this.defaultEndDate);
      },
      error: (error) => {
        console.error('Error al simular el envío:', error);
        this.loadingCampaignId = null;
      },
    });
  }

  openMessagesDialog(messages: any[]): void {
    this.dialog.open(MessagesDialogComponent, {
      data: messages,
    });
  }
}
