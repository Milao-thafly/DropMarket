import { pool } from '../libs/Database';
import { Organ} from '../models/Organ';

export class OrganRepository {
    async findAll() {
        const {rows} = await pool.query('SELECT * FROM ORGAN');
        return rows;
    }

    async findInStock() {
        const { rows } = await pool.query('SELECT * FROM "ORGAN" WEHRE stock');
        return rows;
    }
}