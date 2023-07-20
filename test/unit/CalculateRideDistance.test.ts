import CalculateRide from "../../src/domain/entities/CalculateRide";
import Coord from "../../src/domain/entities/Coord";
import ApplicationError from "../../src/domain/error/ApplicationError";

let sut: CalculateRide

beforeEach(() => {
  sut = new CalculateRide();
})

test("should calculate price ride", () => {
  const from = new Coord(-58.7325, -2.1835);
  const to = new Coord(-75.7536, 166.1735);
  
  sut.addSegment(from, to, new Date("2023-07-10T10:00:00"))
  const output = sut.calculate();
  expect(output).toBe(10578.04);
})

test("should return 0 if from and to is same", () => {
  const from = new Coord(-27.5945, -43.2003);
  const to = new Coord(-27.5945, -43.2003);

  expect(() => sut.addSegment(from, to, new Date("2023-07-10T10:00:00"))).toThrow(new ApplicationError("Invalid distance", 400))
})

test("should calculate ride overnight", () => {
  const from = new Coord(-58.7325, -2.1835);
  const to = new Coord(-75.7536, 166.1735);

  sut.addSegment(from, to, new Date("2023-07-06T23:00:00"));
  const price = sut.calculate()
  expect(price).toBe(19644.92);
})

test("should calculate ride normal", () => {
  const from = new Coord(-58.7325, -2.1835);
  const to = new Coord(-75.7536, 166.1735);

  sut.addSegment(from, to, new Date("2023-07-06T10:00:00"));
  const price = sut.calculate()
  expect(price).toBe(10578.04);
})

test("should calculate ride sunday", () => {
  const from = new Coord(-58.7325, -2.1835);
  const to = new Coord(-75.7536, 166.1735);

  sut.addSegment(from, to, new Date("2023-07-09T10:00:00"));
  const price = sut.calculate()
  expect(price).toBe(14607.76);
})

test("should calculate ride overnight sunday", () => {
  const from = new Coord(-58.7325, -2.1835);
  const to = new Coord(-75.7536, 166.1735);

  sut.addSegment(from, to, new Date("2023-07-09T23:00:00"));
  const price = sut.calculate()
  expect(price).toBe(25185.8);
})

test("should calculate ride min fare", () => {
  const from = new Coord(-58.7325, -2.1835);
  const to = new Coord(-75.7536, 166.1735);

  sut.addSegment(from, to, new Date("2023-07-06T10:00:00"));
  const price = sut.calculate()
  expect(price).toBe(10578.04);
})