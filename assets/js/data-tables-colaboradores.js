/* =====================
# Data-tables-colaboradores
===================== */
$(document).ready(function() {


  let tabla = $('#miTabla').DataTable();

  let seleccionados = [];



  // Selección individual
  $('#miTabla tbody').on('change', '.row-check', function(){


    let fila = tabla
      .row($(this).closest('tr'))
      .data();


    let empleado = fila[1];
    let nombre = fila[2];



    if(this.checked){


      // Evitar duplicados
      if(!seleccionados.some(item => item.id == empleado)){


        seleccionados.push({

          id: empleado,
          nombre: nombre

        });

      }


    }else{


      seleccionados = seleccionados.filter(

        item => item.id != empleado

      );


    }


    renderBadges();


  });


  // Seleccionar todos
  $('#checkAll').on('change', function(){


    let estado = this.checked;


    $('.row-check').each(function(){


      $(this).prop(
        'checked',
        estado
      );


      let fila = tabla
        .row($(this).closest('tr'))
        .data();


      let empleado = fila[1];
      let nombre = fila[2];



      if(estado){


        if(!seleccionados.some(item => item.id == empleado)){


          seleccionados.push({

            id: empleado,
            nombre: nombre

          });


        }


      }else{


        seleccionados = seleccionados.filter(

          item => item.id != empleado

        );


      }


    });


    renderBadges();


  });


  function renderBadges(){


    let contenedor = $('#seleccionados');


    contenedor.html('');



    seleccionados.forEach(item => {


      contenedor.append(`


        <span class="badge">


          ${item.nombre}


          <button 
            class="remove-badge"
            data-id="${item.id}">
            ×
          </button>


        </span>


      `);


    });


  }


  // Quitar desde el badge
  $('#seleccionados').on('click','.remove-badge',function(){


    let id = $(this).data('id');


    seleccionados = seleccionados.filter(

      item => item.id != id

    );



    $('.row-check').each(function(){


      let fila = tabla
        .row($(this).closest('tr'))
        .data();



      if(fila[1] == id){


        $(this).prop(

          'checked',
          false

        );


      }


    });



    renderBadges();



  });

});