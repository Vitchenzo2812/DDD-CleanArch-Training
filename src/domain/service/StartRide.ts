export interface IStartRideService {
  execute(input: StartRideDTO.Input): Promise<void>
}

export namespace StartRideDTO {
  export type Input = {
    ride_id: string;
    position: {
      lat: number,
      long: number  
    };
    date: Date;
  }
}