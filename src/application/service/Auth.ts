import User from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/User";
import { IAuthService, AuthServiceDTO } from "../../domain/service/Auth";
import RepositoryFactory from "../contracts/RepositoryFactory";

export default class AuthService implements IAuthService {
  private userRepository: IUserRepository;

  constructor(
    private readonly repositoryFactory: RepositoryFactory,
  ) {
    this.userRepository = this.repositoryFactory.createUserRepository();
  }

  async SignUp(input: AuthServiceDTO.InputSignUp): Promise<AuthServiceDTO.OutputSignUp> {
      const user = User.create(input.type, input.name, input.email, input.document, input.car_plate);
      await this.userRepository.save(user);
      return { id: user.id };
  }
}