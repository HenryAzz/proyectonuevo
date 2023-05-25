export interface favorite {
  id: number,
  property: any,
  user: any,
}

export interface createFavoriteRequest {
  propertyId: string;
  email: string;
}