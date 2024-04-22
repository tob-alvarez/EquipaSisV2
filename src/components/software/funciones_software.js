export async function trae_softwares() {

    const JSONdata = JSON.stringify({ tarea: "consulta_software" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/software.php"; // API endpoint where we send form data.

    // Form the request for sending data to the server.
    const options = {
      method: "POST", // The method is POST because we are sending data.
      headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
      body: JSONdata, // Body of the request is the JSON data we created above.
    };
    const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.

    const result = await response.json();
   return result.software;
}

export async function trae_permisos(datos){
  const JSONdata = JSON.stringify({ 
    tarea: datos.tarea,
    software: datos.software ,
    id_usuario: datos.id_usuario
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/software.php"; // API endpoint where we send form data.

  // Form the request for sending data to the server.
  const options = {
    method: "POST", // The method is POST because we are sending data.
    headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON.
    body: JSONdata, // Body of the request is the JSON data we created above.
  };
  const response = await fetch(endpoint, options); // Send the form data to our forms API on Vercel and get a response.
  const result = await response.json();
  
  return result.software;
}

export async function cambia_softwares(datos){
  console.log(datos)
  const JSONdata = JSON.stringify({ 
    tarea: "cambia_software",
    id_software:datos.id_software ,
    nombre_software: datos.nombre_software,
    corto_software: datos.corto_software,
    habilita: datos.habilita
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/software.php"; // API endpoint where we send form data.

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
export async function borra_softwares(datos){
  console.log(datos)
  const JSONdata = JSON.stringify({ 
    tarea: "borra_software",
    id_software:datos.id_software ,
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/software.php"; // API endpoint where we send form data.

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

export async function alta_softwares(datos){

  const JSONdata = JSON.stringify({ 
    tarea: "alta_software",
    nombre_software: datos.nombre_software,
    corto_software: datos.corto_software,
    habilita: datos.habilita
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/software.php"; // API endpoint where we send form data.

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

export async function ayuda_softwares(){

  const JSONdata = JSON.stringify({ 
    tarea: "ayuda_software"
  }); // Send the data to the server in JSON format.
  const endpoint = "https://v2.equipasis.com/api/software.php"; // API endpoint where we send form data.

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
 return result.software;
}

// export async function trae_permiso_acciones(id_usuario){

//   const JSONdata = JSON.stringify({ 
//     tarea: "permiso_usuario",
//     id_usuario: id_usuario
//   }); // Send the data to the server in JSON format.
//   const endpoint = "https://v2.equipasis.com/api/software.php"; // API endpoint where we send form data.

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