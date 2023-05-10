export interface form {
  title: string;
  description: string;
  picture_url: string[];
  unit_price: number;
  dni: string;
  tel: string;
  type_prop: string;
  type_vivienda: string;
  address: string;
  number: number;
  apartment: string;
  floor: number;
  location: string;
  province: string;
  postalCode: string; 

}

export interface createFormRequest {
  title: string;
  description: string;
  picture_url: string[];
  unit_price: number;
  dni: string;
  tel: string;
  type_prop: string;
  type_vivienda: string;
  address: string;
  number: number;
  apartment: string;
  floor: number;
  location: string;
  province: string;
  postalCode: string; 
}
