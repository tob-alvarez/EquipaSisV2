export async function trae_equipamiento(datos) {
  const JSONdata = JSON.stringify({
    tarea: "consulta_equipamiento",
    token: datos.token,
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/equipamiento.php"; // API endpoint where we send form data.

  // Form the request for sending data to the server.
  const options = {
    method: "POST", // The method is POST because we are sending data.
    headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
    body: JSONdata, // Body of the request is the JSON data we created above.
  };
  const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.

  const result = await response.json();
  return result.equipamiento;
}

export async function trae_permisos(datos) {
  const JSONdata = JSON.stringify({
    tarea: datos.tarea,
    token: datos.token,
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/equipamiento.php"; // API endpoint where we send form data.

  // Form the request for sending data to the server.
  const options = {
    method: "POST", // The method is POST because we are sending data.
    headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
    body: JSONdata, // Body of the request is the JSON data we created above.
  };
  const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.
  const result = await response.json();

  return result;
}

export async function cambia_acciones(datos) {
  console.log(datos);
  const JSONdata = JSON.stringify({
    tarea: "cambia_accion",
    id_accion: datos.id_accion,
    nombre_accion: datos.nombre_accion,
    corto_accion: datos.corto_accion,
    habilita: datos.habilita,
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/equipamiento.php"; // API endpoint where we send form data.

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
export async function borra_acciones(datos) {
  console.log(datos);
  const JSONdata = JSON.stringify({
    tarea: "borra_accion",
    id_accion: datos.id_accion,
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/equipamiento.php"; // API endpoint where we send form data.

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

export async function alta_acciones(datos) {
  const JSONdata = JSON.stringify({
    tarea: "alta_accion",
    nombre_accion: datos.nombre_accion,
    corto_accion: datos.corto_accion,
    habilita: datos.habilita,
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/equipamiento.php"; // API endpoint where we send form data.

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

export async function ayuda_equipamiento() {
  const JSONdata = JSON.stringify({
    tarea: "ayuda_equipamiento",
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/equipamiento.php"; // API endpoint where we send form data.

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
  return result.equipamiento;
}

export async function trae_combos(tablaBuscar, token) {
  let tarea = "";
  if (tablaBuscar == "organizacion") {
    tarea = "llena_combo_organizacion";
  }else if (tablaBuscar == "servicio") {
    tarea = "llena_combo_servicio";
  }else{
    tarea='llena_combo'
  }

  const JSONdata = JSON.stringify({
    tarea:tarea,
    tabla: tablaBuscar,
    token: token,
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/combos.php"; // API endpoint where we send form data.

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
  return result.datos;
}
// export async function trae_permiso_acciones(id_usuario){

//   const JSONdata = JSON.stringify({
//     tarea: "permiso_usuario",
//     id_usuario: id_usuario
//   }); // Send the data to the server in JSON format.
//   const endpoint = "https://v2.equipasis.com/api/equipamiento.php"; // API endpoint where we send form data.

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
