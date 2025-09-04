import { Service } from "./service.model";

  export interface SubscriptionDto{
    userId: number;
    startDate: string;
    durationInYears: number;
    status: SubscriptionStatus;
    serviceDTO: Service
  }
  export enum SubscriptionStatus {
  CREATED = 'CREATED',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

