import mysql from "mysql2/promise";

export async function handler() {
  try {
    const conn = await mysql.createConnection({
      host: "127.0.0.1", // config.yml에서 쓴 hostname
      port: 3306,
      user: "root",
      password: "hithere4961",
      database: "fitpl",
      ssl: false,
    });

    const [rows] = await conn.query('SELECT product_id, product_name, price FROM products LIMIT 10');
    await conn.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, data: rows }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: err.message }),
    };
  }
}
