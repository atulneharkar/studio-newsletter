export interface User {
  id: number;
  name: {
  	fname: string;
	  lname: string;
  };
	email: string;
	credentials: {
	  password: string;
	  confirmPassword: string;
	};
	phone: string;
	designation: string;
	img: string;
	role: string;
}