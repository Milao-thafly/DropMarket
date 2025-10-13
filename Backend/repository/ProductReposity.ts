import { pool } from "../libs/Database.js";
import { Product } from "../models/Product.js"

export class ProductRepository {
    async getAll(): Promise<Product[]> {
        const { rows } = await pool.query("SELECT * FROM \"organ_\"");
        return rows
    }

    async getByName(organ_name: string): Promise<Product []>{
        const { rows } = await pool.query("SELECT organ_name FROM \"organ\" WHERE organ_name = $1", [organ_name])
        return rows[0] || null;
    }
    
    async createProduct(organ: Omit<Product, "id">): Promise<Product>{
        const { rows } = await pool.query(
            ` INSERT INTO "organ_" (
            organe_id, organ_name, organ_type, description, price, blood_type, use_by_date, stock
            )VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING * `, 
            [
                organ.organ_name,
                organ.organ_type,
                organ.description,
                organ.price,
                organ.blood_type,
                organ.use_by_date,
                organ.stock,
                organ.category_id,
            ]
        );
        return rows[0]
    }

    
    
    
    
    async read(organ: Omit<Product, "id">): Promise<Product> {
        const { rows } = await pool.query(
            ` SELECT * INTO "organ_" (
            organe_id, organ_name, organ_type, description, price, blood_type, use_by_date, stock
            )VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING * `, 
            [
                organ.organ_name,
                organ.organ_type,
                organ.description,
                organ.price,
                organ.blood_type,
                organ.use_by_date,
                organ.stock,
                organ.category_id,
            ]
        );
        
        return rows[0]
    }
    
}

