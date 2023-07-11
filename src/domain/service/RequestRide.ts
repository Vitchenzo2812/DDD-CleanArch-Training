export interface IRequestRideService {
  execute(input: RequestRideServiceDTO.Input): Promise<RequestRideServiceDTO.Output>
}

export namespace RequestRideServiceDTO {
  export type Input = {
    passenger_id: string;
    coords: {
      from: { lat: number, long: number },
      to: { lat: number, long: number }
    }
  }

  export type Output = {
    ride_id: string;
  }
}