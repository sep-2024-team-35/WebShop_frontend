import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { ServicesPackagesService } from '../../service/servicesAndPackages/services-packages.service';
import { Service } from '../../model/service.model';
import { Package } from '../../model/package.model';
import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'app-show-services-packages',
  standalone: true,
  imports: [
    CommonModule,
    NgFor],
  templateUrl: './show-services-packages.component.html',
  styleUrl: './show-services-packages.component.css'
})
export class ShowServicesPackagesComponent {

  role:String=''
  services : Service[]=[]
  packages: Package[]=[]

  
  constructor(private servicesPackagesService: ServicesPackagesService,private authService: AuthService) {
    this.getAllServices()
    this.getAllPackages()
    
    
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
 


 
  


}
