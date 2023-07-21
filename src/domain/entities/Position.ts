import Coord from "./Coord";
import UUIDGenerator from "./UUIDGenerator";

export default class Position {

  private constructor(readonly id: string, readonly ride_id: string, readonly coords: { lat: number, long: number }, readonly date: Date) {
  }

  static create(ride_id: string, coords: { lat: number, long: number }, date: Date) {
    const id = UUIDGenerator.generate();
    const coord = new Coord(coords.lat, coords.long)
    return new Position(id, ride_id, coord, date);
  }

  static restore(id: string, ride_id: string, coords: { lat: number, long: number }, date: Date) {
    return new Position(id, ride_id, coords, date);
  }
}