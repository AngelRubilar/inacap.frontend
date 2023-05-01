let g_id_tipo_producto =0
const puerto = 3000

function listar(){
    var requestOptions ={
        method: 'GET',
        redirect : 'follow'
    }

    fetch("http://164.90.186.2:"+puerto+"/api/tipo_producto", requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(tabla_elementos))
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function tabla_elementos (element, index, arr){
    arr[index] = document.querySelector('#cnt_tabla tbody').innerHTML +=
    `<tr>
    <td>${element.id_tipo_producto}</td>
    <td>${element.nombre_tipo_producto}</td>
    <td>${element.descripcion}</td>
    <td>
            <a href="editar_tipo.html?id=${element.id_tipo_producto}" >Edit</a>
            <a href="eliminar_tipo.html?id=${element.id_tipo_producto}" >Delete</a>
        </td>
  </tr>
    `;
}


// Agregar datos en la base de datos
function agregar(){
     //crear el headders para pasar a json

     var myHeaders = new Headers();
     myHeaders.append("Content-Type", "application/json");

    var nombre_tipo = document.getElementById('txt_nombre_tipo').value;
    var descripcion = document.getElementById('txt_descripcion').value;
    
    var raw = JSON.stringify({        
        "nombre_tipo" : nombre_tipo,
        "descripcion" : descripcion
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
     
  fetch("http://164.90.186.2:"+puerto+"/api/tipo_producto", requestOptions)
  .then(response => {
    if(response.status == 200 ){
      console.log("Los datos se agregaron Correctamente!!!!")
    }else{
        console.log("Error al intentar agregar los datos")
    }

    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}


// obtener dados id
function obtenerId (){
    // obtenemos los datos de la URL Actual
    var queryString = window.location.search;  
    // obtenemos los parámetros de la URL
    var urlParams = new URLSearchParams(queryString);
    //obtenemos el id del tipo porducto
    var p_id_tipo_producto = urlParams.get("id");
    // Asignamos un valor a variable global
    g_id_tipo_producto = p_id_tipo_producto
    //Invocamos funcion para obtener datos desde API REST
    obtener_datos(p_id_tipo_producto)

}


function obtener_datos (p_id_tipo_producto){
    
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
       };

       fetch("http://164.90.186.2:"+puerto+"/api/tipo_producto/"+p_id_tipo_producto, requestOptions)
          .then((response) => response.json())
          .then((json) => json.forEach(mostrarDatos))      
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

}

function mostrarDatos(element){

    var id_tipo_producto = element.id_tipo_producto;
    var nombre_tipo = element.nombre_tipo_producto;
    var descripcion = element.descripcion;

    document.getElementById('txt_id_tipo').value = id_tipo_producto
    document.getElementById('txt_nombre_tipo').value = nombre_tipo
    document.getElementById('txt_descripcion').value = descripcion
}



function eliminar (){
    var requestOptions ={
        method : 'DELETE',
        redirect:'follow'
      }
    
      fetch("http://157.230.48.161:"+puerto+"/api/tipo_producto/"+g_id_tipo_producto, requestOptions)
      .then(response => {
        if (response.status == 200){
            alert("Eliminado con exito")
        }else{}
            alert("error")
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
    }



function actualizarDatos (){
    //otener los datos desde el html
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var nombre_tipo = document.getElementById('txt_nombre_tipo').value;
    var descripcion = document.getElementById('txt_descripcion').value;
    
    var raw = JSON.stringify({
        
       "nombre_tipo" : nombre_tipo,
       "descripcion" : descripcion
    });
    
    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
     };
    
          
    
    fetch("http://157.230.48.161:"+puerto+"/api/tipo_producto/"+g_id_tipo_producto, requestOptions)
        .then(response => {
        if(response.status == 200){  
        }else{
            };
        })
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }
    
   