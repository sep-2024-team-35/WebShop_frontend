import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLogged:Boolean=false
  constructor(private router: Router,private authService:AuthService){
    this.authService.loginObserver.subscribe((val) => {
      this.isLogged = val;
      
    
        
      
    });

  }
  login(){
    this.router.navigate(['login']);
  }
}
