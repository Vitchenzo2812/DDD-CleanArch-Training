import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { AuthServiceDTO } from "../../src/domain/service/Auth"

axios.defaults.validateStatus = function () {
  return true
}

const mock = new MockAdapter(axios);

test("should register a passenger", async () => {
  const input: AuthServiceDTO.InputSignUp = {
    type: 'passenger',
    name: 'Fabiana Ferreira Penas',
    email: 'wfgpenas@gmail.com',
    document: '15618412772',
  }

  mock.onPost('http://localhost:3000/register').reply(200, { id: '123' })

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

  mock.onPost('http://localhost:3000/register').reply(200, { id: '123'})

  const response1 = await axios.post('http://localhost:3000/register', input);
  const output1 = response1.data;
  
  mock.onGet(`http://localhost:3000/passenger/${output1.id}`).reply(200, { id: '123' })

  const response2 = await axios.get(`http://localhost:3000/passenger/${output1.id}`);
  const output2 = response2.data;

  expect(output1.id).toBe(output2.id);
  mock.restore()
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

test("should calculate price of the one segment ride", async () => {
  const input = [
    {
      from: { lat: -36.7789, long: -20.3905 },
      to: { lat: -46.2271, long: -116.6852 }
    },
  ]

  const response = await axios.post('http://localhost:3000/calculate_ride', input)
  const output = response.data;
  expect(output.price).toBe(15921.49);
})

test("should calculate price of the several segment ride", async () => {
  const input = [
    {
      from: { lat: -36.7789, long: -20.3905 },
      to: { lat: -46.2271, long: -116.6852 }
    },
    {
      from: { lat: -36.7789, long: -20.3905 },
      to: { lat: -46.2271, long: -116.6852 }
    },
    {
      from: { lat: -36.7789, long: -20.3905 },
      to: { lat: -46.2271, long: -116.6852 }
    },
  ]

  const response = await axios.post('http://localhost:3000/calculate_ride', input)
  const output = response.data;
  expect(output.price).toBe(47764.47);
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
  const inputPassenger = {
    type: 'passenger',
    name: 'Guilherme',
    email: 'gvitchenzo@gmail.com',
    document: '52354219490'
  }

  const inputDriver = {
    type: 'driver',
    name: 'Fabiana',
    email: 'wfgpenas@gmail.com',
    document: '63121921215',
    car_plate: 'AAA9999'
  }

  const passenger = await axios.post('http://localhost:3000/register', inputPassenger)
  const driver = await axios.post('http://localhost:3000/register', inputDriver)


})