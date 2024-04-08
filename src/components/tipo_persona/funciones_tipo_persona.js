export async function trae_tipo_personas() {

    const JSONdata = JSON.stringify({ tarea: "consulta_tipo_persona" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/tipo_persona.php"; // API endpoint where we send form data.

    // Form the request for sending data to the server.
    const options = {
      method: "POST", // The method is POST because we are sending data.
      headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
      body: JSONdata, // Body of the request is the JSON data we created above.
    };
    const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.

    const result = await response.json();
   return result.tipo_persona;
}

export async function trae_permisos(datos){
  const JSONdata = JSON.stringify({ 
    tarea: datos.tarea,
    tipo_persona: datos.tipo_persona ,
    id_usuario: datos.id_usuario
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/tipo_persona.php"; // API endpoint where we send form data.

  // Form the request for sending data to the server.
  const options = {
    method: "POST", // The method is POST because we are sending data.
    headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
    body: JSONdata, // Body of the request is the JSON data we created above.
  };
  const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.
  const result = await response.json();
  
  return result.tipo_persona;
}

export async function cambia_tipo_personas(datos){
  console.log(datos)
  const JSONdata = JSON.stringify({ 
    tarea: "cambia_tipo_persona",
    id_tpersona:datos.id_tpersona ,
    nombre_tpersona: datos.nombre_tpersona,
    habilita: datos.habilita
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/tipo_persona.php"; // API endpoint where we send form data.

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
export async function borra_tipo_personas(datos){
  console.log(datos)
  const JSONdata = JSON.stringify({ 
    tarea: "borra_tipo_persona",
    id_tpersona:datos.id_tpersona ,
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/tipo_persona.php"; // API endpoint where we send form data.

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

export async function alta_tipo_personas(datos){

  const JSONdata = JSON.stringify({ 
    tarea: "alta_tipo_persona",
    nombre_tpersona: datos.nombre_tpersona,
    habilita: datos.habilita
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/tipo_persona.php"; // API endpoint where we send form data.

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

export async function ayuda_tipo_personas(){

  const JSONdata = JSON.stringify({ 
    tarea: "ayuda_tipo_persona"
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/tipo_persona.php"; // API endpoint where we send form data.

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
 return result.tipo_persona;
}
