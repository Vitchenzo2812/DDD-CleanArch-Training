import CalculateRide from "../../domain/entities/CalculateRide";
import { ISimulationPriceRideService, SimulationPriceRideServiceDTO } from "../../domain/service/SimulationPriceRide";

export default class SimulationPriceRideService implements ISimulationPriceRideService {
  private ride: CalculateRide
  private date: Date

  constructor() {
    this.ride = new CalculateRide();
    this.date = new Date("2023-07-10T10:00:00");
  }

  execute(input: SimulationPriceRideServiceDTO.Input): SimulationPriceRideServiceDTO.Output {
    for (const coord in input) {
      this.ride.addSegment(input[coord], this.date);
    }
    const price = this.ride.calculate();
    return { price };
  } 
}