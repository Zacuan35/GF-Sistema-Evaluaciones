/* =====================
# SWEET ALERT
===================== */  
const alertas = {
	success: {
		title: '¡Felicidades!',
		text: 'La operación se realizó con éxito',
		icon: 'success'
	},
	error: {
		title: '¡Error!',
		text: 'Algo salió mal.',
		icon: 'error'
	},
	delete: {
		title: '¿Estas seguro?',
		text: 'De eliminar este elemento.',
		icon: 'question'
	},
	authorize: {
		title: '¡Felicidades!',
		text: 'El objetivo se autorizó con éxito.',
		icon: 'success'
	}	
};

document.addEventListener('click', (e) => {
	const tipo = e.target.dataset.alert;
	if (!tipo) return;

	const config = alertas[tipo];
	if (!config) return;

	Swal.fire({
		...config,
		confirmButtonText: 'Aceptar',
		customClass: {
			confirmButton: 'btn-alert'
		}
	});
});