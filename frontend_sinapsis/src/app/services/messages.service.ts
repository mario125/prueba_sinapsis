import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private apiUrl = 'http://localhost:3000/dev';

  constructor(private http: HttpClient) {}

  // Obtener mensajes filtrados por rango de fechas y usuario (campaña)
  getMessages(
    startDate: string,
    endDate: string,
    campaignId: number
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/messagesList?startDate=${startDate}&endDate=${endDate}&campaignId=${campaignId}`
    );
  }
}
