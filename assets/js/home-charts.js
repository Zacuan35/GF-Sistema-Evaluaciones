const objectivesChart = document.getElementById('objectivesChart');

new Chart(objectivesChart, {
  type: 'doughnut',

  data: {
    labels: ['Completado', 'Pendiente'],

    datasets: [{
      data: [80, 20]
    }]
  },

  options: {
    responsive: false,

    plugins: {
      legend: {
        display: false
      }
    }
  }
});

const skillsChart = document.getElementById('skillsChart');

new Chart(skillsChart, {
  type: 'doughnut',

  data: {
    labels: ['Aprobado', 'Faltante'],

    datasets: [{
      data: [60, 40]
    }]
  },

  options: {
    responsive: false,

    plugins: {
      legend: {
        display: false
      }
    }
  }
});


// ===== Evaluación por competencias =====

const competencyChart = document.getElementById('competencyChart');

new Chart(competencyChart, {
  type: 'bar',

  data: {
    labels: [
      'Mejora continua',
      'Resolución de problemas',
      'Compromiso con área y empresa',
      'Respeto por las ideas de los demás',
      'Comunicación efectiva'
    ],

    datasets: [{
      label: 'Calificación',

      data: [9, 8, 10, 7, 9],

      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(153, 102, 255, 0.7)'
      ],

      borderWidth: 1
    }]
  },

  options: {
    indexAxis: 'y',

    responsive: false,

    scales: {
      x: {
        beginAtZero: true,
        max: 10
      }
    },

    plugins: {
      legend: {
        display: false
      }
    }
  }
});