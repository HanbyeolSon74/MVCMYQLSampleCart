const express = require("express");
const multer = require("multer");
const path = require("path");
const productController = require("../controllers/addController");
const router = express.Router();

// Multer 설정: 이미지 업로드를 위한 저장 경로 및 파일명 지정
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 고유한 파일명 생성
  },
});

const upload = multer({ storage });

//  상품 등록 페이지
router.get("/add", async (req, res) => {
  try {
    const products = await productController.getAllProducts();
    res.render("add", { products });
  } catch (error) {
    console.error("상품 목록 조회 오류:", error);
    res.status(500).send("상품 목록 조회 중 오류 발생");
  }
});

//  상품 이름 중복 체크
router.get("/check-product-name", productController.checkProductNameExist);

//  상품 등록 처리 (POST 요청)
router.post(
  "/add-product",
  upload.single("image"),
  productController.createProduct
);

// 상품 목록 조회 (GET 요청)
router.get("/products", productController.getAllProducts);

// 상품 수정 페이지 이동
router.get("/edit-product/:id", productController.moveEditProduct);

// 상품 수정 처리
router.post(
  "/update-product",
  upload.single("image"),
  productController.updateProduct
);

// 상품 삭제
router.delete("/delete-product/:id", productController.deleteProduct);

module.exports = router;
