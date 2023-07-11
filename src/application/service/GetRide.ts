import { IRideRepository } from "../../domain/repositories/Ride";
import RepositoryFactory from "../contracts/RepositoryFactory";

export default class GetRide {
  private rideRepository: IRideRepository;

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.rideRepository = this.repositoryFactory.createRideRepository();
  }

  async execute(rideId: string) {
    const ride = await this.rideRepository.findById(rideId);
    return ride;
  }
}