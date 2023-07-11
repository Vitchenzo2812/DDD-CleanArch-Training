import DatabaseConnection from "../../application/contracts/DatabaseConnection";
import RepositoryFactory from "../../application/contracts/RepositoryFactory";
import { IRideRepository } from "../../domain/repositories/Ride";
import { IUserRepository } from "../../domain/repositories/User";
import RideRepository from "../repositories/RideRepositoryDatabase";
import UserRepository from "../repositories/UserRepositoryDatabase";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  
  constructor(private readonly connection: DatabaseConnection) {}

  createUserRepository(): IUserRepository {
    return new UserRepository(this.connection);
  }
  
  createRideRepository(): IRideRepository {
    return new RideRepository(this.connection);
  }
}