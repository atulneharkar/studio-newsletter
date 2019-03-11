export interface Event {
  title: string;
  description: string;
  location: string;
  // isInterested: Boolean;
  slots: Array <{
    fromDate: string,
    toDate: string,
    fromTime: string,
    toTime: string
  }>;
  organiser: string;
  invitees: string;
  image: string;
  notes: string;
  gradient: number;
}