import RequestRideService from "../../src/application/service/RequestRide"
import ApplicationError from "../../src/domain/error/ApplicationError"
import { IRequestRideService, RequestRideServiceDTO } from "../../src/domain/service/RequestRide"
import sinon from 'sinon'
import InMemoryRepositoryFactory from "../../src/infra/factory/InMemoryRepositoryFactory"
import User from "../../src/domain/entities/User"
import UserRepositoryInMemory from "../../src/infra/repositories/UserRepositoryInMemory"

let sut: IRequestRideService

beforeEach(async () => {
  const repositoryFactory = new InMemoryRepositoryFactory();
  sut = new RequestRideService(repositoryFactory);
})

test("should request a ride", async () => {
  const UserStub = sinon.stub(UserRepositoryInMemory.prototype, "findById").resolves(new User("d753e682-10be-4b1b-ac36-393a24bd4127", "passenger", "Teste", "teste@gmail.com", "70962823430", ""));

  const input: RequestRideServiceDTO.Input = {
    passenger_id: "d753e682-10be-4b1b-ac36-393a24bd4127",
    coords: {
      from: { lat: -36.7789, long: -20.3905 },
      to: { lat: -46.2271, long: -116.6852 }
    }
  }

  const output = await sut.execute(input);
  expect(output.ride_id).toBeDefined();
  UserStub.restore();
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