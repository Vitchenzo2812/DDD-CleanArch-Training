import User from "../../domain/entities/User";
import ApplicationError from "../../domain/error/ApplicationError";
import { IUserRepository } from "../../domain/repositories/User";

export default class UserRepositoryInMemory implements IUserRepository {
  private users: User[]

  constructor() {
    this.users = [];
  }
  
  findByEmail(email: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  
  async findById(idUser: string): Promise<User> {
    const userData = this.users.find(user => user.id === idUser);
    if (!userData) throw new ApplicationError("User not exists!", 400)
    return User.restore(userData.id, userData.type, userData.name, userData.email.value, userData.document.value, userData.car_plate);
  }

  async getUsers(): Promise<User[]> {
    const usersData = [...this.users];
    const users: User[] = [];
    for (const userData of usersData) {
      users.push(User.restore(userData.id, userData.type, userData.name, userData.email.value, userData.document.value, userData.car_plate))
    }
    return users;
  }

  async save(user: User): Promise<void> {
    const userExists = this.users.findIndex(userData => userData.id === user.id);
    if (!userExists) throw new ApplicationError("This User already exists!", 400);
    this.users.push(user);
  }  
}