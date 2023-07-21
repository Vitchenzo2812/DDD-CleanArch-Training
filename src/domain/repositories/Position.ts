import Position from "../entities/Position";

export interface IPositionRepository {
  findById(positionId: string): Promise<Position[]>;
  save(position: Position): Promise<void>;
}