import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { PaymentOptionsManagmentService } from '../../service/payment-options-managment.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  paymentOptions: any[] = [];

  constructor(
    private paymentOptionService: PaymentOptionsManagmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPaymentOptions();
  }


  logout(): void {
    this.router.navigate(['/login']);
  }

  loadPaymentOptions(): void {
    this.paymentOptionService.getPaymentOptions().subscribe({
      next: (options) => {
        this.paymentOptions = options;
      },
      error: (err) => {
        console.error('Failed to load payment options', err);
      }
    });
  }

  removePaymentOption(option: any): void {
    this.paymentOptionService.removePaymentOption(option).subscribe({
      next: () => {
        console.log('Removed payment option:', option.name);
        this.loadPaymentOptions();
      },
      error: (err) => {
        console.error('Failed to remove payment option', err);
      }
    });
    this.loadPaymentOptions();
  }  
}

