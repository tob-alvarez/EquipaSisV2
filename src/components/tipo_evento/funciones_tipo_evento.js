export async function trae_tipo_eventos() {

    const JSONdata = JSON.stringify({ tarea: "consulta_tipo_evento" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/tipo_evento.php"; // API endpoint where we send form data.

    // Form the request for sending data to the server.
    const options = {
      method: "POST", // The method is POST because we are sending data.
      headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
      body: JSONdata, // Body of the request is the JSON data we created above.
    };
    const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.

    const result = await response.json();
   return result.tipo_evento;
}

export async function trae_permisos(datos){
  const JSONdata = JSON.stringify({ 
    tarea: datos.tarea,
    tipo_evento: datos.tipo_evento ,
    id_usuario: datos.id_usuario
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/tipo_evento.php"; // API endpoint where we send form data.

  // Form the request for sending data to the server.
  const options = {
    method: "POST", // The method is POST because we are sending data.
    headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
    body: JSONdata, // Body of the request is the JSON data we created above.
  };
  const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.
  const result = await response.json();
  
  return result.tipo_evento;
}

export async function cambia_tipo_eventos(datos){
  console.log(datos)
  const JSONdata = JSON.stringify({ 
    tarea: "cambia_tipo_evento",
    id_tevento:datos.id_tevento ,
    nombre_tevento: datos.nombre_tevento,
    habilita: datos.habilita
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/tipo_evento.php"; // API endpoint where we send form data.

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
export async function borra_tipo_eventos(datos){
  console.log(datos)
  const JSONdata = JSON.stringify({ 
    tarea: "borra_tipo_evento",
    id_tevento:datos.id_tevento ,
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/tipo_evento.php"; // API endpoint where we send form data.

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

export async function alta_tipo_eventos(datos){

  const JSONdata = JSON.stringify({ 
    tarea: "alta_tipo_evento",
    nombre_tevento: datos.nombre_tevento,
    habilita: datos.habilita
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/tipo_evento.php"; // API endpoint where we send form data.

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

export async function ayuda_tipo_eventos(){

  const JSONdata = JSON.stringify({ 
    tarea: "ayuda_tipo_evento"
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/tipo_evento.php"; // API endpoint where we send form data.

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
 return result.tipo_evento;
}
