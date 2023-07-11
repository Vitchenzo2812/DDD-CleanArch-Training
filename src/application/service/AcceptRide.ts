import ApplicationError from "../../domain/error/ApplicationError";
import { IRideRepository } from "../../domain/repositories/Ride";
import { AcceptRideServiceDTO, IAcceptRideService } from "../../domain/service/AcceptRide";
import RepositoryFactory from "../contracts/RepositoryFactory";

export default class AcceptRideService implements IAcceptRideService {
  private rideRepository: IRideRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.rideRepository = this.repositoryFactory.createRideRepository();
  }
  
  async execute(input: AcceptRideServiceDTO.Input): Promise<void> {
    const ride = await this.rideRepository.findById(input.ride_id);
    if(!ride) throw new ApplicationError("This ride not exists!", 400);

    const payload = {
      id: ride.id,
      driver_id: input.driver_id,
      status_ride: "accepted",
      request_date: new Date(),
    }

    await this.rideRepository.update(payload)
  }  
}