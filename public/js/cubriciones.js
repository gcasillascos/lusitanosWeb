
function llamaCubricion(id) {
    console.log(id);
    ids = $('#owModal .modal-body').load(
      `./ownermodal/${encodeURIComponent(id)}`,
      function () {
        $('#modalLabel').text(`Ganadería ${id}`);
        $('#owModal').modal('show');
      }
    );
  }

function nuevaCubricion(row) {
    console.log(row);
    alert(JSON.stringify(row));
    $('#tercera').hide()
    $('#cubId').val(row.id)
    $('#damRegNum').val(row.id)
    $('#nuevaCub').modal('show')
    $('#sireName').val(row.sireRegNum)
    console.log(row.sireRegNum)
    $('#sireRegNum').val(row.sireRegNum) //NIN
    $('#tipoCubricion').val(row.tipoCubricion)
    $('#tipoRegistro').val(row.tipoRegistro)
    console.log(row.tipoCubricion)
    $('#resCubricion').val(row.resCubricion)
    console.log(row.resCubricion)
    $('#desc').val(row.desc)
    let fechaMonta = new Date(row.ultimaMonta)
    console.log(fechaMonta)
  
     fechaMonta = fechaMonta.toISOString().substr(0, 10)
    $('#ultimaMonta').val(fechaMonta)
    let fechaDelivery = calculaFecha(fechaMonta)
    console.log(fechaDelivery)
    $('#deliveryDate').val(fechaDelivery)
    $('#fecEst').text(fechaDelivery)
    console.log(row.deliveryDate)
    $('#resCubricion').show()
    $('#desc').show()
    $('#lblComents').show()
    $('#lblResCub').show()
    if(row.resCubricion == 'Gestante' ||row.resCubricion == 'Gestación Gemelar' ){
      $('#tercera').show()
    }

    $("#sendCubAgregar").hide()
    $("#sendCubModificar").show()
    $("#sendCubEliminar").show()


  }

function cubricionBtnNueva(id){
  console.log(id);
  $('#cubId').val('')
  $('#damRegNum').val(id)
  $('#cubMacho').val('')
  $('#sireName').val('')
  $('#sireRegNum').val('') //NIN
  $('#resCubricion').val('none')
  $('#tipoCubricion').val('none')
  $('#tipoRegistro').val('none')
  $('#desc').val('')
  $('#ultimaMonta').val('')
  $('#fecEst').text('')
  $('#deliveryDate').val('')
  $('#resCubricion').hide()
  $('#desc').hide()
  $('#lblComents').hide()
  $('#lblResCub').hide()

  $('#tercera').hide()

  $("#sendCubAgregar").show()
  $("#sendCubModificar").hide()
  $("#sendCubEliminar").hide()
  
}


function cubRegistrar() {
  alert("Register")
  $.post('/cubriciones/cubricionregister', $('#newCub').serialize(), function (data) {
    if (data.success) {
      $('#msg').show();
      $('#msg').addClass('alert-success');
      $('#msg').text(data.msg);
    } else {
      $('#msg').show();
      $('#msg').addClass('alert-danger');
      $('#msg').text(data.error);
    }
    console.log('Appe', data)
    $('#cubriciones').bootstrapTable('append', cubData(data.data))
    $('#nuevaCub').modal('toggle')
  }

  
  );
}

function cubModificar(id) {
  alert('Modificar', id);
  $.post(
    `/cubriciones/cubricionupdate/${id}`,
    $('#newCub').serialize(),
    function (data) {
      if (data.success) {
        $('#msg').show();
        $('#msg').addClass('alert-success');
        $('#msg').text(data.msg);
      } else {
        $('#msg').show();
        $('#msg').addClass('alert-danger');
        $('#msg').text(data.error);
      }
      $('#nuevaCub').modal('toggle')
      $('#msg').hide()
    }

  );
}

function cubEliminar(id) {
  alert('Eliminar',id);
  $.post(
    `/cubriciones/cubriciondelete/${id}`,
    $('#newCub').serialize(),
    function (data) {
      if (data.success) {
        $('#msg').show();
        $('#msg').addClass('alert-success');
        $('#msg').text(data.msg);
      } else {
        $('#msg').show();
        $('#msg').addClass('alert-danger');
        $('#msg').text(data.error);
      }
    }
  );
}


function calculaFecha(fechaStr) {

  console.log(fechaStr)
  deliveryDate = new Date(fechaStr)
  console.log(deliveryDate)
  deliveryDate = deliveryDate.setDate(deliveryDate.getDate() + 345)
  resultDate = new Date(deliveryDate).toISOString().substr(0,10)
  // console.log(deliveryDate.getDate())
  // console.log(deliveryDate.getDate() +388)
  console.log(resultDate)
  $('#fecEst').text(resultDate)
  $('#deliveryDate').val(resultDate)
  return resultDate
  
}

function cubData(data) {
  console.log('append', data)
  nuevoCub = {

      _id: data._id,
      damRegNum: data.damRegNum,
      sireRegNum: data.sireRegNum,
      ultimaMonta: data.ultimaMonta,
      tipoCubricion: data.tipoCubricion,
      tipoRegistro: data.tipoRegistro,
      deliveryDate: data.deliveryDate,
      horseData: [{horseName:'-'}]
  }
 return nuevoCub
}