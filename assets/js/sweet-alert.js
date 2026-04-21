/* =====================
# SWEET ALERT
===================== */  
document.addEventListener('click', (e) => {
	const btn = e.target.closest('[data-title]');
	if (!btn) return;

	const title = btn.dataset.title;
	const text = btn.dataset.text || '';
	const icon = btn.dataset.icon || 'info'; // default

	Swal.fire({
		title,
		text,
		icon,
		confirmButtonText: 'Aceptar',
		customClass: {
			confirmButton: 'btn-alert'
		}
	});
});