import CalculateRide from "../../domain/entities/CalculateRide";
import User from "../../domain/entities/User";
import DurationRide from "../../domain/entities/DurationRide";
import { IPositionRepository } from "../../domain/repositories/Position";
import { IRideRepository } from "../../domain/repositories/Ride";
import { IUserRepository } from "../../domain/repositories/User";
import { ConsultRideServiceDTO, Driver, IConsultRideService } from "../../domain/service/ConsultRide";
import RepositoryFactory from "../contracts/RepositoryFactory";

export default class ConsultRideService implements IConsultRideService {
  private userRepository: IUserRepository;
  private rideRepository: IRideRepository;
  private positionRepository: IPositionRepository;

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository();
    this.rideRepository = this.repositoryFactory.createRideRepository();
    this.positionRepository = this.repositoryFactory.createPositionRepository();
  }
  
  async execute(rideId: string): Promise<ConsultRideServiceDTO.Output> {
    const ride = await this.rideRepository.findById(rideId);
    const passenger = await this.userRepository.findById(ride.passenger_id);
    const positions = await this.positionRepository.findById(rideId);

    let driverDataBase: User;
    let driver: Driver = {
      id: "",
      name: "",
      email: "",
      document: "",
      car_plate: ""
    };

    if (ride.driver_id) {
      driverDataBase = await this.userRepository.findById(ride.driver_id);
      driver = {
        id: driverDataBase.id,
        name: driverDataBase.name,
        email: driverDataBase.email.value,
        document: driverDataBase.document.value,
        car_plate: driverDataBase.car_plate!,
      }
    }

    let waiting_duration: number = 0;
    if(ride.accept_date) {
      waiting_duration = DurationRide.calculate(ride.request_date, ride.accept_date)
    }

    const calculateRide = new CalculateRide();
    positions.map(position => calculateRide.addPosition(position.ride_id, position.coords, position.date));
    const price = calculateRide.calculate().price;

    let duration: number = 0;
    if(ride.start_date && ride.end_date) {
      duration = DurationRide.calculate(ride.start_date, ride.end_date);
    }

    return {
      id: ride.id,
      passenger: {
        id: passenger.id,
        name: passenger.name,
        email: passenger.email.value,
        document: passenger.document.value,
      },
      driver,
      status_ride: ride.status_ride,
      waiting_duration,
      distance: calculateRide.distance,
      price,
      ride_duration: duration
    }
  }
}