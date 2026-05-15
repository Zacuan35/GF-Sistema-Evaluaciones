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