import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { ServicesPackagesService } from '../../service/servicesAndPackages/services-packages.service';
import { Service } from '../../model/service.model';
import { Package } from '../../model/package.model';
import { CommonModule, NgFor } from '@angular/common';
import { PaymentRequest } from '../../model/paymentRequest.model';
import { FormsModule, NgModel } from '@angular/forms'; 
import { SubscriptionRequest } from '../../model/subscription';
@Component({
  selector: 'app-show-services-packages',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    FormsModule,],
  templateUrl: './show-services-packages.component.html',
  styleUrl: './show-services-packages.component.css'
})
export class ShowServicesPackagesComponent {

  selectedPackageId: number | null = null; // ID trenutno odabranog paketa
  selectedPaymentMethod: string = ''; // Izabrani način plaćanja
  role:String=''
  services : Service[]=[]
  packages: Package[]=[]
  requestPayment: PaymentRequest={
    userid:0,
    packageid:0,
    price:0,
    type:''
  }
  userId!: number

  subscription: SubscriptionRequest = {
  userId: 0,
  serviceId: 0,
  durationInYears: 1

};
selectedServiceId: number | null = null;
durationInYears: number | null = null;

  constructor(private servicesPackagesService: ServicesPackagesService,private authService: AuthService) {
    this.getAllServices()
    this.getAllPackages()
    this.userId=this.authService.getUserId()
    console.log('userId',this.userId)
  }
 

  getAllServices(){
    this.servicesPackagesService.getAllServices().subscribe({
      next:(response)=>{
       this.services=response
       console.log('uslugee',this.services)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  
  getAllPackages(){
    this.servicesPackagesService.getAllPackages().subscribe({
      next:(response)=>{
       this.packages=response
       console.log('paketi',this.packages)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
 


  buyPackage(packageId:number,price:number){
    this.requestPayment.userid= this.authService.getUserId()
    this.requestPayment.packageid=packageId
    this.requestPayment.price=price
    console.log(this.requestPayment)
    this.servicesPackagesService.buyPackage(this.requestPayment).subscribe({
      next:(response)=>{
       console.log('uspjesno')
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  
  }

  togglePaymentOptions(packageId: number) {
    // Postavlja trenutno izabrani paket, ili poništava izbor
    this.selectedPackageId = this.selectedPackageId === packageId ? null : packageId;
  }

  confirmPayment(packageId: number,price:number, paymentMethod: string) {
    this.requestPayment.userid= this.authService.getUserId()
    this.requestPayment.packageid=packageId
    this.requestPayment.price=price
    this.requestPayment.type=paymentMethod
    console.log(this.requestPayment)
    this.servicesPackagesService.buyPackage(this.requestPayment).subscribe({
      next:(response)=>{
       console.log('uspjesno')
       this.selectedPackageId = null;
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  

selectService(serviceId: number): void {
  this.selectedServiceId = serviceId;
  this.durationInYears = 1;
}


subscribeToService(service: any): void {
  console.log('Subscribing to service:', service);
  
   this.subscription.userId= this.authService.getUserId()
    this.subscription.serviceId=service.id
    if(this.durationInYears != null){
      this.subscription.durationInYears = this.durationInYears;
    }
    console.log("POSLATIII subbb",this.subscription)
      this.servicesPackagesService.subscribeToService(this.subscription).subscribe({
      next:(response)=>{
       console.log('uspjesno')
      },
      error:(err:any)=>{
        console.log(err)
      }
    })}

}
