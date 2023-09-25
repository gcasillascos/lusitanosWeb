function llamaPersona(id) {
  console.log(id);
  ids = $('#owModal .modal-body').load(
    `./ownermodal/${encodeURIComponent(id)}`,
    function () {
      $('#modalLabel').text(`Usuario ${id}`);
      $('#owModal').modal('show');
    }
  );
}

function nuevoUsuario(id) {
  ids = $('#owModal .modal-body').load(
    `./usersmodal/${encodeURIComponent(id)}`,
    function () {
      if (id === '0') {
        $('#modalLabel').text('Registro Nuevo');
      } else {
        $('#modalLabel').text(`Usuario ${id}`);
      }

      $('#owModal').modal('show');
    }
  );
}

function usRegistrar() {
  $.post('/owners/ownersregister', $('#newOwner').serialize(), function (data) {
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

function usModificar(id) {
  $.post(
    `/owners/ownersupdate/${id}`,
    $('#newOwner').serialize(),
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

function usEliminar(id) {
  $.post(
    `/owners/ownersdelete/${id}`,
    $('#newOwner').serialize(),
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
