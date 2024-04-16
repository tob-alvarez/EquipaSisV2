export async function trae_procesos() {

    const JSONdata = JSON.stringify({ tarea: "consulta_proceso" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/proceso.php"; // API endpoint where we send form data.

    // Form the request for sending data to the server.
    const options = {
      method: "POST", // The method is POST because we are sending data.
      headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
      body: JSONdata, // Body of the request is the JSON data we created above.
    };
    const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.

    const result = await response.json();
   return result.proceso;
}

export async function trae_permisos(datos){
  const JSONdata = JSON.stringify({ 
    tarea: datos.tarea,
    proceso: datos.proceso ,
    id_usuario: datos.id_usuario
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/proceso.php"; // API endpoint where we send form data.

  // Form the request for sending data to the server.
  const options = {
    method: "POST", // The method is POST because we are sending data.
    headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
    body: JSONdata, // Body of the request is the JSON data we created above.
  };
  const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.
  const result = await response.json();
  
  return result.proceso;
}

export async function cambia_procesos(datos){
  const JSONdata = JSON.stringify({ 
    tarea: "cambia_proceso",
    id_proceso: datos.id_proceso ,
    nombre_proceso: datos.nombre_proceso,
    descripcion: datos.descripcion,
    descripcion_en: datos.descripcion_en,
    descripcion_por: datos.descripcion_por,
    id_opcion: datos.id_opcion,    
    habilita: datos.habilita
  }); // Send the data to the server in JSON format.
  console.log(JSONdata)
  const endpoint = "https://v2.equipasis.com/api/proceso.php"; // API endpoint where we send form data.

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
export async function borra_procesos(datos){
  console.log(datos)
  const JSONdata = JSON.stringify({ 
    tarea: "borra_proceso",
    id_proceso:datos.id_proceso ,
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/proceso.php"; // API endpoint where we send form data.

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

export async function alta_procesos(datos){

  const JSONdata = JSON.stringify({ 
    tarea: "alta_proceso",
    nombre_proceso: datos.nombre_proceso,
    descripcion: datos.descripcion,
    descripcion_en: datos.descripcion_en,
    descripcion_por: datos.descripcion_por,
    id_opcion: datos.id_opcion,
    habilita: datos.habilita
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/proceso.php"; // API endpoint where we send form data.

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

export async function ayuda_procesos(){

  const JSONdata = JSON.stringify({ 
    tarea: "ayuda_proceso"
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/proceso.php"; // API endpoint where we send form data.

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
 return result.proceso;
}

// export async function trae_permiso_acciones(id_usuario){

//   const JSONdata = JSON.stringify({ 
//     tarea: "permiso_usuario",
//     id_usuario: id_usuario
//   }); // Send the data to the server in JSON format.
//   const endpoint = "https://v2.equipasis.com/api/proceso.php"; // API endpoint where we send form data.

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