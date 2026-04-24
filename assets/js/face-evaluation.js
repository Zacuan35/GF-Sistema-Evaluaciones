/* =====================
Face - Evaluation
===================== */  
document.querySelectorAll('.faces').forEach(group => {
  const items = group.querySelectorAll('.face-item');
  const input = group.querySelector('input[type="hidden"]');

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      if (input) {
        input.value = item.dataset.value;
      }
    });
  });
});