import CalculateRide from "../../src/domain/entities/CalculateRide";
import ApplicationError from "../../src/domain/error/ApplicationError";

let sut: CalculateRide

beforeEach(() => {
  sut = new CalculateRide();
})

test("should calculate price ride", () => {  
  sut.addPosition('', { lat: -58.7325, long: -2.1835 }, new Date("2023-07-10T10:00:00"))
  sut.addPosition('', { lat: -75.7536, long: 166.1735 }, new Date("2023-07-10T10:00:00"))
  const output = sut.calculate();
  expect(output).toBe(10578.04);
})

test("should calculate ride overnight", () => {
  sut.addPosition('', { lat: -58.7325, long: -2.1835 }, new Date("2023-07-06T23:00:00"));
  sut.addPosition('', { lat: -75.7536, long: 166.1735 }, new Date("2023-07-06T23:00:00"));
  const price = sut.calculate()
  expect(price).toBe(19644.92);
})

test("should calculate ride normal", () => {
  sut.addPosition('', { lat: -58.7325, long: -2.1835 }, new Date("2023-07-06T10:00:00"));
  sut.addPosition('', { lat: -75.7536, long: 166.1735 }, new Date("2023-07-06T10:00:00"));
  const price = sut.calculate()
  expect(price).toBe(10578.04);
})

test("should calculate ride sunday", () => {
  sut.addPosition('', { lat: -58.7325, long: -2.1835 }, new Date("2023-07-09T10:00:00"));
  sut.addPosition('', { lat: -75.7536, long: 166.1735 }, new Date("2023-07-09T10:00:00"));
  const price = sut.calculate()
  expect(price).toBe(14607.76);
})

test("should calculate ride overnight sunday", () => {
  sut.addPosition('', { lat: -58.7325, long: -2.1835 }, new Date("2023-07-09T23:00:00"));
  sut.addPosition('', { lat: -75.7536, long: 166.1735 }, new Date("2023-07-09T23:00:00"));
  const price = sut.calculate()
  expect(price).toBe(25185.8);
})

test("should calculate ride min fare", () => {
  sut.addPosition('', { lat: -58.7325, long: -2.1835 }, new Date("2023-07-06T10:00:00"));
  sut.addPosition('', { lat: -75.7536, long: 166.1735 }, new Date("2023-07-06T10:00:00"));
  const price = sut.calculate()
  expect(price).toBe(10578.04);
})

test("should throw Error if date is invalid", () => {
  sut.addPosition('', { lat: -58.7325, long: -2.1835 }, new Date("test"))
  sut.addPosition('', { lat: -75.7536, long: 166.1735 }, new Date("test"))
  expect(() => sut.calculate()).toThrow(new ApplicationError("Invalid date", 400))
})