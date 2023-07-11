import SimulationPriceRideService from "../../src/application/service/SimulationPriceRide";
import { ISimulationPriceRideService } from "../../src/domain/service/SimulationPriceRide";
import { SimulationPriceRideServiceDTO } from "../../src/domain/service/SimulationPriceRide";

let sut: ISimulationPriceRideService

beforeEach(() => {
  sut = new SimulationPriceRideService();
})

test("should return price of the one segment", () => {
  const input = [
    {
      from: { lat: -36.7789, long: -20.3905 },
      to: { lat: -46.2271, long: -116.6852 }
    },
  ]

  const output = sut.execute(input as SimulationPriceRideServiceDTO.Input)
  expect(output.price).toBe(15921.49);
})

test("should return price of the several segments", () => {
  const input = [
    {
      from: { lat: -36.7789, long: -20.3905 },
      to: { lat: -46.2271, long: -116.6852 }
    },
    {
      from: { lat: -36.7789, long: -20.3905 },
      to: { lat: -46.2271, long: -116.6852 }
    },
    {
      from: { lat: -36.7789, long: -20.3905 },
      to: { lat: -46.2271, long: -116.6852 }
    },
  ]

  const output = sut.execute(input as SimulationPriceRideServiceDTO.Input)
  expect(output.price).toBe(47764.47);
})