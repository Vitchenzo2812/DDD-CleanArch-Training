import RequestRideService from "../../src/application/service/RequestRide"
import ApplicationError from "../../src/domain/error/ApplicationError"
import { IRequestRideService, RequestRideServiceDTO } from "../../src/domain/service/RequestRide"
import DatabaseConnection from "../../src/application/contracts/DatabaseConnection"
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter"
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory"

let sut: IRequestRideService
let connection: DatabaseConnection

beforeAll(async () => {
  connection = new PgPromiseAdapter();
  await connection.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  sut = new RequestRideService(repositoryFactory);
})

test.each([
  "13f00d27-e75b-4386-8060-249ac41e48d9",
  "ea704b84-b24e-4811-ad25-19668aa7468e"
])("should request a ride", async (idPassenger) => {
  const input: RequestRideServiceDTO.Input = {
    passenger_id: idPassenger,
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
    passenger_id: "219e2539-bb25-471b-9c9a-17756a95eb8b",
    coords: {
      from: { lat: -36.7789, long: -20.3905 },
      to: { lat: -46.2271, long: -116.6852 }
    }
  }
  await expect(() => sut.execute(input)).rejects.toThrow(new ApplicationError("User not exists!", 400))
})

afterAll(async () => {
  await connection.close();
})