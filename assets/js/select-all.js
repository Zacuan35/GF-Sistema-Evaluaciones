/* =====================
# SELECT ALL (por tabla)
===================== */
const tables = document.querySelectorAll('[data-checkable]');

tables.forEach(table => {
  const checkAll = table.querySelector('.tg-check-all');

  if (!checkAll) return;

  checkAll.addEventListener('change', () => {
    const checkItems = table.querySelectorAll('.tg-check-item');
    checkItems.forEach(item => {
      item.checked = checkAll.checked;
    });
  });
});

/* =====================
# GET SELECTED ROWS
===================== */
function getSelectedRows(table) {
  const selected = table.querySelectorAll('.tg-check-item:checked');

  return Array.from(selected).map(item => {
    return {
      id: item.value,
      row: item.closest('.tg-row'),
      data: item.closest('.tg-row').dataset
    };
  });
}

/* =====================
# ACTION BUTTONS (por card)
===================== */
document.querySelectorAll('.card').forEach(card => {

  const table = card.querySelector('[data-checkable]');
  if (!table) return;

  const btnAutorizar = card.querySelector('.btn-autorizar');
  const btnRechazar = card.querySelector('.btn-rechazar');

  // AUTORIZAR
  if (btnAutorizar) {
    btnAutorizar.addEventListener('click', () => {
      const selected = getSelectedRows(table);

      if (selected.length === 0) {
        alert('Selecciona al menos una fila');
        return;
      }

      const ids = selected.map(item => item.id);

      console.log('Autorizar:', ids);

      // SweetAlert (opcional)
      const { title, text, icon } = btnAutorizar.dataset;

      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: title || 'Confirmar',
          text: text || '¿Deseas autorizar los elementos seleccionados?',
          icon: icon || 'question',
          confirmButtonText: 'Aceptar'
        });
      }

      // Aquí puedes mandar al backend
      // fetch('/autorizar.php', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(ids)
      // });
    });
  }

  // RECHAZAR
  if (btnRechazar) {
    btnRechazar.addEventListener('click', () => {
      const selected = getSelectedRows(table);

      if (selected.length === 0) {
        alert('Selecciona al menos una fila');
        return;
      }

      const ids = selected.map(item => item.id);

      console.log('Rechazar:', ids);

      // SweetAlert (opcional)
      const { title, text, icon } = btnRechazar.dataset;

      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: title || 'Confirmar',
          text: text || '¿Deseas rechazar los elementos seleccionados?',
          icon: icon || 'warning',
          confirmButtonText: 'Aceptar'
        });
      }

      // Aquí puedes mandar al backend
      // fetch('/rechazar.php', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(ids)
      // });
    });
  }

});