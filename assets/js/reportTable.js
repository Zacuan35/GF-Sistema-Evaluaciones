/* =====================
# ELEMENTS
===================== */

const btnPrint = document.getElementById('btnPrint');
const btnPDF = document.getElementById('btnPDF');
const btnCSV = document.getElementById('btnCSV');

const table = document.getElementById('reportTable');


/* =====================
# GET TABLE DATA
===================== */

function getTableData() {

  const rows = table.querySelectorAll('.tg-row');

  let data = [];

  rows.forEach(row => {

    const cells = row.querySelectorAll('.tg-cell');

    let rowData = [];

    cells.forEach(cell => {
      rowData.push(
        cell.innerText.trim()
      );
    });

    data.push(rowData);

  });

  return data;

}


/* =====================
# PRINT
===================== */

btnPrint.addEventListener('click', () => {

  const printWindow = window.open('', '', 'width=1200,height=800');

  printWindow.document.write(`
    <html>
      <head>
        <title>Print Table</title>

        <style>

          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th,
          td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: left;
            vertical-align: top;
          }

          th {
            background: #f5f5f5;
          }

        </style>
      </head>

      <body>

        ${convertToHTMLTable()}

      </body>
    </html>
  `);

  printWindow.document.close();

  printWindow.focus();

  printWindow.print();

  printWindow.close();

});


/* =====================
# PDF
===================== */

btnPDF.addEventListener('click', () => {

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF({
    orientation: 'landscape'
  });

  const data = getTableData();

  let y = 10;

  data.forEach(row => {

    let line = row.join(' | ');

    doc.text(line, 10, y);

    y += 10;

  });

  doc.save('reporte.pdf');

});


/* =====================
# CSV
===================== */

btnCSV.addEventListener('click', () => {

  const data = getTableData();

  let csv = [];

  data.forEach(row => {

    let cols = row.map(col => {

      return `"${col.replace(/"/g, '""')}"`;

    });

    csv.push(cols.join(','));

  });

  downloadFile(
    csv.join('\n'),
    'reporte.csv',
    'text/csv'
  );

});


/* =====================
# DOWNLOAD FILE
===================== */

function downloadFile(content, filename, type) {

  const file = new Blob(
    [content],
    { type }
  );

  const link = document.createElement('a');

  link.href = URL.createObjectURL(file);

  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

}


/* =====================
# CONVERT TO HTML TABLE
===================== */

function convertToHTMLTable() {

  const data = getTableData();

  let html = '<table>';

  data.forEach((row, index) => {

    html += '<tr>';

    row.forEach(col => {

      if (index === 0) {

        html += `<th>${col}</th>`;

      } else {

        html += `<td>${col}</td>`;

      }

    });

    html += '</tr>';

  });

  html += '</table>';

  return html;

}