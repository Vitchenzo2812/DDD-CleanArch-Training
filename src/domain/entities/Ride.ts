import Coord from "./Coord";
import UUIDGenerator from "./UUIDGenerator";

export default class Ride {

	constructor (
		readonly id: string,
		readonly passenger_id: string,
		readonly driver_id: string | null,
		readonly status_ride: string,
		readonly request_date: Date,
		readonly accept_date: Date | null,
		readonly from: Coord,
		readonly to: Coord
	) {}	

	static create(passenger_id: string, from: Coord, to: Coord) {
		const id = UUIDGenerator.generate();
		return new Ride(id, passenger_id, null, "waiting_driver", new Date(), null, from, to);
	}
}