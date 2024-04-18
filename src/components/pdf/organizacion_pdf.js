import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export function organizacion_pdf(filtro, idioma) {
    let titulo;
    let nombreorganizacion;
    let corto_organizacion;
    let domicilio;
    let telefono;
    let habilitado;
    let page; 
    let reporte;
    if (idioma === 'es') {
      titulo = "Registro de Organizaciones";
      nombreorganizacion = "Nombre de Organización";
      corto_organizacion = "Nombre Corto";
      domicilio = "Domicilio";
      telefono = "Teléfono";
      habilitado = "Habilitado";
      page = "Página";
      reporte = "Reporte al"
    } else if (idioma === 'en') {
      titulo = "Records of Organization";
      nombreorganizacion = "Organization Name";
      corto_organizacion = "Short Name";
      domicilio = "Address";
      telefono = "Phone";
      habilitado = "Enabled";
      page = "Page";
      reporte = "Report as of";
    } else if (idioma === 'por') {
      titulo = "Datas da Organização";
      nombreorganizacion = "Nome da Organização";
      corto_organizacion = "Nome Abreviado";
      domicilio = "Lar";
      telefono = "Telefone";
      habilitado = "Habilitado";
      page = "Página";
      reporte = "Relatório em";
    } else {
      titulo = "Registro de Organizaciones";
      nombreorganizacion = "Nombre de Organización";
      corto_organizacion = "Nombre Corto";
      domicilio = "Domicilio";
      telefono = "Teléfono";
      habilitado = "Habilitada";
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
    const JSONdata = JSON.stringify({ tarea: "imprime_organizacion" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/organizacion.php"; // API endpoint where we send form data.

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
    data = data.filter(item => item.nombre_organizacion.toLowerCase().indexOf(filtro) > -1 || 
    item.corto_organizacion.toLowerCase().indexOf(filtro) > -1 ||
    item.id_organizacion.toLowerCase().indexOf(filtro) > -1 ||
    item.domicilio.toLowerCase().indexOf(filtro) > -1 ||
    item.telefono.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    doc.setProperties({
      title: titulo,
    });
    cabecera();
    data.map((datos, index) => {
      if (index % 2 == 0 && datos.nombre_organizacion.length > 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(15, lineas - 4, 180, 10, "F");
      }

      if (index % 2 == 0 && datos.nombre_organizacion.length < 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(15, lineas - 4, 180, 5, "F");
      }

      doc.text(datos.id_organizacion, 17, lineas);
      doc.text(datos.nombre_organizacion, 27, lineas);
      doc.text(datos.corto_organizacion, 77, lineas);
      doc.text(datos.domicilio, 112, lineas);
      doc.text(datos.telefono, 148, lineas);

      if (datos.habilita == 0) habilita = "NO";
      else habilita = "SI";
      doc.text(habilita, 180, lineas);

      if (datos.nombre_organizacion.length > 100) {
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
    doc.rect(14.8, 19.8, 179.3, 7.4);
    doc.setFillColor("#EBEBEB");
    doc.rect(15, 20, 179, 7, "F");
    doc.setFontSize(14);

    doc.setTextColor(55, 0, 0);
    doc.text(titulo, 15, 12);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text("ID", 18, 25, { align: "center" });
    doc.line(21, 19.8, 21, 27.2);
    doc.text(nombreorganizacion , 45, 25, { align: "center" });
    doc.line(72, 19.8, 72, 27.2);
    doc.text(corto_organizacion , 87, 25, { align: "center" });
    doc.line(105, 19.8, 105, 27.2);
    doc.text(domicilio , 120, 25, { align: "center" });
    doc.line(145, 19.8, 145, 27.2);
    doc.text(telefono , 157, 25, { align: "center" });
    doc.line(172, 19.8, 172, 27.2);
    doc.text(habilitado, 183, 25, { align: "center" });
    let fecha = new Date();
    fecha = fecha.toLocaleString();

    doc.text(`${reporte}: ` + fecha, 5, 288, { align: "left" });
    doc.text(`${page}: ` + pagina.toString(), 195, 288, { align: "right" });
  }
}

export function organizacion_xls(filtro) {
  let data = [];

  const resultado = async () => {
    const JSONdata = JSON.stringify({ tarea: "imprime_organizacion" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/organizacion.php"; // API endpoint where we send form data.

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
    data = data.filter(item => item.nombre_organizacion.toLowerCase().indexOf(filtro) > -1 || 
    item.corto_organizacion.toLowerCase().indexOf(filtro) > -1 ||
    item.domicilio.toLowerCase().indexOf(filtro) > -1 ||
    item.telefono.toLowerCase().indexOf(filtro) > -1 ||
    item.id_organizacion.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    console.log(data.length);
    if (data.length != 0) {
      //const wb = XLSX.utils.table_to_book(table);
      const ws = XLSX.utils.json_to_sheet(data);

      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Organizaciones");

      /* Export to file (start a download) */
      XLSX.writeFile(wb, fecha + "_Organizacion.xlsx");
    }
  };
  resultado()
}
