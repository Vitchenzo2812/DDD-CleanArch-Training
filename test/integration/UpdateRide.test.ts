import sinon from 'sinon';
import PositionRepository from '../../src/infra/repositories/PositionRepositoryDatabase';
import DatabaseConnection from '../../src/application/contracts/DatabaseConnection';
import PgPromiseAdapter from '../../src/infra/database/PgPromiseAdapter';
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory';
import { IUpdateRide } from '../../src/domain/service/UpdateRide';
import UpdateRide from '../../src/application/service/UpdateRide';
import ApplicationError from '../../src/domain/error/ApplicationError';

let sut: IUpdateRide
let connection: DatabaseConnection

beforeAll(async () => {
  connection = new PgPromiseAdapter();
  await connection.connect();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  sut = new UpdateRide(repositoryFactory);
})

test("should add new position", async () => {
  const spy = sinon.spy(PositionRepository.prototype, 'save');
  const input = {
    ride_id: "5ebeccec-269f-4fed-a64c-d00556220f1a",
    position: {
      lat: -25.4923,
      long: -137.8960
    },
    date: new Date()
  }

  await sut.execute(input)
  expect(spy.calledOnce).toBeTruthy();
  spy.restore();
})

test("should throw Error if ride has not started", async () => {
  const input = {
    ride_id: "0e117d56-4b91-4d30-894f-63d749763e2e",
    position: {
      lat: -25.4923,
      long: -137.8960
    },
    date: new Date()
  }

  await expect(() => sut.execute(input)).rejects.toThrow(new ApplicationError("Ride needs to be start!", 400))
})

afterAll(async () => {
  await connection.close();
})