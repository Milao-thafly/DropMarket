import { pool } from '../libs/Database';
import { Organ } from '../models/Organ';

export class OrganRepository {
    static findInStock() {
      throw new Error("Method not implemented.");
    }
    async findAll(): Promise<Organ[]> {
        const {rows} = await pool.query('SELECT * FROM ORGAN');
        return rows;
    }

    async findInStock(): Promise<Organ[]> {
        const { rows } = await pool.query('SELECT * FROM "ORGAN" WHERE stock = TRUE');
        return rows;
    }

    async findOutStock(): Promise<Organ[]> {
        const { rows } = await pool.query('SELECT * FROM "ORGAN" WHERE stock = FALSE');
        return rows;
    }
}