import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export function adjunto_persona_pdf(filtro, idioma) {
    let titulo;
    let nombrepersona;
    let nombre_tadjunto;
    let nombre_archivo;
    let habilitado;
    let page; 
    let reporte;
    if (idioma === 'es') {
      titulo = "Registro de Adjuntos de Persona";
      nombrepersona = "Nombre de Persona";
      nombre_tadjunto = "Tipo de Adjunto";
      nombre_archivo = "Nombre de Archivo";
      habilitado = "Habil.";
      page = "Página";
      reporte = "Reporte al"
    } else if (idioma === 'en') {
      titulo = "Records of Attach Person";
      nombrepersona = "Person Name";
      nombre_tadjunto = "Attachment Typ";
      nombre_archivo = "File Name";
      habilitado = "Enab.";
      page = "Page";
      reporte = "Report as of";
    } else if (idioma === 'por') {
      titulo = "Datas da Anexo Pessoa";
      nombrepersona = "Nome da Pessoa";
      nombre_tadjunto = "Tipo de Anexo";
      nombre_archivo = "Nome da Arquivo";
      habilitado = "Habil.";
      page = "Página";
      reporte = "Relatório em";
    } else {
      titulo = "Registro de Adjuntos de Persona";
      nombrepersona = "Nombre Documentación";
      nombre_tadjunto = "Tipo de Adjunto";
      nombre_archivo = "Nombre de Archivo";
      habilitado = "Habil.";
      page = "Página";
      reporte = "Reporte al"
    }
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });
    let lineas = 35;
    let pagina = 1;
    let data = [];
    let habilita = "";
  const resultado = async () => {
    const JSONdata = JSON.stringify({ tarea: "imprime_adjunto_persona" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/adjunto_persona.php"; // API endpoint where we send form data.

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
    data = data.filter(item => item.nombre_persona.toLowerCase().indexOf(filtro) > -1 || 
    item.nombre_tadjunto.toLowerCase().indexOf(filtro) > -1 ||
    item.id_adjunto_persona.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_archivo.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    doc.setProperties({
      title: titulo,
    });
    cabecera();
    data.map((datos, index) => {
      if (index % 2 == 0 && datos.nombre_persona.length > 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(10, lineas - 4, 182, 10, "F");
      }

      if (index % 2 == 0 && datos.nombre_persona.length < 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(10, lineas - 4, 182, 5, "F");
      }

      doc.text(datos.id_adjunto_persona, 14, lineas);
      doc.text(datos.nombre_persona, 20, lineas);
      doc.text(datos.nombre_tadjunto, 80, lineas);
      doc.text(datos.nombre_archivo, 130, lineas);

      if (datos.habilita == 0) habilita = "NO";
      else habilita = "SI";
      doc.text(habilita, 184, lineas);

      if (datos.nombre_persona.length > 100) {
        //doc.line(5,lineas+6,200,lineas+6);
        lineas = lineas + 5;
      } else {
        //doc.line(5,lineas+1,200,lineas+1);
        lineas = lineas + 5;
      }

      if (lineas > 270) {
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
    doc.addImage(logo, "PNG", 170, 1, 14, 14); // Agregar la imagen al PDF (X, Y, Width, Height)
    doc.rect(9.8, 19.8, 182.3, 7.4);
    doc.setFillColor("#EBEBEB");
    doc.rect(10, 20, 182, 7, "F");
    doc.setFontSize(14);

    doc.setTextColor(55, 0, 0);
    doc.text(titulo, 10, 12);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text("ID", 15, 25, { align: "center" });
    doc.line(20, 19.8, 20, 27.2);
    doc.text(nombrepersona , 45, 25, { align: "center" });
    doc.line(80, 19.8, 80, 27.2);
    doc.text(nombre_tadjunto , 100, 25, { align: "center" });
    doc.line(130, 19.8, 130, 27.2);
    doc.text(nombre_archivo , 155, 25, { align: "center" });
    doc.line(180, 19.8, 180, 27.2);
    doc.text(habilitado, 182, 25, { align: "left" });
    let fecha = new Date();
    fecha = fecha.toLocaleString();

    doc.text(`${reporte}: ` + fecha, 5, 288, { align: "left" });
    doc.text(`${page}: ` + pagina.toString(), 195, 288, { align: "right" });
  }
}

export function adjunto_persona_xls(filtro) {
  let data = [];

  const resultado = async () => {
    const JSONdata = JSON.stringify({ tarea: "imprime_adjunto_persona" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/adjunto_persona.php"; // API endpoint where we send form data.

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
    data = data.filter(item => item.nombre_persona.toLowerCase().indexOf(filtro) > -1 || 
    item.nombre_tadjunto.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_archivo.toLowerCase().indexOf(filtro) > -1 ||
    item.id_adjunto_persona.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    console.log(data.length);
    if (data.length != 0) {
      //const wb = XLSX.utils.table_to_book(table);
      const ws = XLSX.utils.json_to_sheet(data);

      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Adjuntos de Persona");

      /* Export to file (start a download) */
      XLSX.writeFile(wb, fecha + "_adjunto_persona.xlsx");
    }
  };
  resultado()
}
