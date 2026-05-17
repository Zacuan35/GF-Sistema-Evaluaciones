/* =====================
# MODAL
===================== */  
document.querySelectorAll('[data-modal]').forEach(button => {
  button.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      openModal(modalId);
  });
});

document.querySelectorAll('[data-dismiss="modal"]').forEach(button => {
  button.addEventListener('click', function() {
      const modal = this.closest('.modal-objetive');
      closeModal(modal.id);
  });
});

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "flex";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
}

// Cerrar el modal al hacer clic fuera de él
window.onclick = function(event) {
  if (event.target.classList.contains('modal-objetive')) {
      closeModal(event.target.id);
  }
};

/* =====================
# TOGGLE PANEL
===================== */
document.querySelectorAll('.btn-toggle-panel').forEach(button => {

  button.addEventListener('click', function() {

    // Modal actual
    const modal = this.closest('.modal-objetive');

    // Toggle clase
    modal.classList.toggle('has-panel');

    // Ícono
    const icon = this.querySelector('i');

    if (modal.classList.contains('has-panel')) {
      icon.classList.remove('icon-eye');
      icon.classList.add('icon-eye-slash');
    } else {
      icon.classList.remove('icon-eye-slash');
      icon.classList.add('icon-eye');
    }

  });

});