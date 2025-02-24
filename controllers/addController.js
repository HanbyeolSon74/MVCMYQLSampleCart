const productModel = require("../models/addModel");
const marked = require("marked");
const Op = require("sequelize"); // Sequelize 연산자

// 상품 이름 중복처리
const checkProductNameExist = async (req, res) => {
  try {
    const name = req.query.name;
    if (!name) {
      return res.status(400).json({ error: "상품 이름이 없습니다." });
    }

    const exists = await productModel.checkProductNameExist(name);
    res.json({ exists });
  } catch (error) {
    console.error("상품 이름 중복 체크 오류:", error);
    res.status(500).json({ error: "서버 오류 발생" });
  }
};

// 상품 등록 처리
const createProduct = async (req, res) => {
  try {
    const { name, price, details, category } = req.body;
    const imageUrl = req.file ? "/uploads/" + req.file.filename : "";

    if (!name) {
      return res.status(400).json({ error: "상품 이름이 없습니다." });
    }

    // 가격 숫자만
    if (isNaN(price)) {
      return res.status(400).send("가격은 숫자만 입력할 수 있습니다.");
    }

    // marked 사용하여 마크다운을 HTML로 변환
    const htmlDetails = marked.parse(details);

    // 상품 이름 중복 체크
    const isNameExist = await productModel.checkProductNameExist(name);
    if (isNameExist) {
      return res.status(400).send("이미 존재하는 상품 이름입니다.");
    }

    await productModel.postProduct({
      name,
      price: parseFloat(price),
      details: htmlDetails,
      category,
      imageUrl,
    });

    res.redirect("/admin/add");
  } catch (error) {
    console.error("상품 등록 중 오류 발생:", error);
    res.status(500).send("서버 오류 발생");
  }
};

// 상품 목록 조회 함수
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    if (!res) {
      return products;
    }
    res.render("add", { products });
  } catch (error) {
    console.error("상품 목록 조회 실패:", error);
    if (res) {
      res.status(500).send("서버 오류 발생");
    } else {
      throw new Error("서버 오류 발생");
    }
  }
};

// 상품 수정 페이지 이동
const moveEditProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.getProductById(id);

    if (!product) {
      return res.status(404).send("해당 상품을 찾을 수 없습니다.");
    }

    res.render("editProduct", { product });
  } catch (error) {
    console.error("상품 수정 페이지 이동 중 오류:", error);
    res.status(500).send("서버 오류 발생");
  }
};

// 상품 업데이트 처리
const updateProduct = async (req, res) => {
  try {
    const { id, name, price, details, category, existingImage } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : existingImage;

    // marked
    const htmlDetails = marked.parse(details);

    await productModel.updateProduct(id, {
      name,
      price: parseFloat(price),
      details: htmlDetails,
      category,
      imageUrl,
    });

    res.redirect("/products");
  } catch (error) {
    console.error("상품 업데이트 중 오류 발생:", error);
    res.status(500).send("서버 오류 발생");
  }
};

// 상품 삭제 처리
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.deleteProduct(id);
    res.status(200).send();
  } catch (error) {
    console.error("상품 삭제 중 오류 발생:", error);
    res.status(500).send("서버 오류 발생");
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  moveEditProduct,
  updateProduct,
  deleteProduct,
  checkProductNameExist,
};
