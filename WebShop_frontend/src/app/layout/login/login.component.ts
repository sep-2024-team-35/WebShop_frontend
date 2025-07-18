import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../service/auth/auth.service';
import { LoginRequest } from '../../model/loginRequest.model';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user :LoginRequest={
   
    password:'',
    email:'',
  
  }

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  /**
   *
   */
  constructor(private authService:AuthService,private router:Router) {
    
  }

  login(){

    this.user.email=this.userForm.value.username as string
    this.user.password=this.userForm.value.password as string

    this.authService.login(this.user).subscribe({
      next:(res)=>{
       this.router.navigate(['services'])
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
