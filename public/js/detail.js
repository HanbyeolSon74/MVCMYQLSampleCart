document.addEventListener("DOMContentLoaded", function () {
  const storeButtons = document.querySelectorAll(".store-btn");
  const reservationButtons = document.querySelectorAll(".reservation-btn");

  storeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alert(`Selected Store: ${button.textContent}`);
    });
  });

  reservationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alert(`Redirecting to ${button.textContent} reservation page...`);
    });
  });
});
