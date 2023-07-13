import GetUser from "../../application/service/GetUser";
import Auth from "../../application/service/Auth";
import SimulationPriceRideService from "../../application/service/SimulationPriceRide";
import RepositoryFactory from "../../application/contracts/RepositoryFactory";
import RequestRideService from "../../application/service/RequestRide";
import GetRide from "../../application/service/GetRide";
import AcceptRideService from "../../application/service/AcceptRide";

export default class UsecaseFactory {

  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  createAuth() {
    return new Auth(this.repositoryFactory)
  }

  createSimulatePriceRide() {
    return new SimulationPriceRideService();
  }

  createRequestRide() {
    return new RequestRideService(this.repositoryFactory);
  }

  createAcceptRide() {
    return new AcceptRideService(this.repositoryFactory)
  }

  getUser() {
    return new GetUser(this.repositoryFactory)
  }
  
  getRide() {
    return new GetRide(this.repositoryFactory)
  }
}