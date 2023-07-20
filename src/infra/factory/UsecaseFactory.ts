import GetUser from "../../application/service/GetUser";
import Auth from "../../application/service/Auth";
import RepositoryFactory from "../../application/contracts/RepositoryFactory";
import RequestRideService from "../../application/service/RequestRide";
import AcceptRideService from "../../application/service/AcceptRide";
import ConsultRideService from "../../application/service/ConsultRide";

export default class UsecaseFactory {

  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  createAuth() {
    return new Auth(this.repositoryFactory)
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
  
  getConsultRide() {
    return new ConsultRideService(this.repositoryFactory)
  }
}