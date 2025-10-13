export interface AchatItem {
  item: string;
  quantite: number;
}

export interface Achats {

   id: number,
   customer_id: number,
   itemsAchats: AchatItem[],
   price: number,
   date: Date,

}