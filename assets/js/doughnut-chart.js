const ctxDoughnut = document.getElementById('doughnutChart');

new Chart(ctxDoughnut, {
  type: 'doughnut',

  data: {
    labels: ['Rojo', 'Azul', 'Amarillo'],

    datasets: [{
      label: 'Colores',

      data: [300, 50, 100],

      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)'
      ]
    }]
  }
});