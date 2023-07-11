export interface IAcceptRideService {
  execute(input: AcceptRideServiceDTO.Input): Promise<void>
}

export namespace AcceptRideServiceDTO {
  export type Input = {
    ride_id: string;
    driver_id: string;
  }
}