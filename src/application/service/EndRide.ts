import Position from "../../domain/entities/Position";
import ApplicationError from "../../domain/error/ApplicationError";
import { IPositionRepository } from "../../domain/repositories/Position";
import { IRideRepository } from "../../domain/repositories/Ride";
import { IEndRideService } from "../../domain/service/EndRide";
import { PositionTypeInput } from "../../domain/service/PositionTypeInput";
import RepositoryFactory from "../contracts/RepositoryFactory";

export default class EndRide implements IEndRideService {
  private rideRepository: IRideRepository
  private positionRepository: IPositionRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.rideRepository = this.repositoryFactory.createRideRepository();
    this.positionRepository = this.repositoryFactory.createPositionRepository();
  }
  
  async execute(input: PositionTypeInput): Promise<void> {
    const ride = await this.rideRepository.findById(input.ride_id);
    if (!ride.start_date) throw new ApplicationError("Ride needs to be start!", 400);
    if (ride.end_date) throw new ApplicationError("Ride already end!", 400);

    const position = Position.create(ride.id, input.position, input.date);
    await this.positionRepository.save(position);

    const payload = {
      ride_id: ride.id,
      end_date: input.date,
    }

    await this.rideRepository.updateEndRide(payload)
  }
}