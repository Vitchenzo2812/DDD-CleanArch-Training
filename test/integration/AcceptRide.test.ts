import AcceptRideService from "../../src/application/service/AcceptRide"
import ApplicationError from "../../src/domain/error/ApplicationError"
import { IAcceptRideService } from "../../src/domain/service/AcceptRide"
import DatabaseConnection from "../../src/application/contracts/DatabaseConnection"
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter"
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory"

let sut: IAcceptRideService
let connection: DatabaseConnection;

beforeAll(async () => {
  connection = new PgPromiseAdapter();
  await connection.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  sut = new AcceptRideService(repositoryFactory);
})

test("should accept a ride", async () => {
  const input = {
    ride_id: "5ebeccec-269f-4fed-a64c-d00556220f1a",
    driver_id: "ef093e81-a553-482c-af51-95a3d961e2a6"
  }
  const output = await sut.execute(input);
  expect(output.message).toBe("Ride Accepted")
})

test("should throw Error if ride not exists", async () => {
  const input = {
    ride_id: "f2a01c89-8913-4bd2-adec-9f956f68b452",
    driver_id: ""
  }
  await expect(() => sut.execute(input)).rejects.toThrow(new ApplicationError("This ride not exists!", 400))
})

test("should throw Error if driver not exists", async () => {
  const input = {
    ride_id: "5ebeccec-269f-4fed-a64c-d00556220f1a",
    driver_id: "20cd6842-d6ea-4a9f-bee7-de142cdf05a5",
  }
  await expect(() => sut.execute(input)).rejects.toThrow(new ApplicationError("User not exists!", 400))
})

afterAll(async () => {
  await connection.close();
})