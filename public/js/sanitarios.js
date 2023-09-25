function nuevaSanitario(row) {
  console.log('row',row);


  let fecha = new Date(row.fecha)
  fecha = fecha.toISOString().substr(0, 10)
  console.log(fecha)
  $('#fechAplSan').val(fecha)
  $('#notesSan').val(row.comentario)
  $('#montoSan').val(row.monto)
  $('#sanId').val(row._id)
  $('#nuevaSan').modal('show')

  $("#sanitAgregar").hide()
  $("#sanitModificar").show()
  $("#sanitEliminar").show()


}



function sanitAgrega(id) {
    alert('entro', id)
    $.post(`/horses/${encodeURIComponent(id)}/sanitarios`, $('#newSan').serialize(), function (data) {
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

function sanitModifica(id) {
  let datos = $('#newSan').serialize()
  console.log('datos', datos, id)
  $.put(`/horses/${encodeURIComponent(id)}/sanitarios`, datos, function (data) {
    if (data.success) {
      $('#msg').show();
      $('#msg').addClass('alert-success');
      $('#msg').text(data.msg);
      console.log()
      $('#sanitario').bootstrapTable('updateRow', {
        index: datos.sanId,
        row: {
            fecha: datos.fechAplSan,
            comentario: datos.notesSan,
            monto: datos.montoSan,
        }
      })
    } else {
      $('#msg').show();
      $('#msg').addClass('alert-danger');
      $('#msg').text(data.error);
    }

  });
}



function sanitarioBtnNueva(id){
  console.log(id);

  $('#fechAplSan').val('')
  $('#notesSan').val('')
  $('#montoSan').val(0)
  $('#sanId').val('')


  $("#sanitAgregar").show()
  $("#sanitModificar").hide()
  $("#sanitEliminar").hide()



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