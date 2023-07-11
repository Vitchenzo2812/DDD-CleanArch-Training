import DatabaseConnection from "../../src/application/contracts/DatabaseConnection"
import RequestRideService from "../../src/application/service/RequestRide"
import ApplicationError from "../../src/domain/error/ApplicationError"
import { IRequestRideService, RequestRideServiceDTO } from "../../src/domain/service/RequestRide"
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter"
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory"
import IdGenerator from "../../src/infra/utils/id-generator"

let connection: DatabaseConnection
let sut: IRequestRideService

beforeEach(async () => {
  connection = new PgPromiseAdapter();
  await connection.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const idGenerator = new IdGenerator();
  sut = new RequestRideService(repositoryFactory, idGenerator);
})

test.skip("should request a ride", async () => {
  const input: RequestRideServiceDTO.Input = {
    passenger_id: "229e2339-bb25-471b-9c9a-17756a95eb8a",
    coords: {
      from: { lat: -36.7789, long: -20.3905 },
      to: { lat: -46.2271, long: -116.6852 }
    }
  }

  const output = await sut.execute(input);
  expect(output.ride_id).toBeDefined();
})

test("should throw Error if passenger_id is invalid", async () => {
  const input: RequestRideServiceDTO.Input = {
    passenger_id: "",
    coords: {
      from: { lat: -36.7789, long: -20.3905 },
      to: { lat: -46.2271, long: -116.6852 }
    }
  }
  await expect(() => sut.execute(input)).rejects.toThrow(new ApplicationError("Invalid id", 400))
})

test("should throw Error if passenger not exists", async () => {
  const input: RequestRideServiceDTO.Input = {
    passenger_id: "229e2339-bb25-471b-9c9a-17756b25eb4a",
    coords: {
      from: { lat: -36.7789, long: -20.3905 },
      to: { lat: -46.2271, long: -116.6852 }
    }
  }
  await expect(() => sut.execute(input)).rejects.toThrow(new ApplicationError("User not exists!", 400))
})

afterEach(async () => {
  await connection.close();
})