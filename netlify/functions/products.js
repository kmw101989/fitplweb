const mysql = require("mysql2/promise");

let pool;
function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      enableKeepAlive: true,
      namedPlaceholders: true,
    });
  }
  return pool;
}

const baseHeaders = { "content-type": "application/json" };

const guest_climate = (withRegion) => `
  SELECT
    region_id        AS regionId,
    product_id       AS productId,
    brand            AS brand,
    product_name     AS name,
    price            AS price,
    rating           AS rating,
    review_count     AS reviewCount,
    img_url          AS imageUrl,
    product_url      AS productUrl,
    category         AS category,
    base_score       AS baseScore,
    src_priority     AS srcPriority
  FROM guest_reco_climate
  ${withRegion ? "WHERE region_id = ?" : ""}
  ORDER BY base_score DESC, rating DESC, review_count DESC
  LIMIT ?
`;

exports.handler = async (event) => {
  try {
    const params = new URLSearchParams(event.rawQueryString || "");
    let limit = parseInt(params.get("limit") || "10", 10);
    if (!Number.isFinite(limit) || limit < 1) limit = 10;
    if (limit > 100) limit = 100;

    const regionId = params.get("region_id");
    const withRegion =
      regionId !== null && regionId !== undefined && regionId !== "";

    const pool = getPool();
    const sql = guest_climate(withRegion);
    const binds = withRegion ? [Number(regionId), limit] : [limit];

    const [rows] = await pool.query(sql, binds);

    return {
      statusCode: 200,
      headers: baseHeaders,
      body: JSON.stringify({ ok: true, count: rows.length, data: rows }),
    };
  } catch (err) {
    console.error("products function error:", err);
    return {
      statusCode: 500,
      headers: baseHeaders,
      body: JSON.stringify({ ok: false, error: err.message }),
    };
  }
};
