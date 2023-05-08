export interface property {
  id: number;
  type: string;
  address: string;
  spaces: number;
  price: number;
  pictures: string[];
  floors: number;
  covered_area: number;
  bathroom: number;
  bedroom: number;
  furnished: boolean;
  description: string;
  situation: string;
  total_area: number;
  antiquity: number;
  operation: string;
  owner: string;
}

export interface createPropertyRequest {
  type: string;
  address: string;
  spaces: number;
  price: number;
  pictures: string[];
  floors: number;
  covered_area: number;
  bathroom: number;
  bedroom: number;
  furnished: boolean;
  description: string;
  situation: string;
  total_area: number;
  antiquity: number;
  operation: string;
  owner: string;
}
