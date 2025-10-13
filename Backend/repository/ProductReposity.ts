import { pool } from '../libs/Database';
import { Product } from '../models/Product';

export class ProductRepository {
    static findInStock() {
      throw new Error("Method not implemented.");
    }
    async findAll(): Promise<Product[]> {
        const {rows} = await pool.query('SELECT * FROM ORGAN');
        return rows;
    }

    async findInStock(): Promise<Product[]> {
        const { rows } = await pool.query('SELECT * FROM "ORGAN" WHERE stock = TRUE');
        return rows;
    }

    async findOutStock(): Promise<Product[]> {
        const { rows } = await pool.query('SELECT * FROM "ORGAN" WHERE stock = FALSE');
        return rows;
    }
}

// import { pool } from "../libs/Database.js";
// import { Product } from "../models/Product.js"

// export class ProductRepository {
//     async getAll(): Promise<Product[]> {
//         const { rows } = await pool.query("SELECT * FROM \"organes_\"");
//         return rows
//     }

//     async getByName(organ_name: string): Promise<Product | null>{
//         const { rows } = await pool.query("SELECT * FROM \"organ\" WHERE organ_name = $1" [organ_name])
//         return rows[0] || null;
//     }
    
//     async create(product: Omit<Product, "id">): Promise<Product> {
//         const { rows } = await pool.query(
//             ` INSERT INTO "product_" (
//             organe_id, organ_name, organ_type, description, price, blood_type, use_by_date, stock
//             )VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
//             RETURNING * `, 
//             [
//                 organ.id,
//                 organ.organ_name,
//                 organ.organ_type,
//                 organ.description,
//                 organ.price,
//                 organ.blood_type,
//                 organ.use_by_date,
//                 organ.stock,
//                 organ.category_id,
//             ]
//         );
//         return rows[0]
//     }

    
    
    
    
//     async read(product: Omit<Product, "id">): Promise<Product> {
//         const { rows } = await pool.query(
//             ` SELECT * INTO"product_" (
//             organe_id, organ_name, organ_type, description, price, blood_type, use_by_date, stock
//             )VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
//             RETURNING * `, 
//             [
//                 organ.id,
//                 organ.organ_name,
//                 organ.organ_type,
//                 organ.description,
//                 organ.price,
//                 organ.blood_type,
//                 organ.use_by_date,
//                 organ.stock,
//                 organ.category_id,
//             ]
//         );
//         const result = await this.pool.query<ProductBrowseViewTypeRow>(query);
//         const product = result.rows.map((row) => UserBrowseView.User)
//         return rows[0]
//     }
    
// }