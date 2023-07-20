import User from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/User";
import DatabaseConnection from "../../application/contracts/DatabaseConnection";
import ApplicationError from "../../domain/error/ApplicationError";

export default class UserRepository implements IUserRepository {
  
  constructor(private readonly connection: DatabaseConnection) {}
  
  async findById(idUser: string): Promise<User> {
    const [userData] = await this.connection.query("select * from cccat12.user where user_id = $1", [idUser])
    if (!userData) throw new ApplicationError("User not exists!", 400)
    return User.restore(userData.user_id, userData.type, userData.name, userData.email, userData.document, userData.car_plate)  
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const [userData] = await this.connection.query("select * from cccat12.user where email = $1", [email])
    if(!userData) return;
    return User.restore(userData.user_id, userData.type, userData.name, userData.email, userData.document, userData.car_plate);
  }
  
  async getUsers(): Promise<User[]> {
    const usersData = await this.connection.query("select * from cccat12.user", [])
    const users: User[] = []
    for (const userData of usersData) {
      users.push(User.restore(userData.user_id, userData.type, userData.name, userData.email, userData.document, userData.car_plate))
    }
    return users;
  }
  
  async save(user: User): Promise<void> {
    await this.connection.query("insert into cccat12.user (user_id, type, name, email, document, car_plate) values ($1, $2, $3, $4, $5, $6)", [user.id, user.type, user.name, user.email.value, user.document.value, user.car_plate]);
  }  
}