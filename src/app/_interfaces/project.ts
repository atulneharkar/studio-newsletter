export interface Project {
	_id: number,
	name: string,
	description: string,
	estimation: number,
	vacancies: Array <{
  	domain: string,
  	count: number
  }>
	members: Array <{ userId: string, hours: number }>
	technology: string,
	contactPerson: string,
	projectType: string
}