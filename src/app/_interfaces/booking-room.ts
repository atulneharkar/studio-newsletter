export interface BookingRoom {
  title: string,
  description: string,
  location: string,
  slots: {
    fromDate: string,
    toDate: string,
    fromTime: string,
    toTime: string
  }
}