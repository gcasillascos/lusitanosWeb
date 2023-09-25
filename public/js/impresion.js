function caballos(ops,data) {
    
    console.log(ops,data)

    let url = 'http://localhost:2000/impresion/caballos/2'

    let config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/pdf'
        },
      }

      axios.get(url, 
        data, 
        config,
      )

    
    
     .then((response) => {
      console.log(response.data.body)
       let x = window.open('')

 
      if (x) {
        x.addEventListener('load', () => {
          x.document.open();

          x.document.write(`<iframe width='100%' height='100%' src="data:application/pdf;base64;${response.data.body}></iframe>`);
          x.document.close();
          x.stop();
        }, true);

      }
      x.close()
    }).catch((error) => console.log(error));
    



    }