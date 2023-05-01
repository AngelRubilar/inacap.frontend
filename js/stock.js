
const puerto = 3000

function listar(){
    var requesOption ={
        method: 'GET',
        redirect : 'follow'
    }

    fetch("http://164.90.186.2:"+puerto+"/api/stock", requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(tabla_elementos))
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function tabla_elementos (element, index, arr){
    arr[index] = document.querySelector('#data tbody').innerHTML +=
    `<tr>
    <th scope="row">${element.id_stock}</th>
    <td>${element.cant_producto}</td>
    <td>${element.id_producto}</td>
    <td class="px-6 py-4">
            <a href="editar_anexo.html?id=${element.id_stock}" >Edit</a>
            <a href="Delete-anexo.html?id=${element.id_stock}" >Delete</a>
        </td>
  </tr>
    `;
}


