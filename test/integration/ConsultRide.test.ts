import DatabaseConnection from "../../src/application/contracts/DatabaseConnection";
import ConsultRideService from "../../src/application/service/ConsultRide";
import { IConsultRideService } from "../../src/domain/service/ConsultRide"
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";

let sut: IConsultRideService
let connection: DatabaseConnection

beforeAll(async () => {
  connection = new PgPromiseAdapter();
  await connection.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  sut = new ConsultRideService(repositoryFactory);
})

test("should return a accepted ride", async () => {
  const input = {
    ride_id: "3b6187ce-7a7d-4227-ac39-ce8c7726c97d"
  }

  const output = await sut.execute(input.ride_id);
  expect(output.id).toBe("3b6187ce-7a7d-4227-ac39-ce8c7726c97d");
  expect(output.passenger.name).toBe("Guilherme")
  expect(output.driver.name).toBe("Lucas")
  expect(output.status_ride).toBe("accepted");
  expect(output.price).toBe(163328.71);
  expect(output.distance).toBe(8554.702755318845);
  expect(output.ride_duration).toBe(7);
})

test("should return a request ride", async () => {
  const input = {
    ride_id: "e9865180-b92e-4bd4-b24d-7b3d063cec74"
  }

  const output = await sut.execute(input.ride_id);
  expect(output.id).toBe("e9865180-b92e-4bd4-b24d-7b3d063cec74");
  expect(output.passenger.name).toBe("Guilherme")
  expect(output.driver.name).toBe("")
  expect(output.waiting_duration).toBe(0)
  expect(output.status_ride).toBe("waiting_driver");
})

afterAll(async () => {
  await connection.close();
})