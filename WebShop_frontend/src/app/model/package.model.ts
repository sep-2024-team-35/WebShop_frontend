import { Service } from "./service.model";

export interface Package{
    id:number,
    name:string,
    services:Service[],
    price:number
}