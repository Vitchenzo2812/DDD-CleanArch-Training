import sinon from "sinon"
import AcceptRideService from "../../src/application/service/AcceptRide"
import ApplicationError from "../../src/domain/error/ApplicationError"
import { IAcceptRideService } from "../../src/domain/service/AcceptRide"
import InMemoryRepositoryFactory from "../../src/infra/factory/InMemoryRepositoryFactory"
import RideRepositoryInMemory from "../../src/infra/repositories/RideRepositoryInMemory"
import Ride from "../../src/domain/entities/Ride"
import UserRepositoryInMemory from "../../src/infra/repositories/UserRepositoryInMemory"
import User from "../../src/domain/entities/User"

let sut: IAcceptRideService

beforeEach(async () => {
  const repositoryFactory = new InMemoryRepositoryFactory();
  sut = new AcceptRideService(repositoryFactory);
})

test("should accept a ride", async () => {
  const RideStub = sinon.stub(RideRepositoryInMemory.prototype, 'findById').resolves(new Ride("336c6f6d-10cd-4e19-81c9-22d3a269445a", "passenger_id", "c4eba7c7-8fd5-45a5-9cce-a5ff1ab34d09", "Accepted", new Date(), new Date(), { lat: -36.7789, long: -20.3905 }, { lat: -46.2271, long: -116.6852 }))
  const UserStub = sinon.stub(UserRepositoryInMemory.prototype, 'findById').resolves(new User("c4eba7c7-8fd5-45a5-9cce-a5ff1ab34d09", "driver", "Teste", "teste@gmail.com", "29113464400", "AAA9999"))
  const input = {
    ride_id: "336c6f6d-10cd-4e19-81c9-22d3a269445a",
    driver_id: "c4eba7c7-8fd5-45a5-9cce-a5ff1ab34d09"
  }
  const output = await sut.execute(input);
  expect(output.message).toBe("Ride Accepted")
  UserStub.restore();
  RideStub.restore();
})

test("should throw Error if ride not exists", async () => {
  const input = {
    ride_id: "f2a01c89-8913-4bd2-adec-9f956f68b452",
    driver_id: ""
  }
  await expect(() => sut.execute(input)).rejects.toThrow(new ApplicationError("This ride not exists!", 400))
})

test("should throw Error if driver not exists", async () => {
  const RideStub = sinon.stub(RideRepositoryInMemory.prototype, 'findById').resolves(new Ride("336c6f6d-10cd-4e19-81c9-22d3a269445a", "passenger_id", "c4eba7c7-8fd5-45a5-9cce-a5ff1ab34d09", "Accepted", new Date(), new Date(), { lat: -36.7789, long: -20.3905 }, { lat: -46.2271, long: -116.6852 }))
  const input = {
    ride_id: "336c6f6d-10cd-4e19-81c9-22d3a269445a",
    driver_id: "9f31f135-ad5c-4f9d-81a4-eab125b821a5",
  }
  await expect(() => sut.execute(input)).rejects.toThrow(new ApplicationError("User not exists!", 400))
  RideStub.restore();
})