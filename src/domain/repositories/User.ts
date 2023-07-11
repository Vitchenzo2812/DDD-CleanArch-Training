import User from "../entities/User"

export interface IUserRepository {
  findById(id: string): Promise<User>
  getUsers(): Promise<User[]>
  save(user: User): Promise<void>
}