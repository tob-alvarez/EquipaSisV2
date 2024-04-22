export async function trae_personas() {

    const JSONdata = JSON.stringify({ tarea: "consulta_persona" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/persona.php"; // API endpoint where we send form data.

    // Form the request for sending data to the server.
    const options = {
      method: "POST", // The method is POST because we are sending data.
      headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
      body: JSONdata, // Body of the request is the JSON data we created above.
    };
    const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.

    const result = await response.json();
   return result.persona;
}

export async function trae_permisos(datos){
  const JSONdata = JSON.stringify({ 
    tarea: datos.tarea,
    persona: datos.persona ,
    id_usuario: datos.id_usuario
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/persona.php"; // API endpoint where we send form data.

  // Form the request for sending data to the server.
  const options = {
    method: "POST", // The method is POST because we are sending data.
    headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
    body: JSONdata, // Body of the request is the JSON data we created above.
  };
  const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.
  const result = await response.json();
  
  return result.persona;
}

export async function cambia_personas(datos){
  console.log(datos)
  const JSONdata = JSON.stringify({ 
    tarea: "cambia_persona",
    id_persona: datos.id_persona ,
    nombre_persona: datos.nombre_persona,
    corto_persona: datos.corto_persona,
    domicilio_persona: datos.domicilio_persona,
    localidad_persona: datos.localidad_persona,
    id_pais: datos.id_pais,
    id_provincia: datos.id_provincia,
    telefono_persona: datos.telefono_persona,
    email_persona: datos.email_persona,    
    id_empresa: datos.id_empresa,
    id_tpersona: datos.id_tpersona,
    adjunto: datos.adjunto,
    es_usuario: datos.es_usuario,
    habilita: datos.habilita
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/persona.php"; // API endpoint where we send form data.

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
export async function borra_personas(datos){
  console.log(datos)
  const JSONdata = JSON.stringify({ 
    tarea: "borra_persona",
    id_persona:datos.id_persona ,
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/persona.php"; // API endpoint where we send form data.

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

export async function alta_personas(datos){

  const JSONdata = JSON.stringify({ 
    tarea: "alta_persona",
    nombre_persona: datos.nombre_persona,
    corto_persona: datos.corto_persona,
    domicilio_persona: datos.domicilio_persona,
    localidad_persona: datos.localidad_persona,
    id_pais: datos.id_pais,
    id_provincia: datos.id_provincia,
    telefono_persona: datos.telefono_persona,
    email_persona: datos.email_persona,    
    id_empresa: datos.id_empresa,
    id_tpersona: datos.id_tpersona,
    adjunto: datos.adjunto,
    es_usuario: datos.es_usuario,
    habilita: datos.habilita
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/persona.php"; // API endpoint where we send form data.

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

export async function ayuda_personas(){

  const JSONdata = JSON.stringify({ 
    tarea: "ayuda_persona"
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/persona.php"; // API endpoint where we send form data.

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
 return result.persona;
}

// export async function trae_permiso_acciones(id_usuario){

//   const JSONdata = JSON.stringify({ 
//     tarea: "permiso_usuario",
//     id_usuario: id_usuario
//   }); // Send the data to the server in JSON format.
//   const endpoint = "https://v2.equipasis.com/api/persona.php"; // API endpoint where we send form data.

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