// 파일 선택 후 미리보기 기능
function previewImage(event) {
  const file = event.target.files[0];
  const preview = document.getElementById("preview");

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
    };

    reader.readAsDataURL(file);
  } else {
    preview.style.display = "none";
  }
}

// 수정 버튼 클릭 시 실행될 함수
function editProduct(id) {
  window.location.href = `/admin/edit-product/${id}`;
}

// 삭제 버튼 클릭 시 실행될 함수
function deleteProductClient(id) {
  if (confirm("정말 삭제하시겠습니까?")) {
    fetch(`/delete-product/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/admin/add";
        } else {
          alert("삭제에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("삭제 요청 오류:", error);
        alert("서버 오류 발생");
      });
  }
}

// 실시간 중복 체크 함수
document.getElementById("name").addEventListener("input", async function () {
  const name = this.value;
  const errorMessage = document.getElementById("name-error");

  if (name.length > 0) {
    const response = await fetch(
      `/admin/check-product-name?name=${encodeURIComponent(name)}`
    );
    const result = await response.json();

    if (result.exists) {
      errorMessage.textContent = "이미 존재하는 상품 이름입니다.";
    } else {
      errorMessage.textContent = "";
    }
  } else {
    errorMessage.textContent = "";
  }
});

// 상세내용
const detailsEditor = new toastui.Editor({
  el: document.querySelector("#details"),
  previewStyle: "vertical",
  height: "400px",
});

function syncDetails() {
  document.getElementById("detailsInput").value = detailsEditor.getMarkdown();
}
