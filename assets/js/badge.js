/* =====================
# BADGE
===================== */
document.querySelectorAll(".badge-close")
.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".badge").classList.add("is-hidden");
  });
});