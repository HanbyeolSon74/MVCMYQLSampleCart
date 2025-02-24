// menuRouter.js
const express = require("express");
const router = express.Router();
const productModel = require("../models/addModel");

// 메뉴 페이지 - 상품 목록 조회
router.get("/", async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    if (!products || products.length === 0) {
      return res.render("menu", { products: [] });
    }
    res.render("menu", { products });
  } catch (error) {
    console.error("메인 페이지 로드 실패:", error);
    res.status(500).send("서버 오류 발생");
  }
});

module.exports = router;
