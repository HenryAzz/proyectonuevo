export interface createSignalRequest {
  operation: string | undefined,
  documentation: string[],
  price: number,
  propertyId: number | undefined,
  brokerId: number,
  userId: number | undefined,
}