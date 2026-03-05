import mysql from "mysql2";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../development.env") });

let pool;

export const connectDB = () => {
  return new Promise((resolve, reject) => {
    try {
      pool = mysql.createPool({
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT,
        user: process.env.MYSQLUSER,
        password: process.env.MYSQLPASSWORD,
        database: process.env.MYSQLDATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      pool.getConnection((err, connection) => {
        if (err) {
          console.error('❌ MySQL connection failed:', err.message);
          reject(err);
        } else {
          console.log('✅ MySQL Database Connected!');
          connection.release();
          resolve();
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Add this to the bottom of config/db.js
export const executeQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
