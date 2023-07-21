import GetUser from "../../application/service/GetUser";
import Auth from "../../application/service/Auth";
import RepositoryFactory from "../../application/contracts/RepositoryFactory";
import RequestRideService from "../../application/service/RequestRide";
import AcceptRideService from "../../application/service/AcceptRide";
import ConsultRideService from "../../application/service/ConsultRide";
import StartRide from "../../application/service/StartRide";
import UpdateRide from "../../application/service/UpdateRide";

export default class UsecaseFactory {

  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  createAuth() {
    return new Auth(this.repositoryFactory);
  }

  createRequestRide() {
    return new RequestRideService(this.repositoryFactory);
  }

  createAcceptRide() {
    return new AcceptRideService(this.repositoryFactory);
  }

  createStartRide() {
    return new StartRide(this.repositoryFactory);
  }

  createUpdateRide() {
    return new UpdateRide(this.repositoryFactory);
  }

  getUser() {
    return new GetUser(this.repositoryFactory);
  }
  
  getConsultRide() {
    return new ConsultRideService(this.repositoryFactory);
  }
}