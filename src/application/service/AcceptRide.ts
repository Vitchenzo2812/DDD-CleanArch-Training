import { IRideRepository } from "../../domain/repositories/Ride";
import { IUserRepository } from "../../domain/repositories/User";
import { AcceptRideServiceDTO, IAcceptRideService } from "../../domain/service/AcceptRide";
import RepositoryFactory from "../contracts/RepositoryFactory";

export default class AcceptRideService implements IAcceptRideService {
  private rideRepository: IRideRepository;
  private userRepository: IUserRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.rideRepository = this.repositoryFactory.createRideRepository();
    this.userRepository = this.repositoryFactory.createUserRepository();
  }
  
  async execute(input: AcceptRideServiceDTO.Input): Promise<AcceptRideServiceDTO.Output> {
    const ride = await this.rideRepository.findById(input.ride_id);
    const driver = await this.userRepository.findById(input.driver_id);

    const payload = {
      id: ride.id,
      driver_id: driver.id,
      status_ride: "accepted",
      accept_date: new Date(),
    }

    await this.rideRepository.update(payload)

    return { message: "Ride Accepted" }
  }  
}