import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  user: "user_bdd",
  host: "localhost",
  database: "dropmarket",
  password: "1234",
  port: 5432,
});

pool.connect()
  .then(() => console.log(" Connecté à PostgreSQL"))
  .catch((err) => console.error(" Erreur de connexion PostgreSQL", err));
