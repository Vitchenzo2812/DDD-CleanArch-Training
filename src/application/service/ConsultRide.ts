import CalculateRide from "../../domain/entities/CalculateRide";
import User from "../../domain/entities/User";
import WaitingDurationRide from "../../domain/entities/WaitingDurationRide";
import { IRideRepository } from "../../domain/repositories/Ride";
import { IUserRepository } from "../../domain/repositories/User";
import { ConsultRideServiceDTO, Driver, IConsultRideService } from "../../domain/service/ConsultRide";
import RepositoryFactory from "../contracts/RepositoryFactory";

export default class ConsultRideService implements IConsultRideService {
  private userRepository: IUserRepository;
  private rideRepository: IRideRepository;

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository();
    this.rideRepository = this.repositoryFactory.createRideRepository();
  }
  
  async execute(rideId: string): Promise<ConsultRideServiceDTO.Output> {
    const ride = await this.rideRepository.findById(rideId);
    const passenger = await this.userRepository.findById(ride.passenger_id);

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
      waiting_duration = WaitingDurationRide.calculate(ride.request_date, ride.accept_date)
    }

    const calculateRide = new CalculateRide();
    calculateRide.addSegment(ride.from, ride.to, ride.request_date);
    const price = calculateRide.calculate();

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
    }
  }
}