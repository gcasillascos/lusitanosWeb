function changePwdValidation() {
  let password = document.getElementById('currentPassword').value;
  let newPassword = document.getElementById('newPassword').value;
  let newPasswordConf = document.getElementById('newPasswordConf').value;

  console.log(` ${password} ${newPassword} ${newPasswordConf}`);
  if (password === '' || newPassword === '' || newPasswordConf === '') {
    alert('All fields must be filled out');
    return false;
  }
  if (password === newPassword) {
    alert("New password can't be equal to current Password.");
    return false;
  }
  if (newPassword !== newPasswordConf) {
    alert('New Password and Confirmation Password do not match.');
    return false;
  }
}

function llamaPedigree(id, ownerId, horseName) {

  console.log(id, ownerId);
  if(ownerId === "") {
    ownerId = "0000"
  }
  //ejemplares.push({id, ownerId, horseName})

  ids = $('#owModal .modal-body').load(
    `./arbolmodal/${encodeURIComponent(ownerId)}/${encodeURIComponent(id)}`,
    function () {
      $('#modalLabel').text(`Ejemplar ${id} ${horseName}`);
      $('#owModal').modal('show');
    }
  );
}

function seleccionaNodo(nodo, data) {
  console.log(data)
  let resultado = data.filter(obj => {
    return obj.id === nodo.toString()})
    console.log(resultado[0].horseName, nodo)
    
    llamaPedigree(resultado[0].regRef, resultado[0].ownerId, resultado[0].horseName);

}