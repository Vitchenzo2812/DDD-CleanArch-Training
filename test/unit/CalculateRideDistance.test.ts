import CalculateRide from "../../src/domain/entities/CalculateRide";
import ApplicationError from "../../src/domain/error/ApplicationError";

let sut: CalculateRide

beforeEach(() => {
  sut = new CalculateRide();
})

test("should calculate price ride", () => {
  const coords = {
    from: { lat: -58.7325, long: -2.1835 }, 
    to: { lat: -75.7536, long: 166.1735 } 
  }
  
  sut.addSegment(coords, new Date("2023-07-10T10:00:00"))
  const output = sut.calculate();
  expect(output).toBe(10578.04);
})

test("should return 0 if from and to is same", () => {
  const coords = {
    from: { lat: -27.5945, long: -43.2003 }, 
    to: { lat: -27.5945, long: -43.2003 } 
  }
  
  expect(() => sut.addSegment(coords, new Date("2023-07-10T10:00:00"))).toThrow(new ApplicationError("Invalid distance", 400))
})

test("should calculate ride overnight", () => {
  const coords = { 
    from: { lat: -58.7325, long: -2.1835 }, 
    to: { lat: -75.7536, long: 166.1735 } 
  }
  sut.addSegment(coords, new Date("2023-07-06T23:00:00"));
  const price = sut.calculate()
  expect(price).toBe(19644.92);
})

test("should calculate ride normal", () => {
  const coords = { 
    from: { lat: -58.7325, long: -2.1835 }, 
    to: { lat: -75.7536, long: 166.1735 } 
  }
  sut.addSegment(coords, new Date("2023-07-06T10:00:00"));
  const price = sut.calculate()
  expect(price).toBe(10578.04);
})

test("should calculate ride sunday", () => {
  const coords = { 
    from: { lat: -58.7325, long: -2.1835 }, 
    to: { lat: -75.7536, long: 166.1735 } 
  }
  sut.addSegment(coords, new Date("2023-07-09T10:00:00"));
  const price = sut.calculate()
  expect(price).toBe(14607.76);
})

test("should calculate ride overnight sunday", () => {
  const coords = { 
    from: { lat: -58.7325, long: -2.1835 }, 
    to: { lat: -75.7536, long: 166.1735 } 
  }
  sut.addSegment(coords, new Date("2023-07-09T23:00:00"));
  const price = sut.calculate()
  expect(price).toBe(25185.8);
})

test("should calculate ride min fare", () => {
  const coords = { 
    from: { lat: -58.7325, long: -2.1835 }, 
    to: { lat: -75.7536, long: 166.1735 } 
  }
  sut.addSegment(coords, new Date("2023-07-06T10:00:00"));
  const price = sut.calculate()
  expect(price).toBe(10578.04);
})