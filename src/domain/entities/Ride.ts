import Coord from "./Coord";
import UUIDGenerator from "./UUIDGenerator";

export default class Ride {

	private constructor (
		readonly id: string,
		readonly passenger_id: string,
		readonly driver_id: string | null,
		readonly status_ride: string,
		readonly request_date: Date,
		readonly accept_date: Date | null,
		readonly from: Coord,
		readonly to: Coord,
		readonly start_date: Date | null,
		readonly end_date: Date | null,
	) {}	

	static create(passenger_id: string, from: Coord, to: Coord) {
		const id = UUIDGenerator.generate();
		return new Ride(id, passenger_id, null, "waiting_driver", new Date(), null, from, to, null, null);
	}

	static restore(id: string, passenger_id: string, driver_id: string | null, status_ride: string, request_date: Date, accept_date: Date | null, from: Coord, to: Coord, start_date: Date | null, end_date: Date | null) {
		return new Ride(id, passenger_id, driver_id, status_ride, request_date, accept_date, from, to, start_date, end_date)
	}
}