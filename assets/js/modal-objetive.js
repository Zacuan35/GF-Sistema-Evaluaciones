/* =====================
# MODAL CORE
===================== */
document.querySelectorAll('[data-modal]').forEach(button => {
  button.addEventListener('click', function () {
    const modalId = this.getAttribute('data-modal');
    openModal(modalId);
  });
});

document.querySelectorAll('[data-dismiss="modal"]').forEach(button => {
  button.addEventListener('click', function () {
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

window.onclick = function (event) {
  if (event.target.classList.contains('modal-objetive')) {
    closeModal(event.target.id);
  }
};

/* =====================
# PANEL TOGGLE
===================== */
document.querySelectorAll('.btn-toggle-panel').forEach(button => {
  button.addEventListener('click', function () {
    const modal = this.closest('.modal-objetive');
    const icon = this.querySelector('i');

    modal.classList.toggle('has-panel');

    if (modal.classList.contains('has-panel')) {
      icon.classList.replace('icon-eye', 'icon-eye-slash');
    } else {
      icon.classList.replace('icon-eye-slash', 'icon-eye');
    }
  });
});

/* =====================
# HELP SYSTEM (CORE)
===================== */

/**
 * Diccionario editable de ayuda contextual
 * Aquí es donde tu equipo mantiene el contenido
 */
const formHelp = {
  object: "Define un objetivo claro, específico y medible. Evita ambigüedades.",
  
  "business-approach": "Selecciona el enfoque estratégico que mejor represente este objetivo.",
  
  kpi: "Describe cómo se medirá el éxito del objetivo con indicadores concretos.",
  
  activities: "Detalla las acciones paso a paso necesarias para lograr el objetivo.",
  
  weight: "Indica qué tan importante es este objetivo dentro del total (0–100%).",
  
  compliance: "Selecciona la fecha límite en la que debe cumplirse este objetivo."
};

/**
 * Actualiza el panel de ayuda
 */
function updateHelpPanel(fieldId) {
  const activeModal = document.querySelector('.modal-objetive[style*="flex"]');
  if (!activeModal) return;

  const panel = activeModal.querySelector('.modal-info-text');
  const message = formHelp[fieldId] || "Selecciona un campo para ver ayuda contextual.";

  panel.textContent = message;
}

/* =====================
# EVENT DELEGATION (IMPORTANTE)
===================== */
document.addEventListener('focusin', function (e) {
  const field = e.target;

  const isField =
    field.tagName === 'INPUT' ||
    field.tagName === 'TEXTAREA' ||
    field.tagName === 'SELECT';

  if (!isField) return;

  const modal = field.closest('.modal-objetive');
  if (!modal) return;

  const id = field.id;
  updateHelpPanel(id);
});