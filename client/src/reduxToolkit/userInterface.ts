export interface User {
  id: number;
  rol: string;
  email: string;
  password?: string;
  person_type: string;
  name: string;
}

export interface UserByEmail {
  id: number;
  rol: string;
  email: string;
  password?: string;
  person_type: string;
  name: string;
  hashgoogle?: string | null;
  properties: Array<any>;
  signals: Array<any>;
}
