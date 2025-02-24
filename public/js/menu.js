document.addEventListener("DOMContentLoaded", function () {
  const categoryItems = document.querySelectorAll(".category-item"); // 카테고리 버튼
  const products = document.querySelectorAll(".product-item"); // 상품 리스트
  const menuTitle = document.querySelector(".menu-title"); // 타이틀(DESSERT(n))

  function showAllProducts() {
    products.forEach((product) => product.classList.add("active"));
    categoryItems.forEach((item) => item.classList.remove("active"));
    menuTitle.innerText = `ALL PRODUCTS (${products.length})`; // 제목 변경
  }

  function filterProducts(category) {
    let count = 0; // 현재 카테고리에 해당하는 상품 개수
    products.forEach((product) => {
      const productCategory = product
        .getAttribute("data-category")
        .trim()
        .toUpperCase(); // 공백 제거 후 대소문자 통일
      if (productCategory === category.toUpperCase()) {
        product.classList.add("active");
        product.style.display = "block"; // 선택된 상품 보이게 함
        count++;
      } else {
        product.classList.remove("active");
        product.style.display = "none"; // 선택되지 않은 상품 숨기기
      }
    });
    menuTitle.innerText = `${category} (${count})`; // 타이틀 업데이트
  }

  categoryItems.forEach((item) => {
    item.addEventListener("click", function () {
      categoryItems.forEach((el) => el.classList.remove("active"));
      this.classList.add("active");

      const selectedCategory = this.querySelector("span").innerText.trim(); // 선택된 카테고리명
      filterProducts(selectedCategory);
    });
  });

  // 페이지 로드 시 기본적으로 전체 상품 보이기
  showAllProducts();
});
