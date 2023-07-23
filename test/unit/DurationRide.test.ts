import DurationRide from "../../src/domain/entities/DurationRide";

test("should calculate waiting duration ride", () => {
  const input = {
    request_date: new Date('2023-07-20T10:00:00'),
    accept_date: new Date('2023-07-20T11:00:00'),
  }

  const output = DurationRide.calculate(input.request_date, input.accept_date);
  expect(output).toBe(60);
})