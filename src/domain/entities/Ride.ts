export default class Ride {

	constructor (
		readonly id: string,
		readonly passenger_id: string,
		readonly driver_id: string | null,
		readonly status_ride: string,
		readonly request_date: Date
	) {}	
}