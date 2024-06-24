export async function trae_gestion_solicitudes() {

    const JSONdata = JSON.stringify({ tarea: "consulta_gestion_solicitud" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/gestion_solicitud.php"; // API endpoint where we send form data.

    // Form the request for sending data to the server.
    const options = {
      method: "POST", // The method is POST because we are sending data.
      headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
      body: JSONdata, // Body of the request is the JSON data we created above.
    };
    const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.

    const result = await response.json();
   return result.gestion_solicitud;
}

export async function trae_permisos(datos){
  const JSONdata = JSON.stringify({ 
    tarea: datos.tarea,
    solicitud: datos.solicitud ,
    id_usuario: datos.id_usuario
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/gestion_solicitud.php"; // API endpoint where we send form data.

  // Form the request for sending data to the server.
  const options = {
    method: "POST", // The method is POST because we are sending data.
    headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
    body: JSONdata, // Body of the request is the JSON data we created above.
  };
  const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.
  const result = await response.json();
  
  return result.solicitud;
}

export async function cambia_gestion_solicitudes(datos){
  console.log(datos)
  const JSONdata = JSON.stringify({ 
    tarea: "cambia_gestion_solicitud",
    id_solicitud: datos.id_solicitud ,
    detalle_solicita: datos.detalle_solicita,
    id_organizacion_solicita: datos.id_organizacion_solicita,
    id_servicio_solicita: datos.id_servicio_solicita,
    id_persona_solicita: datos.id_persona_solicita,
    id_tsolicitud: datos.id_tsolicitud,
    id_persona_deriva: datos.id_persona_deriva,
    fecha_hora: datos.fecha_hora,
    habilita: datos.habilita
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/gestion_solicitud.php"; // API endpoint where we send form data.

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

export async function borra_gestion_solicitudes(datos){
  console.log(datos)
  const JSONdata = JSON.stringify({ 
    tarea: "borra_gestion_solicitud",
    id_solicitud:datos.id_solicitud ,
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/gestion_solicitud.php"; // API endpoint where we send form data.

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

export async function ayuda_gestion_solicitudes(){

  const JSONdata = JSON.stringify({ 
    tarea: "ayuda_gestion_solicitud"
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/gestion_solicitud.php"; // API endpoint where we send form data.

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
 return result.gestion_solicitud;
}
