import { Service } from "./service.model";

  export interface SubscriptionDto{
    userId: number;
    startDate: string;
    durationInYears: number;
    status: SubscriptionStatus;
    serviceDTO: Service,
    duePayment:boolean
  }
  export enum SubscriptionStatus {
  CREATED = 'CREATED',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

