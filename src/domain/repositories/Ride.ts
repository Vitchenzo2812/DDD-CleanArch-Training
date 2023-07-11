import Ride from "../entities/Ride";

export interface IRideRepository {
  findById(rideId: string): Promise<Ride>
  update(ride: Partial<Ride>): Promise<void> 
  save(ride: Ride): Promise<void>
}