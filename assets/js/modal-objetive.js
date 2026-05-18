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

    if (!modal) return;

    closeModal(modal.id);
  });
});

function openModal(modalId) {
  const modal = document.getElementById(modalId);

  if (!modal) return;

  modal.style.display = 'flex';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);

  if (!modal) return;

  modal.style.display = 'none';
}

/* =====================
# CLOSE MODAL (BACKDROP)
===================== */

window.addEventListener('click', function (event) {
  if (event.target.classList.contains('modal-objetive')) {
    closeModal(event.target.id);
  }
});

/* =====================
# PANEL TOGGLE
===================== */

document.querySelectorAll('.btn-toggle-panel').forEach(button => {
  button.addEventListener('click', function () {
    const modal = this.closest('.modal-objetive');

    if (!modal) return;

    const icon = this.querySelector('i');

    modal.classList.toggle('has-panel');

    if (icon) {
      if (modal.classList.contains('has-panel')) {
        icon.classList.replace('icon-eye', 'icon-eye-slash');
      } else {
        icon.classList.replace('icon-eye-slash', 'icon-eye');
      }
    }
  });
});

/* =====================
# HELP SYSTEM (CORE)
===================== */

/* Diccionario editable de ayuda contextual */
const formHelp = {
  object: {
    title: 'Objetivo',
    message:
      'Define un objetivo claro, específico y medible. Evita ambigüedades.'
  },

  'business-approach': {
    title: 'Enfoque de negocio',
    message:
      'Selecciona el enfoque estratégico que mejor represente este objetivo.'
  },

  kpi: {
    title: 'Indicador de medición',
    message:
      'Describe cómo se medirá el éxito del objetivo con indicadores concretos, para cuantificar y medir el avance de tu objetivo'
  },

  activities: {
    title: 'Actividades',
    message:
      'Detalla las acciones paso a paso necesarias para lograr el objetivo.'
  },

  weight: {
    title: 'Peso (%)',
    message:
      'Indica qué tan importante es este objetivo dentro del total (0–100%).'
  },

  compliance: {
    title: 'Fecha de cumplimiento',
    message:
      'Selecciona la fecha límite en la que debe cumplirse este objetivo.'
  }
};

/* =====================
# HELP PANEL UPDATE
===================== */

function updateHelpPanel(modal, fieldKey) {
  if (!modal) return;

  const title = modal.querySelector('.modal-info-title');
  const text = modal.querySelector('.modal-info-text');

  if (!title || !text) return;

  const help = formHelp[fieldKey];

  if (!help) {
    title.textContent = 'Ayuda contextual';
    text.textContent =
      'Selecciona un campo para ver ayuda contextual.';
    return;
  }

  title.textContent = help.title;
  text.textContent = help.message;
}

/* =====================
# EVENT DELEGATION (FOCUS)
===================== */

document.addEventListener('focusin', function (e) {
  const field = e.target;

  const isField = field.matches('input, textarea, select');

  if (!isField) return;

  const modal = field.closest('.modal-objetive');

  if (!modal) return;

  const helpKey = field.dataset.help;

  if (!helpKey) return;

  updateHelpPanel(modal, helpKey);
});

//Comentario de prueba.