import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-customer-crud',
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
  ],
  providers: [CustomerService],
  templateUrl: './customer-crud.component.html',
  styleUrls: ['./customer-crud.component.css'],
})
export class CustomerCrudComponent implements OnInit {
  customerForm: FormGroup;
  customers: any[] = [];
  private customerService = inject(CustomerService);

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      customer_id: [null, Validators.required],
      name: ['', Validators.required],
      status: [true, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
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
    if (this.customerForm.valid) {
      this.customerService.registerCustomer(this.customerForm.value).subscribe(
        (response) => {
          alert(response.message);
          this.loadCustomers();
          this.customerForm.reset({ status: true });
        },
        (error) => {
          console.error('Error al registrar el cliente', error);
        }
      );
    }
  }

  editCustomer(customer: any): void {
    this.customerForm.patchValue({
      customer_id: customer.id,
      name: customer.name,
      status: customer.status === '1',
    });
  }
}
