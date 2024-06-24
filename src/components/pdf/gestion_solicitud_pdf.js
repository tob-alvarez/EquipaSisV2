import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export function gestion_solicitud_pdf(filtro, idioma) {
    let titulo;
    let detallesolicita;
    let nombre_tsolicitud;
    let corto_organizacion_solicita;
    let corto_servicio_solicita;
    let nombre_persona_solicita;
    let nombre_persona_deriva;
    let nombre_persona_resuelve;
    let fecha_hora;
    let habilitado;
    let page; 
    let reporte;
    if (idioma === 'es') {
      titulo = "Registro de Gestión de Solicitudes";
      detallesolicita = "Detalle de Solicitud";
      nombre_tsolicitud = "Tipo de Solicitud";
      corto_organizacion_solicita = "Organización que Solicita";
      corto_servicio_solicita = "Servicio que Solicita";
      nombre_persona_solicita = "Persona que Solicita";
      nombre_persona_deriva = "Persona que Deriva";
      nombre_persona_resuelve = "Persona que Resuelve";
      fecha_hora = "Fecha y Hora";
      habilitado = "Habil.";
      page = "Página";
      reporte = "Reporte al"
    } else if (idioma === 'en') {
      titulo = "Request Management";
      detallesolicita = "Request Details";
      nombre_tsolicitud = "Type of Request";
      corto_organizacion_solicita = "Requesting Organization";
      corto_servicio_solicita = "Service You Request";
      nombre_persona_solicita = "Requesting Person";
      nombre_persona_deriva = "Drifting Person";
      nombre_persona_resuelve = "Solving Person";
      fecha_hora = "Date and Time";
      habilitado = "Enab.";
      page = "Page";
      reporte = "Report as of";
    } else if (idioma === 'por') {
      titulo = "Gerenciamento de Solicitações";
      detallesolicita = "Detalhes";
      nombre_tsolicitud = "Tipo de Solicitação";
      corto_organizacion_solicita = "Organização Solicitante";
      corto_servicio_solicita = "Serviço que você Solicita";
      nombre_persona_solicita = "Pessoa Solicitante";
      nombre_persona_deriva = "Pessoa à Deriva";
      nombre_persona_resuelve = "Pessoa Resolvedora";
      fecha_hora = "Data e hora";
      habilitado = "Habil.";
      page = "Página";
      reporte = "Relatório em";
    } else {
      titulo = "Registro de Gestión de Solicitudes";
      detallesolicita = "Detalle de Solicitud";
      nombre_tsolicitud = "Tipo de Solicitud";
      corto_organizacion_solicita = "Organización que Solicita";
      corto_servicio_solicita = "Servicio que Solicita";
      nombre_persona_solicita = "Persona que Solicita";
      nombre_persona_deriva = "Persona que Deriva";
      nombre_persona_resuelve = "Persona que Resuelve";
      fecha_hora = "Fecha y Hora";
      habilitado = "Habil.";
      page = "Página";
      reporte = "Reporte al"
    }
    const doc = new jsPDF({
      orientation: "l",
      unit: "mm",
      format: "a4",
    });
    let lineas = 35;
    let pagina = 1;
    let data = [];
    let habilita = "";
  const resultado = async () => {
    const JSONdata = JSON.stringify({ tarea: "imprime_gestion_solicitud" }); // Send the data to the server in JSON format.
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
    data = result.datos;
    data = data.filter(item => item.detalle_solicita.indexOf(filtro) > -1 || 
    item.nombre_tsolicitud.toLowerCase().indexOf(filtro) > -1 ||
    item.id_solicitud.toLowerCase().indexOf(filtro) > -1 ||
    item.corto_organizacion_solicita.toLowerCase().indexOf(filtro) > -1 ||
    item.corto_servicio_solicita.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_persona_solicita.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_persona_deriva.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_persona_resuelve.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    doc.setProperties({
      title: titulo,
    });
    cabecera();
    data.map((datos, index) => {
      if (index % 2 == 0 && datos.detalle_solicita.length > 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(5, lineas - 4, 282, 5, "F");
      }

      if (index % 2 == 0 && datos.detalle_solicita.length < 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(5, lineas - 4, 282, 5, "F");
      }

      doc.text(datos.id_solicitud, 8, lineas);
      doc.text(datos.nombre_tsolicitud, 18, lineas);
      doc.text(datos.detalle_solicita, 50, lineas);
      doc.text(datos.corto_organizacion_solicita, 125, lineas);
      doc.text(datos.corto_servicio_solicita, 165, lineas);
      doc.text(datos.nombre_persona_solicita, 202, lineas);
      doc.text(datos.nombre_persona_deriva, 237, lineas);
      doc.text(datos.nombre_persona_resuelve, 237, lineas);
     // doc.text(datos.fecha_hora, 265, lineas);

      if (datos.habilita == 0) habilita = "NO";
      else habilita = "SI";
      doc.text(habilita, 280, lineas);

      if (datos.detalle_solicita.length > 100) {
        //doc.line(5,lineas+6,200,lineas+6);
        lineas = lineas + 5;
      } else {
        //doc.line(5,lineas+1,200,lineas+1);
        lineas = lineas + 5;
      }

      if (lineas > 180) {
        pagina = pagina + 1;
        lineas = 35;
        doc.addPage();
        cabecera();
      }
    });

    window.open(doc.output("bloburl"));
  };
  resultado();
  function cabecera() {
    const logo = new Image();
    logo.src = "/logo.png";
    doc.addImage(logo, "PNG", 270, 1, 14, 14); // Agregar la imagen al PDF (X, Y, Width, Height)
    doc.rect(4.8, 19.8, 286.4, 7.4);
    doc.setFillColor("#EBEBEB");
    doc.rect(5, 20, 286, 7, "F");
    doc.setFontSize(14);

    doc.setTextColor(55, 0, 0);
    doc.text(titulo, 5, 12);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text("ID", 11, 25, { align: "center" });
    doc.line(17, 19.8, 17, 27.2);
    doc.text(nombre_tsolicitud, 33, 25, { align: "center" });
    doc.line(50, 19.8, 50, 27.2);
    doc.text(detallesolicita, 85, 25, { align: "center" });
    doc.line(125, 19.8, 125, 27.2);
    doc.text(corto_organizacion_solicita, 145, 25, { align: "center" });
    doc.line(165, 19.8, 165, 27.2);
    doc.text(corto_servicio_solicita, 182, 25, { align: "center" });
    doc.line(200, 19.8, 200, 27.2);
    doc.text(nombre_persona_solicita , 217, 25, { align: "center" });
    doc.line(235, 19.8, 235, 27.2);
    doc.text(nombre_persona_deriva , 252, 25, { align: "center" });
    doc.line(270, 19.8, 270, 27.2);
    doc.text(nombre_persona_resuelve , 252, 25, { align: "center" });
    doc.line(270, 19.8, 270, 27.2);
    doc.text(habilitado, 280, 25, { align: "center" });
    let fecha = new Date();
    fecha = fecha.toLocaleString();

    doc.text(`${reporte}: ` + fecha, 5, 198, { align: "left" });
    doc.text(`${page}: ` + pagina.toString(), 270, 198, { align: "right" });
  }
}

export function gestion_solicitud_xls(filtro) {
  let data = [];

  const resultado = async () => {
    const JSONdata = JSON.stringify({ tarea: "imprime_gestion_solicitud" }); // Send the data to the server in JSON format.
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

    let fecha = new Date();
    fecha = fecha.toLocaleString();
    
    data = result.datos;
    data = data.filter(item => item.detalle_solicita.indexOf(filtro) > -1 || 
    item.nombre_tsolicitud.toLowerCase().indexOf(filtro) > -1 ||
    item.id_solicitud.toLowerCase().indexOf(filtro) > -1 ||
    item.corto_organizacion_solicita.toLowerCase().indexOf(filtro) > -1 ||
    item.corto_servicio_solicita.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_persona_solicita.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_persona_deriva.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_persona_resuelve.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    console.log(data.length);
    if (data.length != 0) {
      //const wb = XLSX.utils.table_to_book(table);
      const ws = XLSX.utils.json_to_sheet(data);

      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Gestión de Solicitudes");

      /* Export to file (start a download) */
      XLSX.writeFile(wb, fecha + "_Gestion_Solicitud.xlsx");
    }
  };
  resultado()
}
