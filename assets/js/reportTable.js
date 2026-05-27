/* =====================
# ELEMENTS
===================== */

const btnPrint = document.getElementById('btnPrint');
const btnPDF = document.getElementById('btnPDF');
const btnCSV = document.getElementById('btnCSV');

const table = document.getElementById('reportTable');


/* =====================
# PRINT
===================== */

btnPrint.addEventListener('click', () => {

  window.print();

});


/* =====================
# PDF
===================== */

btnPDF.addEventListener('click', () => {

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF({
    orientation: 'landscape'
  });

  doc.setFontSize(16);

  doc.text('Reporte', 14, 15);

  doc.autoTable({

    html: '#reportTable',

    startY: 25,

    styles: {
      fontSize: 8,
      cellPadding: 3,
      valign: 'middle'
    },

    headStyles: {
      fillColor: [40, 40, 40]
    },

    columnStyles: {
      5: { halign: 'center' },
      6: { halign: 'center' },
      7: { halign: 'center' }
    }

  });

  doc.save('reporte.pdf');

});


/* =====================
# CSV
===================== */

btnCSV.addEventListener('click', () => {

  let csv = [];

  const rows = table.querySelectorAll('tr');

  rows.forEach(row => {

    const cols = row.querySelectorAll('th, td');

    let rowData = [];

    cols.forEach(col => {

      let text = col.innerText
        .trim()
        .replace(/"/g, '""');

      rowData.push(`"${text}"`);

    });

    csv.push(rowData.join(','));

  });

  downloadCSV(
    csv.join('\n'),
    'reporte.csv'
  );

});


/* =====================
# DOWNLOAD CSV
===================== */

function downloadCSV(content, fileName) {

  const blob = new Blob(
    [content],
    { type: 'text/csv;charset=utf-8;' }
  );

  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);

  link.download = fileName;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

}