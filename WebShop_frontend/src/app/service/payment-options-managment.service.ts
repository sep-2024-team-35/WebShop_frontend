import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../env/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentOptionsManagmentService {

 constructor(private http:HttpClient) { }
 
   apiUrl: string=Environment.apiUrl;
 
  getPaymentOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/psp-subscription/payment-options`);
  }
  
  removePaymentOption(option: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/psp-subscription/payment-option`, option);
  }  
  subscribe(): void {
    this.http.post<void>(`${this.apiUrl}/psp-subscription/subscribe`, {})
      .subscribe({
        next: () => {
          console.log('Subscription request was successful');
        },
        error: (err) => {
          console.error('Subscription request failed', err);
        }
      });
  } 
  
}
