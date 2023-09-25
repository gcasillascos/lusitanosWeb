function llamaCaballo(id, token) {
  console.log(id, token);

  url = `http://localhost:4500/api/v1/owners/${id}/horses`;

  const config = {
    method: 'get',
    url: `${url}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  axios(config)
    .then((response) => {
      const data = response.data;
      console.log(data.data);

      $('#horseTable')
        .DataTable({
          ajax: 'data',
          dataSrc: 'json',
          dataType: 'json',
          columns: [
            { data: 'name' },
            { data: 'position' },
            { data: 'office' },
            { data: 'extn' },
            { data: 'start_date' },
            { data: 'salary' },
          ],
        })
        .reload();
    })
    .catch((err) => {
      console.log(err.response);
    });

  $('#horsesTable').scrollIntoView();
}


function nuevoCaballo(id, horseName, ownerId) {
  
  console.log(id, ownerId, horseName)
 
  window.location.assign(`./horsesmodal/${encodeURIComponent(ownerId)}/${encodeURIComponent(id)}`)
  // ids = $('#ejemplo').load(
  //   `./horsesmodal/${encodeURIComponent(ownerId)}/${encodeURIComponent(id)}`
    // function () {
    //   if(id != 0) {
    //     $('#modalLabel').text(`Registro: ${id}, ${horseName}`);
    //   } else {
    //     $('#modalLabel').text(`Registro Nuevo`);
    //   }
      
    //   $('#ejemplo').modal('show');
    // }
  //);
}



async function validaCaballo(caballo, sexo, token){
  console.log(caballo, sexo, token )
  alert(caballo + sexo + token )

  url = `http://localhost:4500/api/v1/pedigrees/name/${caballo}/${sexo}`;

  const config = {
    method: 'get',
    url: `${url}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

   await axios(config)
    .then((response) => {
      const data =  response.data;
      console.log(data.data);

      buildTableEjem($('#valEjem'), data.data)
      
    })
    .catch((err) => {
      console.log(err.response);
    });

}



function buildTableEjem($el, data)
{
  console.log('dattos', data)
  $el.bootstrapTable({
    data: data,
    onClickRow: function (row, $element) {
      // row: the record corresponding to the clicked row,
      // $element: the tr element.
      console.log(row)
      corrijeCaballo(row)
    },
  })
}

function corrijeCaballo(data){


  console.log(data, data.regNum)
  $('#sire').val(data.horseName)
  $('#sireRefNum').val(data.regRef)
  $('#xsireRegNum').val(data.regNum)
  $('#sireBreeder').val(data.breeder)
  $('#sireBloodTypeCaseNo').val(data.bloodTypeCaseNo)
  $('#sireMicrochip').val(data.microchip)
  $('#valPads').modal('hide');



}



async function validaReferencia(caballo,  token){
  console.log(caballo, token )


  url = encodeURI(`http://localhost:4500/api/v1/pedigrees?regRef=${caballo}`)


  console.log(url)

  const config = {
    method: 'get',
    url: `${url}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };


   let datosRef = null
   let valError = null

  await axios(config)
   .then((response) => {
    datosRef = response.data
  })
  .catch((err) => {
    console.log(err.response.data)
    const id = '0'
    valError = err.response.data.error

  })

   console.log('datosRef', datosRef, valError)
    return datosRef.data[0]
    


}


function owPersonas(data) {

  buildTablePers($('#tabOws'), data)
  $('#valOwns').modal('toggle');
}

function buildTablePers($el, data)
{
  
  console.log('dattos', data)
    console.log('datos para la tabla', data)
  $el.bootstrapTable({
    data: data,
    onClickRow: function (row, $element) {
      // row: the record corresponding to the clicked row,
      // $element: the tr element.
      console.log(row)
      
    },
  })
}

function corrijePers(data){


  console.log(data)

  $('#valOwns').modal('hide');



}