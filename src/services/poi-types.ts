export interface POI {
  _id: string;
  name: string;
  description: string;
  long: string;
  lat: string;
  zone: string;
  imagePath: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
}
