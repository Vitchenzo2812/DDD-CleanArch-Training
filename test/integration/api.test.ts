import axios from "axios"
import { AuthServiceDTO } from "../../src/domain/service/Auth"

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
    passenger_id: "229e2339-bb25-471b-9c9a-17756a95eb8a",
    coords: {
      from: { lat: -36.7789, long: -20.3905 },
      to: { lat: -46.2271, long: -116.6852 }
    },
  }

  const response1 = await axios.post('http://localhost:3000/request_ride', input)
  const output1 = response1.data;

  const response2 = await axios.get(`http://localhost:3000/ride/${output1.ride_id}`)
  const output2 = response2.data;

  expect(output1.ride_id).toBe(output2.ride_id);
})

test("should accept ride", async () => {
  const input = {
    ride_id: "a61d3365-9fd2-47df-8db5-e543f05c2b9a",
    driver_id: "3db9687f-8a66-4688-a5ca-ea8f7c0311f1",
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
    ride_id: "d12bd1b8-bab3-4485-a064-6fd9bdbdfdf6"
  }

  const response = await axios.get(`http://localhost:3000/ride/${input.ride_id}`)
  const output = response.data;
  expect(output.passenger.name).toBe("Guilherme")
  expect(output.driver.name).toBe("")
})