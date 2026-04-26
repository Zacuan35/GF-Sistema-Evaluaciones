/* =====================
# SELECT ALL
===================== */  
const tables = document.querySelectorAll('.table-grid');

tables.forEach(table => {
  const checkAll = table.querySelector('.tg-check-all');

  if (!checkAll) return;

  checkAll.addEventListener('change', () => {
    const checkItems = table.querySelectorAll('.tg-check-item'); // 👈 se recalcula
    checkItems.forEach(item => {
      item.checked = checkAll.checked;
    });
  });
});


/*
Tip rápido (nivel pro pero sencillo)
Si quieres dejarlo todavía más limpio a futuro, podrías usar un atributo:
<div class="table-grid" data-checkable>

Y en JS:
const tables = document.querySelectorAll('[data-checkable]');
*/