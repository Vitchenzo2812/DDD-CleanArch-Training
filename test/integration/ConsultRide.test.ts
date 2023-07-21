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
    ride_id: "5ebeccec-269f-4fed-a64c-d00556220f1a"
  }

  const output = await sut.execute(input.ride_id);
  expect(output.id).toBe("5ebeccec-269f-4fed-a64c-d00556220f1a");
  expect(output.passenger.name).toBe("Fabiana Ferreira Penas")
  expect(output.driver.name).toBe("Lucas")
  expect(output.status_ride).toBe("accepted");
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