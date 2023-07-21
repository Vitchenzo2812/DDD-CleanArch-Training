import { IRideRepository } from "../../domain/repositories/Ride";
import { IPositionRepository } from "../../domain/repositories/Position";
import { IUserRepository } from "../../domain/repositories/User";

export default interface RepositoryFactory {
  createUserRepository(): IUserRepository
  createRideRepository(): IRideRepository
  createPositionRepository(): IPositionRepository
}