export interface IAcceptRideService {
  execute(input: AcceptRideServiceDTO.Input): Promise<AcceptRideServiceDTO.Output>
}

export namespace AcceptRideServiceDTO {
  export type Input = {
    ride_id: string;
    driver_id: string;
  }

  export type Output = {
    message: string;
  }
}