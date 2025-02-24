const express = require("express");
const router = express.Router();
const productModel = require("../models/addModel");

// 상품 상세 페이지
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    if (isNaN(productId)) {
      return res.status(400).send("잘못된 상품 ID입니다.");
    }

    const product = await productModel.getProductById(productId);

    if (!product) {
      return res.status(404).send("상품을 찾을 수 없습니다.");
    }

    res.render("detail", { product });
  } catch (error) {
    console.error("상품 상세 페이지 로드 실패:", error);
    res.status(500).send("서버 오류 발생");
  }
});

module.exports = router;
