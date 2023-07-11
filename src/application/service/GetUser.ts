import { IUserRepository } from "../../domain/repositories/User";
import RepositoryFactory from "../contracts/RepositoryFactory";

export default class GetUser {
  private userRepository: IUserRepository;

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository();
  }

  async execute(id: string) {
    const user = await this.userRepository.findById(id);
    return { id: user.id };
  }
}