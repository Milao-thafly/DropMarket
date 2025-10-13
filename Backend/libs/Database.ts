import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dropmarket",
  password: "azriel26!",
  port: 5432,
});

pool.connect()
  .then(() => console.log(" Connecté à PostgreSQL"))
  .catch((err) => console.error(" Erreur de connexion PostgreSQL", err));
