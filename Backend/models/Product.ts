export interface ProductCardProps<T>{
    info: ProductInfo;
    typeresult: T;
}

export interface ProductInfo {
    title: string;
    description: string;
}
export interface ProductListResponse{
  info : {
    title: string;
    description: string;
  };
  products: Product[];
}

export interface Product {
  organe_id: number;
  organ_name: string;
  organ_type: string;
  description: string;
  price: string;
  blood_type: string;
  use_by_date: string;
  stock: string;
  category_id: number;
}
