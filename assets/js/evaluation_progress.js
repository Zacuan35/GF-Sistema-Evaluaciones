/* =====================
# EVALUATION - PROGRESS
===================== */  
document.addEventListener("DOMContentLoaded", () => {
  const progress = document.querySelector(".evaluation_progress");
  if (!progress) return;

  const currentStep = parseInt(progress.dataset.current, 10) || 1;
  const items = progress.querySelectorAll(".evaluation-item");

  items.forEach((item, index) => {
    const step = index + 1;

    item.classList.remove("completed", "active");

    if (step < currentStep) {
      item.classList.add("completed");
    }

    if (step === currentStep) {
      item.classList.add("active");
    }
  });
});