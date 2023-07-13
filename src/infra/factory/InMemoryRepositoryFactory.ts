import RepositoryFactory from "../../application/contracts/RepositoryFactory";
import { IRideRepository } from "../../domain/repositories/Ride";
import { IUserRepository } from "../../domain/repositories/User";
import RideRepositoryInMemory from "../repositories/RideRepositoryInMemory";
import UserRepositoryInMemory from "../repositories/UserRepositoryInMemory";

export default class InMemoryRepositoryFactory implements RepositoryFactory {
  
  createUserRepository(): IUserRepository {
    return new UserRepositoryInMemory();
  }
  
  createRideRepository(): IRideRepository {
    return new RideRepositoryInMemory();
  }
}