import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const {Pool} = pg;

const pool = new Pool({
    host: process.env.DB_host,
    port: process.env.DB_port,
    password: process.env.DB_password,
    database: process.env.DB_name,
    user: process.env.DB_user
})

pool.on("connect", () => {
    console.log("Connected to the database")
})

export default pool;


