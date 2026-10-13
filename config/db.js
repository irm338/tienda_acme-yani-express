 import { createpool } from 'mysql2/promise';

 const pool = createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
    wautForConnections: true,
    connectionLimit: 10

 });

 export default pool;


 // todo esro es paar hacer corer la bsase de dstos es paar colocar mis datos sencibles 