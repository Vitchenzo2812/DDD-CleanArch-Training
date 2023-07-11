import Ride from "../../domain/entities/Ride";
import ApplicationError from "../../domain/error/ApplicationError";
import { IRideRepository } from "../../domain/repositories/Ride";
import { IUserRepository } from "../../domain/repositories/User";
import { IRequestRideService, RequestRideServiceDTO } from "../../domain/service/RequestRide";
import IUuidGenerator from "../contracts/IUuidGenerator";
import RepositoryFactory from "../contracts/RepositoryFactory";

export default class RequestRideService implements IRequestRideService {
  private userRepository: IUserRepository;
  private rideRepository: IRideRepository;

  constructor(readonly repositoryFactory: RepositoryFactory, readonly idGenerator: IUuidGenerator) {
    this.userRepository = this.repositoryFactory.createUserRepository()
    this.rideRepository = this.repositoryFactory.createRideRepository();
  }

  async execute(input: RequestRideServiceDTO.Input): Promise<RequestRideServiceDTO.Output> {
    if (!input.passenger_id) throw new ApplicationError("Invalid id", 400)

    const passenger = await this.userRepository.findById(input.passenger_id);

    const id = this.idGenerator.generate();
    const ride = new Ride(id, passenger.id, null, 'waiting_driver', new Date())
    await this.rideRepository.save(ride)

    return { ride_id: ride.id }
  }
}