/* =====================
# BADGE
===================== */
document.querySelectorAll(".badge-close")
.forEach(btn => {

  btn.addEventListener("click", () => {

    const badge = btn.closest(".badge");

    badge.classList.add("is-hidden");


    setTimeout(() => {
      badge.remove();
    }, 300);

  });

});