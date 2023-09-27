
  
  function generaPreReg() {

    const seleccion = $('#nacimientos').bootstrapTable('getSelections')
    alert('getSelection: ' + seleccion)
    console.log(seleccion)

    seleccion.map(async function (obj) {
      console.log(obj)
          await $.post(`/formatos/preregistro`, obj , function (data) {
            if (data.success) {
              $('#msg').show();
              $('#msg').addClass('alert-success');
              $('#msg').text(data.msg);
            } else {
              $('#msg').show();
              $('#msg').addClass('alert-danger');
              $('#msg').text(data.error);
            }
          });

    })

    // seleccion.forEach( async (sel) => {
    //   console.log(sel)

    // } )


  }

  // function nuevaNacimiento(row) {
  //   console.log('row',row);
  
  
  //   let fecha = new Date(row.fecha)
  //   fecha = fecha.toISOString().substr(0, 10)
  //   console.log(fecha)
  //   $('#foalingDateNac).val(fecha)
  //   $('#notesNac).val(row.comentario)
  //   $('#montoNac).val(row.monto)
  //   $('#nutId').val(row._id)
  //   $('#nuevaNac).modal('show')
  
  //   $("#nutriAgregar").hide()
  //   $("#nutriModificar").show()
  //   $("#nutriEliminar").show()
  
  
  // }
  
  
  
  // function nacAgregar(id) {
  //     alert('entro', id)
  //     $.post(`/horses/${encodeURIComponent(id)}/nutricionales`, $('#newNac).serialize(), function (data) {
  //       if (data.success) {
  //         $('#msg').show();
  //         $('#msg').addClass('alert-success');
  //         $('#msg').text(data.msg);
  //       } else {
  //         $('#msg').show();
  //         $('#msg').addClass('alert-danger');
  //         $('#msg').text(data.error);
  //       }
  //     });
  // }
  
  // function nacModificar(id) {
  //   let datos = $('#newNac).serialize()
  //   console.log('datos', datos, id)
  //   $.put(`/horses/${encodeURIComponent(id)}/nutricionales`, datos, function (data) {
  //     if (data.success) {
  //       $('#msg').show();
  //       $('#msg').addClass('alert-success');
  //       $('#msg').text(data.msg);
  //       console.log()
  //       $('#nutricional').bootstrapTable('updateRow', {
  //         index: datos.nutId,
  //         row: {
  //             fecha: datos.fechAplNut,
  //             comentario: datos.notesNut,
  //             monto: datos.montoNut,
  //         }
  //       })
  //     } else {
  //       $('#msg').show();
  //       $('#msg').addClass('alert-danger');
  //       $('#msg').text(data.error);
  //     }
  
  //   });
  // }
  
  
  // function nacimientoBtnNueva(id){
  //   console.log(id);
  
  //   $('#fechAplNac).val('')
  //   $('#notesNac).val('')
  //   $('#montoNac).val(0)
  //   $('#nutId').val('')

  
  //   $("#nacAgregar").show()
  //   $("#nacModificar").hide()
  //   $("#nacEliminar").hide()
  
  
  
  // }




  
  
  // jQuery.each( [ "put", "delete" ], function( i, method ) {
  //   jQuery[ method ] = function( url, data, callback, type ) {
  //     if ( jQuery.isFunction( data ) ) {
  //       type = type || callback;
  //       callback = data;
  //       data = undefined;
  //     }
  
  //     return jQuery.ajax({
  //       url: url,
  //       type: method,
  //       dataType: type,
  //       data: data,
  //       success: callback
  //     });
  //   };
  // });


