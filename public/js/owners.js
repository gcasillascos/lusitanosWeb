function llamaPersona(id) {
  console.log(id);
  ids = $('#owModal .modal-body').load(
    `./ownermodal/${encodeURIComponent(id)}`,
    function () {
      $('#modalLabel').text(`Ganadería ${id}`);
      $('#owModal').modal('show');
    }
  );
}

function nuevaPersona(id) {
  ids = $('#owModal .modal-body').load(
    `./ownermodal/${encodeURIComponent(id)}`,
    function () {
      $('#modalLabel').text('Registro Nuevo');
      $('#owModal').modal('show');
    }
  );
}

function owRegistrar() {
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

function owModificar(id) {
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

function owEliminar(id) {
  alert(id);
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

function agregaImagen() {
  alert('entramos');
  var selectDialogueLink = $('<a href="">Select files</a>');
  var fileSelector = $('<input type="file">');

  selectDialogueLink.click(function () {
    fileSelector.click();
    return false;
  });
}


function hideSpinner() {
  document.getElementById('spinner')
          .style.display = 'none';
}


function llamaGanado(id, farm) {
  
  console.log(id, farm);
  ids = $('#owModal .modal-body').load(
    `./ownerDirModal/${encodeURIComponent(id)}`,
    function () {
      $('#modalLabel').text(`Ganadería: ${farm}`);
      $('#owModal').modal('show');
    }
  );
}