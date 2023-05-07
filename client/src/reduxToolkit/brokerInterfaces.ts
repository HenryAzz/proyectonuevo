export interface Broker {
  id: number;
  rol: "Broker" | "Admin";
  email: string;
  password: string;
  name: string;
  avatar?: string;
}

export interface CreateBrokerRequest {
  id: number;
  rol: "Broker" | "Admin";
  email: string;
  password: string;
  name: string;
  avatar?: string;
}
