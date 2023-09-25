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

  function nuevaBaja(id) {
    ids = $('#owModal .modal-body').load(
      `./bajamodal/${encodeURIComponent(id)}`,
      function () {
        $('#modalLabel').text('Registro Nuevo');
        $('#owModal').modal('show');
      }
    );
  }