export interface User {
  _id: number;
  name: string;
	email: string;
	credentials: {
	  password: string;
	  confirmPassword: string;
	};
	phone: string;
	designation: string;
	domain: string;
	dob: string;
	doj: string;
	skills: string;
	visa: string;
	about: string;
	avatar: string;
	role: string;
	status: string;
}