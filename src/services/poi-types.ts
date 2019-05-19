export interface Location {
  lat: number;
  long: number;
}

export interface POI {
  _id: string;
  name: string;
  description: string;
  geo: Location;
  zone: string;
  imagePath: string;
  comments: PoiComment[];
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
}

export interface PoiComment {
  userName: string;
  comment: string;
  date: string;
}
