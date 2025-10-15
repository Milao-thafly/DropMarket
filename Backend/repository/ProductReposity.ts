import { pool } from "../libs/Database";
import { Product } from "../models/Product";

export class ProductRepository {
  async getAll(): Promise<Product[]> {
    const { rows } = await pool.query('SELECT * FROM "organ"');
    return rows;
  }

  async getByName(organ_name: string): Promise<Product | null> {
    const { rows } = await pool.query(
      'SELECT * FROM "organ_" WHERE organ_name = $1',
      [organ_name]
    );
    return rows[0] || null;
  }

  async createProduct(organ: Omit<Product, "id">): Promise<Product> {
    const { rows } = await pool.query(
      `
      INSERT INTO "organ_" (
        organ_name, organ_type, description, price, blood_type, use_by_date, stock, category_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
      `,
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
    return rows[0];
  }

  async findAll(): Promise<Product[]> {
    const { rows } = await pool.query('SELECT * FROM "organ_"');
    return rows;
  }

  async findInStock(): Promise<Product[]> {
    const { rows } = await pool.query(
      'SELECT * FROM "organ_" WHERE stock = TRUE OR stock > 0'
    );
    return rows;
  }

  async findOutStock(): Promise<Product[]> {
    const { rows } = await pool.query(
      'SELECT * FROM "organ_" WHERE stock = FALSE OR stock = 0'
    );
    return rows;
  }
}
