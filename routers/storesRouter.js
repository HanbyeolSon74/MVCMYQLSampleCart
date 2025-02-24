const express = require("express");
const router = express.Router();

// Stores 페이지 라우트
router.get("/", (req, res) => {
  // 예시 데이터 (DB에서 가져오는 부분을 추가할 수 있음)
  const stores = [
    { id: 1, name: "DOSAN", image: "/public/img/nudake_dosan_pc_1.webp" },
    { id: 2, name: "SEONGSU", image: "/public/img/nudake_seongsu_pc_1.webp" },
    { id: 3, name: "SINSA", image: "/public/img/nudake_sinsa_pc_1.webp" },
    { id: 4, name: "SHANGHAI", image: "/public/img/nudake_shanghai_pc_1.webp" },
  ];

  res.render("stores", { stores });
});

// Stores 상세 페이지
router.get("/stores-detail/:id", (req, res) => {
  const storeId = req.params.id;

  // 여기에서 storeId로 해당 가게의 상세 정보를 DB에서 조회하거나 예시 데이터를 추가합니다.
  const storeDetail = {
    id: storeId,
    name: `Store ${storeId}`, // 예시로 가게 이름 표시
    description: `Details of Store ${storeId}`,
  };

  res.render("store-detail", { store: storeDetail });
});

module.exports = router;
