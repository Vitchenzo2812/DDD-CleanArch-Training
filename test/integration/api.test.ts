import axios from "axios"
import { AuthServiceDTO } from "../../src/domain/service/Auth"
import Sinon from "sinon"
import RideRepository from "../../src/infra/repositories/RideRepositoryDatabase"

axios.defaults.validateStatus = function () {
  return true
}

test("should register a passenger", async () => {
  const input: AuthServiceDTO.InputSignUp = {
    type: 'passenger',
    name: 'Fabiana Ferreira Penas',
    email: 'wfgpenas@gmail.com',
    document: '15618412772',
  }

  const response = await axios.post('http://localhost:3000/register', input);
  const output = response.data;

  expect(output).toBeDefined();
})

test("should register a passenger and return id", async () => {
  const input: AuthServiceDTO.InputSignUp = {
    type: 'passenger',
    name: 'Fabiana Ferreira Penas',
    email: 'wfgpenas@gmail.com',
    document: '15618412772',
  }

  const response1 = await axios.post('http://localhost:3000/register', input);
  const output1 = response1.data;

  const response2 = await axios.get(`http://localhost:3000/passenger/${output1.id}`);
  const output2 = response2.data;

  expect(output1.id).toBe(output2.id);
})

test("should register a driver and return id", async () => {
  const input: AuthServiceDTO.InputSignUp = {
    type: 'driver',
    name: 'Pedro',
    email: 'pedrogames@gmail.com',
    document: '745.878.878-03',
  }

  const response1 = await axios.post('http://localhost:3000/register', input);
  const output1 = response1.data;

  const response2 = await axios.get(`http://localhost:3000/passenger/${output1.id}`);
  const output2 = response2.data;

  expect(output1.id).toBe(output2.id);
})

test("should throw Error if driver not have car plate", async () => {
  const input: AuthServiceDTO.InputSignUp = {
    type: 'driver',
    name: 'Lebrom',
    email: 'LebromJames@gmail.com',
    document: '745.878.878-03',
    car_plate: '',
  }

  const response = await axios.post('http://localhost:3000/register', input);
  const output = response.data;

  expect(output.message).toBe("Driver must have a car plate!");
})

test("should request ride and return id ride", async () => {
  const input = {
    passenger_id: "349f82eb-4717-44c0-ba26-878b30185cba",
    coords: {
      from: { lat: -36.7789, long: -20.3905 },
      to: { lat: -46.2271, long: -116.6852 }
    },
  }

  const response1 = await axios.post('http://localhost:3000/request_ride', input)
  const output1 = response1.data;

  const response2 = await axios.get(`http://localhost:3000/ride/${output1.ride_id}`)
  const output2 = response2.data;

  expect(output1.ride_id).toBe(output2.id);
})

test("should accept ride", async () => {
  const input = {
    ride_id: "0d5102b2-8142-46a3-ba86-350c810a44ee",
    driver_id: "91818dd3-67da-4761-9e94-b0eca7485628",
  }

  const response = await axios.post("http://localhost:3000/accept_ride", input)
  const output = response.data;

  expect(output.message).toBe("Ride Accepted")
})

test("should throw Error if ride not exists", async () => {
  const input = {
    ride_id: "a51d3365-9fd2-47df-8db5-e543f05c2b9a",
    driver_id: "3db9687f-8a66-4688-a5ca-ea8f7c0311f1",
  }

  const response = await axios.post("http://localhost:3000/accept_ride", input)
  const output = response.data;

  expect(output.message).toBe("This ride not exists!")
})

test("should return ride info", async () => {
  const input = {
    ride_id: "67dca655-56c6-4fd6-8102-725e1b660edc"
  }

  const response = await axios.get(`http://localhost:3000/ride/${input.ride_id}`)
  const output = response.data;
  expect(output.passenger.name).toBe("Fabiana Ferreira Penas")
  expect(output.driver.name).toBe("Lucas")
})

test("should start a ride", async () => {
  const spy = Sinon.spy(RideRepository.prototype, 'updateStartRide')
  const input = {
    ride_id: "",
    position: {},
    date: new Date()
  }

  await axios.post("http://localhost:3000/start_ride", input);

  expect(spy.calledOnce).toBeTruthy();
  spy.restore();
})