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
    ride_id: "d075504e-cda7-4545-92cf-91b04e2daf22"
  }

  const output = await sut.execute(input.ride_id);
  expect(output.id).toBe("d075504e-cda7-4545-92cf-91b04e2daf22");
  expect(output.passenger.name).toBe("Guilherme")
  expect(output.driver.name).toBe("João")
  expect(output.status_ride).toBe("accepted");
  expect(output.distance).toBe(7581.661812288502);
  expect(output.price).toBe(15921.49)
})

test.only("should return a request ride", async () => {
  const input = {
    ride_id: "fa9c6191-554c-418b-89c0-21e58d9c75f0"
  }

  const output = await sut.execute(input.ride_id);
  expect(output.id).toBe("fa9c6191-554c-418b-89c0-21e58d9c75f0");
  expect(output.passenger.name).toBe("Guilherme")
  expect(output.driver.name).toBe("")
  expect(output.waiting_duration).toBe(0)
  expect(output.status_ride).toBe("waiting_driver");
  expect(output.price).toBe(15921.49)
})

afterAll(async () => {
  await connection.close();
})