import { Component } from '@angular/core';
import { SubscriptionDto } from '../../model/subscriptionDto.model';
import { ServicesPackagesService } from '../../service/servicesAndPackages/services-packages.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-subscriptions',
  standalone: true,
  imports: [CommonModule,NgFor,
    FormsModule,],
  templateUrl: './my-subscriptions.component.html',
  styleUrl: './my-subscriptions.component.css'
})
export class MySubscriptionsComponent {
 subscriptions: SubscriptionDto[] = [];
  userId: number = 1; // ovde stavi userId trenutno ulogovanog usera (npr. iz auth servisa)

  constructor(private subscriptionService: ServicesPackagesService) {}

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.subscriptionService.getUserSubscriptions(this.userId).subscribe({
      next: (data) => {
        this.subscriptions = data;
        console.log("DObijeni success: ",data);
      },
      error: (err) => {
        console.error('Error loading subscriptions:', err);
      }
    });
  }

  cancelSubscription(sub: SubscriptionDto): void {
    this.subscriptionService.cancelSubscription(sub.userId, sub.serviceDTO.id).subscribe({
      next: () => {
        alert('Subscription canceled!');
        this.loadSubscriptions();
      },
      error: (err) => console.error('Error canceling subscription', err)
    });
  }

  extendSubscription(sub: SubscriptionDto): void {
    this.subscriptionService.extendSubscription(sub.userId, sub.serviceDTO.id).subscribe({
      next: () => {
        alert('Subscription extended!');
        this.loadSubscriptions();
      },
      error: (err) => console.error('Error extending subscription', err)
    });
  }
}
