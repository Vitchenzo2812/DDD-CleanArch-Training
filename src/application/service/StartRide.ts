import ApplicationError from "../../domain/error/ApplicationError";
import { IRideRepository } from "../../domain/repositories/Ride";
import { IPositionRepository } from "../../domain/repositories/Position";
import { IStartRideService } from "../../domain/service/StartRide";
import RepositoryFactory from "../contracts/RepositoryFactory";
import Position from "../../domain/entities/Position";
import { PositionTypeInput } from "../../domain/service/PositionTypeInput";

export default class StartRide implements IStartRideService {
  private rideRepository: IRideRepository
  private positionRepository: IPositionRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.rideRepository = this.repositoryFactory.createRideRepository();
    this.positionRepository = this.repositoryFactory.createPositionRepository();
  }

  async execute(input: PositionTypeInput): Promise<void> {
    const ride = await this.rideRepository.findById(input.ride_id);
    if (ride.status_ride !== "accepted") throw new ApplicationError("Ride needs to be Accepted!", 400);
    if (ride.start_date) throw new ApplicationError("Ride already start!", 400)

    const position = Position.create(ride.id, input.position, input.date);
    await this.positionRepository.save(position);

    const payload = {
      ride_id: ride.id,
      start_date: new Date(),
    }

    await this.rideRepository.updateStartRide(payload)
  }
}