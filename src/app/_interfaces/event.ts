export interface Event {
  title: string,
  description: string,
  location: string,
  slots: Array <{
    fromDate: string,
    toDate: string,
    fromTime: string,
    toTime: string
  }>,
  organiser: string
}