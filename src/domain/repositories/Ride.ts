import Ride from "../entities/Ride";

export interface IRideRepository {
  findById(rideId: string): Promise<Ride>
  updateAcceptRide(payload: RideRepositoryDTO.PayloadUpdateAcceptRide): Promise<void>
  updateStartRide(payload: RideRepositoryDTO.PayloadUpdateStartRide): Promise<void>
  save(ride: Ride): Promise<void>
}

export namespace RideRepositoryDTO {
  export type PayloadUpdateAcceptRide = {
    ride_id: string,
    driver_id: string,
    status_ride: string,
    accept_date: Date,
  }
  
  export type PayloadUpdateStartRide = {
    ride_id: string,
    start_date: Date,
  }
}