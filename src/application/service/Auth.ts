import Cpf from "../../domain/entities/Cpf";
import User from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/User";
import { IAuthService, AuthServiceDTO } from "../../domain/service/Auth";
import IUuidGenerator from "../contracts/IUuidGenerator";
import RepositoryFactory from "../contracts/RepositoryFactory";

export default class AuthService implements IAuthService {
  private userRepository: IUserRepository;

  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly idGenerator: IUuidGenerator,  
  ) {
    this.userRepository = this.repositoryFactory.createUserRepository();
  }

  async SignUp(input: AuthServiceDTO.InputSignUp): Promise<AuthServiceDTO.OutputSignUp> {
      const id = this.idGenerator.generate();
      const document = new Cpf(input.document);
      const user = new User(id, input.type, input.name, input.email, document.getCpf(), input.car_plate);
      await this.userRepository.save(user);
      return { id: user.id };
  }
}