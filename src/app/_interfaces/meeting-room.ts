export interface MeetingRoom {
  title: string;
  description: string;
  location: string;
  slots: Array <{
    fromDate: string,
    toDate: string,
    fromTime: string,
    toTime: string
  }>;
  bookBy: string;
}