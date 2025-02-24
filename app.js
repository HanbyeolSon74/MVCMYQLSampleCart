const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const menuRouter = require("./routers/menuRouter");
const productRoutes = require("./routers/addRouter");
const detailRouter = require("./routers/detailRouter");
const storesRouter = require("./routers/storesRouter.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/public", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/menu", menuRouter); // 메뉴 페이지
app.use("/admin", productRoutes);
app.use("/", productRoutes); // 관리자 페이지
app.use("/menu", detailRouter); // 상세 페이지
app.use("/stores", storesRouter); // 상세 페이지

app.get("/", (req, res) => {
  res.render("main");
});

// 메뉴 페이지 라우트
app.get("/menu", (req, res) => {
  res.render("menu", { title: "Menu | NUDAKE", products });
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
