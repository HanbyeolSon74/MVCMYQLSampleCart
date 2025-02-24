const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "goods",
});

// 상품 이름 중복 체크
const checkProductNameExist = async (name) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE name = ?", [
      name,
    ]);
    return rows.length > 0;
  } catch (error) {
    console.error("DB 조회 오류:", error);
    throw error;
  }
};

// 상품 등록
const postProduct = async (data) => {
  const query = `INSERT INTO products (name, price, details, category, imageurl) VALUES (?, ?, ?, ?, ?)`;
  await pool.query(query, [
    data.name,
    data.price,
    data.details,
    data.category,
    data.imageUrl,
  ]);
};

// 전체 상품 목록 가져오기
const getAllProducts = async () => {
  const query = "SELECT * FROM products";
  const [rows] = await pool.query(query);
  return rows;
};

// 해당 상품 가져오기 (상품 아이디로 조회)
const getProductById = async (productId) => {
  const query = `SELECT * FROM products WHERE id = ?`;
  const [rows] = await pool.query(query, [productId]);
  return rows[0] || null;
};

// 상품 수정하기 (올바르게 수정)
const updateProduct = async (id, updatedProduct) => {
  const { name, price, details, imageUrl } = updatedProduct;
  const query = `UPDATE products SET name = ?, price = ?, details = ?, imageurl = ? WHERE id = ?`;
  await pool.query(query, [name, price, details, imageUrl, id]);
};

// 상품 삭제 함수 정의
const deleteProduct = async (id) => {
  const query = "DELETE FROM products WHERE id = ?";
  const [result] = await pool.query(query, [id]);
  return result;
};

module.exports = {
  checkProductNameExist,
  postProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
