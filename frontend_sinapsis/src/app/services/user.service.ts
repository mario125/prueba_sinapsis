import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Método para registrar o actualizar un usuario
  registerUser(user: {
    customer_id: number;
    username: string;
    status: boolean;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerUser`, user);
  }

  // Método para obtener todos los usuarios
  getUserAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dev/getUserAll`);
  }
}
