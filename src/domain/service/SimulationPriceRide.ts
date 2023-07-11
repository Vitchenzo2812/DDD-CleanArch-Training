export interface ISimulationPriceRideService {
  execute(input: SimulationPriceRideServiceDTO.Input): SimulationPriceRideServiceDTO.Output
}

export namespace SimulationPriceRideServiceDTO {
  export type Input = [
    coords: {
      from: { lat: number, long: number },
      to: { lat: number, long: number }
    }
  ]

  export type Output = {
    price: number;
  }
}