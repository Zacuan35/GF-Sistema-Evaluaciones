/* =====================
# SWEET ALERT
===================== */  
function crearAlerta(id, config) {
	const btn = document.getElementById(id);
	if (!btn) return;

	btn.addEventListener('click', () => Swal.fire(config));
}

crearAlerta('alertaExitoBtn', {
	title: '¡Éxito!',
	text: 'Este es un mensaje de éxito.',
	icon: 'success'
});

crearAlerta('alertaErrorBtn', {
	title: '¡Error!',
	text: 'Algo salió mal.',
	icon: 'error'
});

crearAlerta('alertaDeleteBtn', {
	title: '¿Estas seguro?',
	text: 'De eliminar este elemento.',
	icon: 'warning'
});