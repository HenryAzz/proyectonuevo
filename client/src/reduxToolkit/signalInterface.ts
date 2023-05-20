export interface createSignalRequest {
  operation: string,
  documentation: string[],
  price: number,
  propertyId: number,
  brokerId: number,
  userId: number,
}