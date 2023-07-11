export interface IAuthService {
  SignUp(input: AuthServiceDTO.InputSignUp): Promise<AuthServiceDTO.OutputSignUp> 
}

export namespace AuthServiceDTO {
  export type InputSignUp = {
    type: 'passenger' | 'driver',
    name: string,
    email: string,
    document: string,
    car_plate?: string,
  }

  export type OutputSignUp = {
    id: string;
  }
}