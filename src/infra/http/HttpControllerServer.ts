import HttpServer from "../../application/contracts/HttpServer";
import { AcceptRideServiceDTO } from "../../domain/service/AcceptRide";
import { AuthServiceDTO } from "../../domain/service/Auth";
import { PositionTypeInput } from "../../domain/service/PositionTypeInput";
import { RequestRideServiceDTO } from "../../domain/service/RequestRide";
import UsecaseFactory from "../factory/UsecaseFactory";

export default class HttpControllerServer {
  
  constructor(readonly httpServer: HttpServer, readonly usecaseFactory: UsecaseFactory) {
    httpServer.on("post", "/register", async (params: any, body: AuthServiceDTO.InputSignUp, headers: any) => {
        const register = this.usecaseFactory.createAuth();
        const output = await register.SignUp(body);
        return output;
    })
    
    httpServer.on("post", "/request_ride", async (params: any, body: RequestRideServiceDTO.Input, headers: any) => {
        const RequestRide = this.usecaseFactory.createRequestRide();
        const output = RequestRide.execute(body);
        return output
    })
    
    httpServer.on("post", "/accept_ride", async (params: any, body: AcceptRideServiceDTO.Input, headers: any) => {
        const AcceptRide = this.usecaseFactory.createAcceptRide();
        const output = AcceptRide.execute(body);
        return output
    })
    
    httpServer.on("post", "/start_ride", async (params: any, body: PositionTypeInput, headers: any) => {
        const StartRide = this.usecaseFactory.createStartRide();
        const output = StartRide.execute(body);
        return output
    })
    
    httpServer.on("post", "/add_position_to_ride", async (params: any, body: PositionTypeInput, headers: any) => {
        const UpdateRide = this.usecaseFactory.createUpdateRide();
        const output = UpdateRide.execute(body);
        return output
    })
    
    httpServer.on("post", "/end_ride", async (params: any, body: PositionTypeInput, headers: any) => {
        const EndRide = this.usecaseFactory.createEndRide();
        const output = EndRide.execute(body);
        return output
    })
    
    httpServer.on("get", "/passenger/:id", async (params: any, body: any, headers: any) => {
      const getUser = this.usecaseFactory.getUser();
      const output = await getUser.execute(params.id);
      return output;
    })
    
    httpServer.on("get", "/ride/:id", async (params: any, body: any, headers: any) => {
      const getRide = this.usecaseFactory.getConsultRide();
      const output = await getRide.execute(params.id);
      return output;
    })
  }
}