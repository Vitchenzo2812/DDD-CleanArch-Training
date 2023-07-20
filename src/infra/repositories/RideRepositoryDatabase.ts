import DatabaseConnection from "../../application/contracts/DatabaseConnection";
import Coord from "../../domain/entities/Coord";
import Ride from "../../domain/entities/Ride";
import ApplicationError from "../../domain/error/ApplicationError";
import { IRideRepository } from "../../domain/repositories/Ride";

export default class RideRepository implements IRideRepository {

  constructor(private readonly connection: DatabaseConnection) {}
  
  async findById(rideId: string): Promise<Ride> {
    const [rideData] = await this.connection.query("select * from cccat12.ride where ride_id = $1", [rideId])
    if (!rideData) throw new ApplicationError("This ride not exists!", 400);
    return Ride.restore(rideData.ride_id, rideData.passenger_id, rideData.driver_id, rideData.status_ride, new Date(rideData.request_date), rideData.accept_date, rideData.from_distance as Coord, rideData.to_distance as Coord);
  }

  async update(ride: Partial<Ride>): Promise<void> {
    await this.connection.query("update cccat12.ride set driver_id = $1, status_ride = $2, accept_date = $3 where ride_id = $4", [ride.driver_id, ride.status_ride, ride.accept_date, ride.id])
  }

  async save(ride: Ride): Promise<void> {
    await this.connection.query("insert into cccat12.ride (ride_id, passenger_id, driver_id, status_ride, request_date, accept_date, from_distance, to_distance) values ($1, $2, $3, $4, $5, $6, $7, $8)", [ride.id, ride.passenger_id, ride.driver_id, ride.status_ride, ride.request_date, ride.accept_date, JSON.stringify(ride.from), JSON.stringify(ride.to)])
  }
}