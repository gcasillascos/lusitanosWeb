function nuevaNutricional(row) {
    console.log('row',row);
  
  
    let fecha = new Date(row.fecha)
    fecha = fecha.toISOString().substr(0, 10)
    console.log(fecha)
    $('#fechAplNut').val(fecha)
    $('#notesNut').val(row.comentario)
    $('#montoNut').val(row.monto)
    $('#nutId').val(row._id)
    $('#nuevaNut').modal('show')
  
    $("#nutriAgregar").hide()
    $("#nutriModificar").show()
    $("#nutriEliminar").show()
  
  
  }
  
  
  
  function nutriAgrega(id) {
      alert('entro', id)
      $.post(`/horses/${encodeURIComponent(id)}/nutricionales`, $('#newNut').serialize(), function (data) {
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
  }
  
  function nutriModifica(id) {
    let datos = $('#newNut').serialize()
    console.log('datos', datos, id)
    $.put(`/horses/${encodeURIComponent(id)}/nutricionales`, datos, function (data) {
      if (data.success) {
        $('#msg').show();
        $('#msg').addClass('alert-success');
        $('#msg').text(data.msg);
        console.log()
        $('#nutricional').bootstrapTable('updateRow', {
          index: datos.nutId,
          row: {
              fecha: datos.fechAplNut,
              comentario: datos.notesNut,
              monto: datos.montoNut,
          }
        })
      } else {
        $('#msg').show();
        $('#msg').addClass('alert-danger');
        $('#msg').text(data.error);
      }
  
    });
  }
  
  
  
  function nutricionalBtnNueva(id){
    console.log(id);
  
    $('#fechAplNut').val('')
    $('#notesNut').val('')
    $('#montoNut').val(0)
    $('#nutId').val('')

  
    $("#nutriAgregar").show()
    $("#nutriModificar").hide()
    $("#nutriEliminar").hide()
  
  
  
  }
  
  
  jQuery.each( [ "put", "delete" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
      if ( jQuery.isFunction( data ) ) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
  
      return jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      });
    };
  });