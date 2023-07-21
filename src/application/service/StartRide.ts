import ApplicationError from "../../domain/error/ApplicationError";
import { IRideRepository } from "../../domain/repositories/Ride";
import { IPositionRepository } from "../../domain/repositories/Position";
import { IStartRideService, StartRideDTO } from "../../domain/service/StartRide";
import RepositoryFactory from "../contracts/RepositoryFactory";
import Position from "../../domain/entities/Position";

export default class StartRide implements IStartRideService {
  private rideRepository: IRideRepository
  private positionRepository: IPositionRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.rideRepository = this.repositoryFactory.createRideRepository();
    this.positionRepository = this.repositoryFactory.createPositionRepository();
  }

  async execute(input: StartRideDTO.Input): Promise<void> {
    const ride = await this.rideRepository.findById(input.ride_id);
    if (ride.status_ride !== "accepted") throw new ApplicationError("Ride needs to be Accepted!", 400);
    
    let position: Position;
    [position] = await this.positionRepository.findById(ride.id);
    if (!position) {
      position = Position.create(ride.id, input.position, input.date);
      await this.positionRepository.save(position);
    }

    const payload = {
      ride_id: ride.id,
      start_date: new Date(),
    }

    await this.rideRepository.updateStartRide(payload)
  }
}