export interface Organ {
  organe_id: number;
  organ_name: string;
  organ_type: string;
  description: string;
  price: number;
  blood_type: string;
  use_by_date: Date;
  stock: boolean;
  category_id: number;
}
