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
	avatar: string;
	role: string;
	dob: string;
	doj: string;
	previousExp: string;
	domain: string;
	status: string;
}