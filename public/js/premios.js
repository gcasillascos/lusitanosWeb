function nuevaPremio(row) {
  console.log('row',row);


  let fecha = new Date(row.fecha)

  fecha = fecha.toISOString().substr(0, 10)
  console.log(fecha)
  $('#preId').val(row._id)
  $('#competicionPre').val(row.competicion)
  $('#fechaPre').val(row.fecha)
  $('#grupoPre').val(row.Grupo)
  $('#grupoNPre').val(row.GrupoNo)
  $('#nombreGPre').val(row.nombreGrupo)
  $('#caballoNPre').val(row.caballoNo)
  $('#nuevaPre').modal('show')


  $("#preAgregar").hide()
  $("#preModificar").show()
  $("#preEliminar").show()


}



function preAgrega(id) {
    alert('entro', id)
    $.post(`/horses/${encodeURIComponent(id)}/premios`, $('#newPre').serialize(), function (data) {
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

function preModifica(id) {
  let datos = $('#newPre').serialize()
  console.log('datos', datos, id)
  $.put(`/horses/${encodeURIComponent(id)}/premios`, datos, function (data) {
    if (data.success) {
      $('#msg').show();
      $('#msg').addClass('alert-success');
      $('#msg').text(data.msg);
      console.log()
      $('#premios').bootstrapTable('updateRow', {
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



function premioBtnNueva(id){
  console.log(id);


  $('#preId').val('')
  $('#competicionPre').val('')
  $('#fechaPre').val('')
  $('#grupoPre').val('')
  $('#grupoNPre').val('')
  $('#nombreGPre').val('')
  $('#caballoNPre').val('')
  

  $("#preAgregar").show()
  $("#preModificar").hide()
  $("#preEliminar").hide()



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