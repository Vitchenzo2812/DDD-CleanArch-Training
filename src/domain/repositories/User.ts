import User from "../entities/User"

export interface IUserRepository {
  findById(id: string): Promise<User>
  findByEmail(email: string): Promise<User | undefined>
  getUsers(): Promise<User[]>
  save(user: User): Promise<void>
}