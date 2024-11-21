import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../model/user.model';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';



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

  user :User={
    username:'',
    password:'',
    email:'',
    id:0,
    role: 'USER'
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

    this.user.username=this.userForm.value.username as string
    this.user.password=this.userForm.value.password as string

    this.authService.login(this.user).subscribe({
      next:(res)=>{
        console.log('login uspjesan', res)
        this.router.navigate(['campaigns'])
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
