import DatabaseConnection from "../../application/contracts/DatabaseConnection";
import Position from "../../domain/entities/Position";
import ApplicationError from "../../domain/error/ApplicationError";
import { IPositionRepository } from "../../domain/repositories/Position";

export default class PositionRepository implements IPositionRepository {

  constructor(private readonly connection: DatabaseConnection) {}
  
  async findById(rideId: string): Promise<Position[]> {
    const positionData = await this.connection.query("select * from cccat12.positions where ride_id = $1", [rideId])
    if (!positionData) throw new ApplicationError("This ride not exists!", 400);
    let positions: Position[] = []
    for(const position of positionData) {
      positions.push(Position.restore(position.position_id, position.ride_id, position.coords, new Date(position.position_date)));
    }
    return positions;
  }

  async save(position: Position): Promise<void> {
    await this.connection.query("insert into cccat12.positions (position_id, ride_id, coords, position_date) values ($1, $2, $3, $4)", [position.id, position.ride_id, position.coords, position.date])
  }
}