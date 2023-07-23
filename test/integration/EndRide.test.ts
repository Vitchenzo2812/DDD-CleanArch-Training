import sinon from 'sinon';
import RideRepository from '../../src/infra/repositories/RideRepositoryDatabase';
import DatabaseConnection from '../../src/application/contracts/DatabaseConnection';
import PgPromiseAdapter from '../../src/infra/database/PgPromiseAdapter';
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory';
import EndRide from '../../src/application/service/EndRide';
import { IEndRideService } from '../../src/domain/service/EndRide';
import ApplicationError from '../../src/domain/error/ApplicationError';

let sut: IEndRideService;
let connection: DatabaseConnection;

beforeAll(async () => { 
  connection = new PgPromiseAdapter();
  await connection.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  sut = new EndRide(repositoryFactory);
})

test.skip("should end a ride", async () => {
  const spy = sinon.spy(RideRepository.prototype, 'updateEndRide')
  const input = {
    ride_id: "3b6187ce-7a7d-4227-ac39-ce8c7726c97d",
    position: {
      lat: -46.2271, 
      long: -116.6852
    },
    date: new Date(),
  }

  await sut.execute(input)
  expect(spy.calledOnce).toBeTruthy();
  spy.restore();
})

test("should throw Error if ride has not started", async () => {
  const input = {
    ride_id: "92cac6ba-8375-4eb5-b58a-926ac09021da",
    position: {
      lat: -46.2271, 
      long: -116.6852
    },
    date: new Date(),
  }

  await expect(() => sut.execute(input)).rejects.toThrow(new ApplicationError("Ride needs to be start!", 400))
})

test("should throw Error if ride has already end", async () => {
  const input = {
    ride_id: "3b6187ce-7a7d-4227-ac39-ce8c7726c97d",
    position: {
      lat: -46.2271, 
      long: -116.6852
    },
    date: new Date(),
  }

  await expect(() => sut.execute(input)).rejects.toThrow(new ApplicationError("Ride already end!", 400))
})

afterAll(async () => {
  await connection.close();
})