/* =====================
# THEME TOGGLE + LOCALSTORAGE
===================== */  

const btn = document.getElementById('theme-btn');
const icon = btn.querySelector('i');

// Aplicar tema guardado al cargar
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  icon.classList.remove('icon-solid-moon');
  icon.classList.add('icon-solid-sun');
}

// Toggle de tema
const toggleTheme = () => {
  const isDark = document.body.classList.toggle('dark-mode');

  // Cambiar ícono
  icon.classList.toggle('icon-solid-sun', isDark);
  icon.classList.toggle('icon-solid-moon', !isDark);

  // Guardar en localStorage
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

btn.addEventListener('click', (e) => {
  e.preventDefault();
  toggleTheme();
});