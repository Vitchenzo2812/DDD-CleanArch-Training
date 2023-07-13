import Coord from "../../domain/entities/Coord";
import Ride from "../../domain/entities/Ride";
import ApplicationError from "../../domain/error/ApplicationError";
import { IRideRepository } from "../../domain/repositories/Ride";
import { IUserRepository } from "../../domain/repositories/User";
import { IRequestRideService, RequestRideServiceDTO } from "../../domain/service/RequestRide";
import RepositoryFactory from "../contracts/RepositoryFactory";

export default class RequestRideService implements IRequestRideService {
  private userRepository: IUserRepository;
  private rideRepository: IRideRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository()
    this.rideRepository = this.repositoryFactory.createRideRepository();
  }

  async execute(input: RequestRideServiceDTO.Input): Promise<RequestRideServiceDTO.Output> {
      if (!input.passenger_id) throw new ApplicationError("Invalid id", 400)
  
      const passenger = await this.userRepository.findById(input.passenger_id);

      const from = new Coord(input.coords.from.lat, input.coords.from.long);
      const to = new Coord(input.coords.to.lat, input.coords.to.long);
      const ride = Ride.create(passenger.id, from, to);
      await this.rideRepository.save(ride);
  
      return { ride_id: ride.id }
  }
}