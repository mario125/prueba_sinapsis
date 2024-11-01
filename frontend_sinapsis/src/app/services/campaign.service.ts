import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private apiUrl = 'http://localhost:3000/dev';

  constructor(private http: HttpClient) {}

  // Crear o editar una campaña
  createCampaign(campaignData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createCampaigns`, campaignData);
  }

  // Listar campañas en un rango de fechas
  getCampaigns(startDate: string, endDate: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/campaignsList?startDate=${startDate}&endDate=${endDate}`
    );
  }
  // Simular envío de una campana
  simulateSend(campaignId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/campaigns/${campaignId}/simulate`,
      {}
    );
  }
}
