import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Método para registrar o actualizar un cliente
  registerCustomer(customer: {
    customer_id: number;
    name: string;
    status: boolean;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerCustomer`, customer);
  }

  // Método para obtener todos los clientes
  getCustomerAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dev/getCustomerAll`);
  }
}
