import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Service } from '../../model/service.model';
import { Observable } from 'rxjs';
import { Environment } from '../../env/environment';
import { Package } from '../../model/package.model';
import { PackagePaymentRequest } from '../../model/paymentRequest.model';
import { SubscriptionRequest } from '../../model/subscription';
import { SubscriptionDto } from '../../model/subscriptionDto.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesPackagesService {

  constructor(private http:HttpClient) { }

  apiUrl: string=Environment.apiUrl;
  getAllServices():Observable<Service[]>{
   
  
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    console.log("Token: ",token)
    return this.http.get<Service[]>(this.apiUrl + 'services',{headers});
  }

  getAllPackages():Observable<Package[]>{
   
  
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<Package[]>(this.apiUrl + 'packages',{headers});
  }

  buyPackage(request:PackagePaymentRequest){
    const token = localStorage.getItem('token')
    console.log(request)
    console.log(token)
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post(this.apiUrl + 'packages/buy',request,{headers});
  }

  subscribeToService(request:SubscriptionRequest){
    const token = localStorage.getItem('token')
    console.log(token)
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post(this.apiUrl + 'subscriptions/subscribe',request,{headers});
  }

  getUserSubscriptions(userId: number): Observable<SubscriptionDto[]> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<SubscriptionDto[]>(`${this.apiUrl}subscriptions/success-subscriptions/${userId}`,{headers});
  }

  cancelSubscription(userId: number, serviceId: number): Observable<void> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post<void>(`${this.apiUrl}subscriptions/${userId}/cancel/${serviceId}`,{}, {headers});
  }

  extendSubscription(userId: number, serviceId: number): Observable<void> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.post<void>(`${this.apiUrl}subscriptions/${userId}/extend/${serviceId}`, {},{headers});
  }
}
