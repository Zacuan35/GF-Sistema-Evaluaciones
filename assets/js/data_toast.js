const container = document.getElementById('toastContainer');

// Delegación de eventos para cualquier elemento con data-toast
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-toast]');
  if (!trigger) return;

  const message = trigger.dataset.toast;
  const type = trigger.dataset.type || 'info';

  createToast(message, type);
});

function createToast(message, type) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  toast.innerHTML = `
    <span>${message}</span>
    <button>&times;</button>
  `;

  // Botón cerrar
  toast.querySelector('button').addEventListener('click', () => {
    removeToast(toast);
  });

  container.appendChild(toast);

  // Auto cerrar
  setTimeout(() => {
    removeToast(toast);
  }, 4000);
}

function removeToast(toast) {
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(20px)';
  setTimeout(() => toast.remove(), 300);
}