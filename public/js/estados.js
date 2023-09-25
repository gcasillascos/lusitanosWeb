function llamaEstado(id) {
    console.log(id);
    ids = $('#owModal .modal-body').load(
      `./ownermodal/${encodeURIComponent(id)}`,
      function () {
        $('#modalLabel').text(`Ganadería ${id}`);
        $('#owModal').modal('show');
      }
    );
  }

function nuevoEstado(row) {
  alert(JSON.stringify(row));
  console.log(row)
  ids = $('#owModal .modal-body').load(
    `./ganaderiamodal/${encodeURIComponent(row.id)}/${encodeURIComponent(row.ownerId)}`,
    function () {
      $('#modalLabel').text(row.horseName);
      $('#owModal').modal('show');
    }
  );
}