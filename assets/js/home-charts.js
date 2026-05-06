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