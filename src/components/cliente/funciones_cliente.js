export async function trae_clientes() {

    const JSONdata = JSON.stringify({ tarea: "consulta_cliente" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/cliente.php"; // API endpoint where we send form data.

    // Form the request for sending data to the server.
    const options = {
      method: "POST", // The method is POST because we are sending data.
      headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
      body: JSONdata, // Body of the request is the JSON data we created above.
    };
    const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.

    const result = await response.json();
   return result.cliente;
}

export async function trae_permisos(datos){
  const JSONdata = JSON.stringify({ 
    tarea: datos.tarea,
    cliente: datos.cliente ,
    id_usuario: datos.id_usuario
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/cliente.php"; // API endpoint where we send form data.

  // Form the request for sending data to the server.
  const options = {
    method: "POST", // The method is POST because we are sending data.
    headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
    body: JSONdata, // Body of the request is the JSON data we created above.
  };
  const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.
  const result = await response.json();
  
  return result.cliente;
}

export async function cambia_clientes(datos){
  console.log(datos)
  const JSONdata = JSON.stringify({ 
    tarea: "cambia_cliente",
    id_cliente:datos.id_cliente ,
    nombre_cliente: datos.nombre_cliente,
    base_datos: datos.base_datos,
    host: datos.host,
    user: datos.user,
    pass: datos.pass,
    habilita: datos.habilita
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/cliente.php"; // API endpoint where we send form data.

  // Form the request for sending data to the server.
  const options = {
    method: "POST", // The method is POST because we are sending data.
    headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
    body: JSONdata, // Body of the request is the JSON data we created above.
  };
  const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.

  const result = await response.json();
 return result.registros;
}
export async function borra_clientes(datos){
  console.log(datos)
  const JSONdata = JSON.stringify({ 
    tarea: "borra_cliente",
    id_cliente:datos.id_cliente ,
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/cliente.php"; // API endpoint where we send form data.

  // Form the request for sending data to the server.
  const options = {
    method: "POST", // The method is POST because we are sending data.
    headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
    body: JSONdata, // Body of the request is the JSON data we created above.
  };
  const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.

  const result = await response.json();
 return result.registros;
}

export async function alta_clientes(datos){

  const JSONdata = JSON.stringify({ 
    tarea: "alta_cliente",
    nombre_cliente: datos.nombre_cliente,
    base_datos: datos.base_datos,
    host: datos.host,
    user: datos.user,
    pass: datos.pass,
    habilita: datos.habilita
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/cliente.php"; // API endpoint where we send form data.

  // Form the request for sending data to the server.
  const options = {
    method: "POST", // The method is POST because we are sending data.
    headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
    body: JSONdata, // Body of the request is the JSON data we created above.
  };
  const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.

  // Get the response data from server as JSON.
  // If server returns the name submitted, that means the form works.
  const result = await response.json();
 return result.registros;
}

export async function ayuda_clientes(){

  const JSONdata = JSON.stringify({ 
    tarea: "ayuda_cliente"
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/cliente.php"; // API endpoint where we send form data.

  // Form the request for sending data to the server.
  const options = {
    method: "POST", // The method is POST because we are sending data.
    headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
    body: JSONdata, // Body of the request is the JSON data we created above.
  };
  const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.

  // Get the response data from server as JSON.
  // If server returns the name submitted, that means the form works.
  const result = await response.json();
 return result.cliente;
}

// export async function trae_permiso_acciones(id_usuario){

//   const JSONdata = JSON.stringify({ 
//     tarea: "permiso_usuario",
//     id_usuario: id_usuario
//   }); // Send the data to the server in JSON format.
//   const endpoint = "https://v2.equipasis.com/api/cliente.php"; // API endpoint where we send form data.

//   // Form the request for sending data to the server.
//   const options = {
//     method: "POST", // The method is POST because we are sending data.
//     headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
//     body: JSONdata, // Body of the request is the JSON data we created above.
//   };
//   const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.

//   // Get the response data from server as JSON.
//   // If server returns the name submitted, that means the form works.
//   const result = await response.json();
//  return result.accion;
// }