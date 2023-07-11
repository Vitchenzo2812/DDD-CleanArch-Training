import { IRideRepository } from "../../domain/repositories/Ride";
import { IUserRepository } from "../../domain/repositories/User";

export default interface RepositoryFactory {
  createUserRepository(): IUserRepository
  createRideRepository(): IRideRepository
}