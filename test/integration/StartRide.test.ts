import sinon from 'sinon';
import RideRepository from '../../src/infra/repositories/RideRepositoryDatabase';
import { IStartRideService } from '../../src/domain/service/StartRide';
import StartRide from '../../src/application/service/StartRide';
import DatabaseConnection from '../../src/application/contracts/DatabaseConnection';
import PgPromiseAdapter from '../../src/infra/database/PgPromiseAdapter';
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory';
import ApplicationError from '../../src/domain/error/ApplicationError';

let sut: IStartRideService;
let connection: DatabaseConnection;

beforeAll(async () => { 
  connection = new PgPromiseAdapter();
  await connection.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  sut = new StartRide(repositoryFactory);
})

test.skip("should start a ride", async () => {
  const spy = sinon.spy(RideRepository.prototype, 'updateStartRide')
  const input = {
    ride_id: "5ebeccec-269f-4fed-a64c-d00556220f1a",
    position: { lat: -36.7789, long: -20.3905 }, 
    date: new Date()
  }

  await sut.execute(input);
  expect(spy.calledOnce).toBeTruthy();
  spy.restore();
})

test("should throw Error if ride is not accepted", async () => {
  const input = {
    ride_id: "e9865180-b92e-4bd4-b24d-7b3d063cec74",
    position: { lat: -36.7789, long: -20.3905 }, 
    date: new Date()
  }

  await expect(() => sut.execute(input)).rejects.toThrow(new ApplicationError("Ride needs to be Accepted!", 400))
})

test("should throw Error if ride already start", async () => {
  const input = {
    ride_id: "5ebeccec-269f-4fed-a64c-d00556220f1a",
    position: { lat: -36.7789, long: -20.3905 }, 
    date: new Date()
  }

  await expect(() => sut.execute(input)).rejects.toThrow(new ApplicationError("Ride already start!", 400))
})

afterAll(async () => {
  await connection.close();
})