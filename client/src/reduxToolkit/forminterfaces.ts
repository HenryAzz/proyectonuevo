export interface form {
  title: string;
  description: string;
  picture_url: string[];
  unit_price: number;
  dni: number;
  tel: number;
  type_prop: string;
  type_vivienda: string;
  address: string;
  number: number;
  apartment: string;
  floor: number;
  location: string;
  province: string;
  postalCode: string;
  email: string | null | undefined;
}

export interface createFormRequest {
  id: number;
  title: string;
  description: string;
  picture_url: string[];
  unit_price: number;
  dni: number;
  tel: number;
  type_prop: string;
  type_vivienda: string;
  address: string;
  number: number;
  apartment: string;
  floor: number;
  location: string;
  province: string;
  postalCode: string;
  email: string | null | undefined;
  situation: string;
}
export interface modifyForm {
  id: number;
  situation: string;
}
