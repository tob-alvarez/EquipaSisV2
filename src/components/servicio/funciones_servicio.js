export async function trae_servicios() {

    const JSONdata = JSON.stringify({ tarea: "consulta_servicio" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/servicio.php"; // API endpoint where we send form data.

    // Form the request for sending data to the server.
    const options = {
      method: "POST", // The method is POST because we are sending data.
      headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
      body: JSONdata, // Body of the request is the JSON data we created above.
    };
    const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.

    const result = await response.json();
   return result.servicio;
}

export async function trae_permisos(datos){
  const JSONdata = JSON.stringify({ 
    tarea: datos.tarea,
    servicio: datos.servicio ,
    id_usuario: datos.id_usuario
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/servicio.php"; // API endpoint where we send form data.

  // Form the request for sending data to the server.
  const options = {
    method: "POST", // The method is POST because we are sending data.
    headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
    body: JSONdata, // Body of the request is the JSON data we created above.
  };
  const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.
  const result = await response.json();
  
  return result.servicio;
}

export async function cambia_servicios(datos){
  console.log(datos)
  const JSONdata = JSON.stringify({ 
    tarea: "cambia_servicio",
    id_servicio:datos.id_servicio ,
    nombre_servicio: datos.nombre_servicio,
    corto_servicio: datos.corto_servicio,
    habilita: datos.habilita
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/servicio.php"; // API endpoint where we send form data.

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
export async function borra_servicios(datos){
  console.log(datos)
  const JSONdata = JSON.stringify({ 
    tarea: "borra_servicio",
    id_servicio:datos.id_servicio ,
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/servicio.php"; // API endpoint where we send form data.

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

export async function alta_servicios(datos){

  const JSONdata = JSON.stringify({ 
    tarea: "alta_servicio",
    nombre_servicio: datos.nombre_servicio,
    corto_servicio: datos.corto_servicio,
    habilita: datos.habilita
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/servicio.php"; // API endpoint where we send form data.

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

export async function ayuda_servicios(){

  const JSONdata = JSON.stringify({ 
    tarea: "ayuda_servicio"
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/servicio.php"; // API endpoint where we send form data.

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
 return result.servicio;
}

// export async function trae_permiso_acciones(id_usuario){

//   const JSONdata = JSON.stringify({ 
//     tarea: "permiso_usuario",
//     id_usuario: id_usuario
//   }); // Send the data to the server in JSON format.
//   const endpoint = "https://v2.equipasis.com/api/servicio.php"; // API endpoint where we send form data.

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