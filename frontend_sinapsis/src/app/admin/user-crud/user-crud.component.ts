import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CustomerService } from '../../services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CampaignDialogComponent } from '../../campaign-dialog/campaign-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
  ],
  providers: [UserService, CustomerService],
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css'],
})
export class UserCrudComponent implements OnInit {
  userForm: FormGroup;
  users: any[] = [];
  customers: any[] = [];
  private userService = inject(UserService);
  private customerService = inject(CustomerService);
  private dialog = inject(MatDialog);

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      customer_id: [null, Validators.required],
      username: ['', Validators.required],
      status: [true, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadCustomers();
  }

  loadUsers(): void {
    this.userService.getUserAll().subscribe(
      (response) => {
        this.users = response.data;
      },
      (error) => {
        console.error('Error al cargar los usuarios', error);
      }
    );
  }

  loadCustomers(): void {
    this.customerService.getCustomerAll().subscribe(
      (response) => {
        this.customers = response.data;
      },
      (error) => {
        console.error('Error al cargar los clientes', error);
      }
    );
  }

  submitForm(): void {
    if (this.userForm.valid) {
      this.userService.registerUser(this.userForm.value).subscribe(
        (response) => {
          alert(response.message);
          this.loadUsers();
          this.userForm.reset({ status: true });
        },
        (error) => {
          console.error('Error al registrar el usuario', error);
        }
      );
    }
  }

  editUser(user: any): void {
    this.userForm.patchValue({
      customer_id: user.customer_id,
      username: user.username,
      status: user.status === '1',
    });
  }

  openCampaignDialog(campaigns: any[]): void {
    this.dialog.open(CampaignDialogComponent, {
      data: campaigns,
      width: '400px',
    });
  }
}
