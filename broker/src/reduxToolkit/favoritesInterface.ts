export interface favorite {
  id: number,
  propertyId: number, 
  userId: number,
  property: object,
  user: object,
}

export interface createFavoriteRequest {
  propertyId: string;
  email: string;
}