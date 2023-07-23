export default class DurationRide {
  static calculate(request_date: Date, accept_date: Date): number {
    const requestDate = new Date(request_date);
    const acceptDate = new Date(accept_date);
    const timeDifference = acceptDate.getTime() - requestDate.getTime();
    // convert to minutes
    return Math.round(timeDifference / (1000 * 60))
  }
}