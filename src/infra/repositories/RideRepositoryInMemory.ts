import Ride from "../../domain/entities/Ride";
import ApplicationError from "../../domain/error/ApplicationError";
import { IRideRepository } from "../../domain/repositories/Ride";

export default class RideRepositoryInMemory implements IRideRepository {
  private rides: Ride[]

  constructor() {
    this.rides = [];
  }
  
  async findById(rideId: string): Promise<Ride> {
    const rideData = this.rides.find(ride => ride.id === rideId);
    if (!rideData) throw new ApplicationError("This ride not exists!", 400);
    return Ride.restore(rideData.id, rideData.passenger_id, rideData.driver_id, rideData.status_ride, rideData.request_date, rideData.accept_date, rideData.from, rideData.to)
  }

  async update(ride: Ride): Promise<void> {
    const rideData = this.findById(ride.id)
    if (!rideData) throw new ApplicationError("This ride not exists!", 400);
    Object.assign(rideData, ride);
  }

  async save(ride: Ride): Promise<void> {
    const rideExists = this.rides.findIndex(rideData => rideData.id === ride.id);
    if (!rideExists) throw new ApplicationError("This User already exists!", 400);
    this.rides.push(ride);
  }
}