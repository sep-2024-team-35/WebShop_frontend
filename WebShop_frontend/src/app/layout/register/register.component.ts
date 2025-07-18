import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { User } from '../../model/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
   FormsModule,
   MatFormFieldModule,
   MatInputModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

 
  constructor(private authService:AuthService,private router:Router) {
    
  }
  
  user :User={
    email:'',
    password:'',
    firstname:'',
    lastname:'',
    id:0,
     role: 'CUSTOMER'
  }

  onSubmit(){
    this.authService.register(this.user).subscribe({
      next:(res)=>{
        console.log(res)
        this.router.navigate(['login'])
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
