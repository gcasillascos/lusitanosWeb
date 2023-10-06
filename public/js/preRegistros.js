function generaRegistro() {

    const seleccion = $('#preRegs').bootstrapTable('getSelections')
    alert('Registro getSelection: ' + seleccion)
    console.log(seleccion)

    seleccion.map(async function (obj) {
      console.log('entro ', obj)
          await $.post(`/horses/horsesregister`, obj , function (data) {
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

  }