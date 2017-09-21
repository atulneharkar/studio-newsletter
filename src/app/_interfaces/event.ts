export interface Event {
  _id: number,
	title: string,
	description: string,
	date: {
		startDate: string,
	  endDate: string
	},
	time: {
		startTime: string,
	  endTime: string
	},
	location: string
}