export async function trae_tareas() {

    const JSONdata = JSON.stringify({ tarea: "consulta_tarea" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/tarea.php"; // API endpoint where we send form data.

    // Form the request for sending data to the server.
    const options = {
      method: "POST", // The method is POST because we are sending data.
      headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
      body: JSONdata, // Body of the request is the JSON data we created above.
    };
    const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.

    const result = await response.json();
   return result.tareas;
}

export async function trae_permisos(datos){
  const JSONdata = JSON.stringify({ 
    tarea: datos.tarea,
    tareas: datos.tareas ,
    id_usuario: datos.id_usuario
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/tarea.php"; // API endpoint where we send form data.

  // Form the request for sending data to the server.
  const options = {
    method: "POST", // The method is POST because we are sending data.
    headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
    body: JSONdata, // Body of the request is the JSON data we created above.
  };
  const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.
  const result = await response.json();
  
  return result.tareas;
}

export async function cambia_tareas(datos){
  console.log(datos)
  const JSONdata = JSON.stringify({ 
    tarea: "cambia_tarea",
    id_tarea: datos.id_tarea ,
    nombre_tarea: datos.nombre_tarea,
    id_ttarea: datos.id_ttarea,
    repara: datos.repara,
    down: datos.down,
    restringido: datos.restringido,
    preventivo: datos.preventivo,
    externo: datos.externo,
    habilita: datos.habilita
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/tarea.php"; // API endpoint where we send form data.

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
export async function borra_tareas(datos){
  console.log(datos)
  const JSONdata = JSON.stringify({ 
    tarea: "borra_tarea",
    id_tarea:datos.id_tarea ,
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/tarea.php"; // API endpoint where we send form data.

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

export async function alta_tareas(datos){

  const JSONdata = JSON.stringify({ 
    tarea: "alta_tarea",
    nombre_tarea: datos.nombre_tarea,
    id_ttarea: datos.id_ttarea,
    repara: datos.repara,
    down: datos.down,
    restringido: datos.restringido,
    preventivo: datos.preventivo,
    externo: datos.externo,
    habilita: datos.habilita
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/tarea.php"; // API endpoint where we send form data.

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

export async function ayuda_tareas(){

  const JSONdata = JSON.stringify({ 
    tarea: "ayuda_tarea"
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/tarea.php"; // API endpoint where we send form data.

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
 return result.tareas;
}

// export async function trae_permiso_acciones(id_usuario){

//   const JSONdata = JSON.stringify({ 
//     tarea: "permiso_usuario",
//     id_usuario: id_usuario
//   }); // Send the data to the server in JSON format.
//   const endpoint = "https://v2.equipasis.com/api/tarea.php"; // API endpoint where we send form data.

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