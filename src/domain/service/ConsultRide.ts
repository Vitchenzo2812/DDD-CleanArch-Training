import User from "../entities/User";

export interface IConsultRideService {
  execute(input: string): Promise<ConsultRideServiceDTO.Output>
}

export namespace ConsultRideServiceDTO {
  export type Output = {
    id: string;
    passenger: Passenger
    driver: Driver;
    status_ride: string;
    waiting_duration: number;
    distance: number;
    price: number;
    ride_duration: number;
  }
}

export type Passenger = {
  id: string;
  name: string;
  email: string;
  document: string;
}

export type Driver = {
  id: string;
  name: string;
  email: string;
  document: string;
  car_plate: string;
}