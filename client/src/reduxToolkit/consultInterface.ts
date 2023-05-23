export interface createConsultRequest {
  name: string;
  email: string;
  issue: string;
  description: string;
}

export interface emailMessage {
  brokerEmail: string;
  userEmail: string;
  message: string;
}
