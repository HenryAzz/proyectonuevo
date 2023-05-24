export interface createSignalRequest {
  operation: string | undefined;
  documentation: string[];
  price: number;
  propertyId: number | undefined;
  email: string | undefined | null;
}

export interface modifySignal {
  id: number;
  situation: string;
}
