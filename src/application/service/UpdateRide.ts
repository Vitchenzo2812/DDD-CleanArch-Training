import Position from "../../domain/entities/Position";
import ApplicationError from "../../domain/error/ApplicationError";
import { IPositionRepository } from "../../domain/repositories/Position";
import { IRideRepository } from "../../domain/repositories/Ride";
import { PositionTypeInput } from "../../domain/service/PositionTypeInput";
import { IUpdateRide } from "../../domain/service/UpdateRide";
import RepositoryFactory from "../contracts/RepositoryFactory";

export default class UpdateRide implements IUpdateRide {
  private rideRepository: IRideRepository
  private positionRepository: IPositionRepository

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.rideRepository = this.repositoryFactory.createRideRepository();
    this.positionRepository = this.repositoryFactory.createPositionRepository(); 
  }

  async execute(input: PositionTypeInput): Promise<void> {
    const ride = await this.rideRepository.findById(input.ride_id);
    if (!ride.start_date) throw new ApplicationError("Ride needs to be start!", 400);

    const position = Position.create(ride.id, input.position, input.date);
    await this.positionRepository.save(position);
  }
}