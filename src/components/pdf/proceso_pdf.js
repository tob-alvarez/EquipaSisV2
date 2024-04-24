import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export function proceso_pdf(filtro, idioma) {
    let titulo;
    let nombreAcciones;
    let descripcion;
    let descripcion_en;
    let descripcion_por;
    let opcion;
    let habilitado;
    let page; 
    let reporte;
    if (idioma === 'es') {
      titulo = "Registro de Procesos";
      nombreAcciones = "Nombre de Proceso";
      descripcion = "Descripción en Español";
      descripcion_en = "Descripción en Inglés";
      descripcion_por = "Descripción en Portugués";
      opcion = "Opción";
      habilitado = "Habilitada";
      page = "Página";
      reporte = "Reporte al"
    } else if (idioma === 'en') {
      titulo = "Records of Process";
      nombreAcciones = "Process Name";
      descripcion = "Description in Spanish";
      descripcion_en = "Description in English";
      descripcion_por = "Description in Portuguese";
      opcion = "Option";
      habilitado = "Enabled";
      page = "Page";
      reporte = "Report as of";
    } else if (idioma === 'por') {
      titulo = "Datas da Processo";
      nombreAcciones = "Nome do Processo";
      descripcion = "Descrição em Espanhol";
      descripcion_en = "Descrição em Inglês";
      descripcion_por = "Descrição em Português";
      opcion = "Opção";
      habilitado = "Habilitado";
      page = "Página";
      reporte = "Relatório em";
    } else {
      titulo = "Registro de Procesos";
      nombreAcciones = "Nombre de Proceso";
      descripcion = "Descripción en Español";
      descripcion_en = "Descripción en Inglés";
      descripcion_por = "Descripción en Portugués";
      opcion = "Opción";
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
    const JSONdata = JSON.stringify({ tarea: "imprime_proceso" }); // Send the data to the server in JSON format.
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
    data = result.datos;
    console.log(data)
    data = data.filter(item => item.nombre_proceso.toLowerCase().indexOf(filtro) > -1 || 
    item.id_proceso.toLowerCase().indexOf(filtro) > -1 ||
    item.descripcion.toLowerCase().indexOf(filtro) > -1 ||
    item.descripcion_en.toLowerCase().indexOf(filtro) > -1 ||
    item.descripcion_por.toLowerCase().indexOf(filtro) > -1 ||
    item.opcion.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    doc.setProperties({
      title: titulo,
    });
    cabecera();
    data?.map((datos, index) => {
      if (index % 2 == 0 && datos.nombre_proceso.length > 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(15, lineas - 4, 169, 10, "F");
      }

      if (index % 2 == 0 && datos.nombre_proceso.length < 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(15, lineas - 4, 169, 5, "F");
      }

      doc.text(datos.id_proceso, 20, lineas);
      doc.text(datos.nombre_proceso, 34, lineas);
      doc.text(datos.descripcion, 72, lineas);
      doc.text(datos.descripcion_en, 80, lineas);
      doc.text(datos.descripcion_por, 120, lineas);
      doc.text(datos.nombre_opcion, 150, lineas);

      if (datos.habilita == 0) habilita = "NO";
      else habilita = "SI";
      doc.text(habilita, 168, lineas);

      if (datos.nombre_proceso.length > 100) {
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
    doc.rect(14.8, 19.8, 169.3, 7.4);
    doc.setFillColor("#EBEBEB");
    doc.rect(15, 20, 169, 7, "F");
    doc.setFontSize(14);

    doc.setTextColor(55, 0, 0);
    doc.text(titulo, 15, 12);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text("ID", 22, 25, { align: "center" });
    doc.line(30, 19.8, 30, 27.2);
    doc.text(nombreAcciones , 47, 25, { align: "center" });
    doc.line(70, 19.8, 70, 27.2);
    doc.text(descripcion , 90, 25, { align: "center" });
    doc.line(115, 19.8, 115, 27.2);
    doc.text(descripcion_en , 140, 25, { align: "center" });
    doc.line(160, 19.8, 160, 27.2);
    doc.text(descripcion_por , 140, 25, { align: "center" });
    doc.line(160, 19.8, 160, 27.2);
    doc.text(opcion , 140, 25, { align: "center" });
    doc.line(160, 19.8, 160, 27.2);
    doc.text(habilitado, 172, 25, { align: "center" });
    let fecha = new Date();
    fecha = fecha.toLocaleString();

    doc.text(`${reporte}: ` + fecha, 5, 288, { align: "left" });
    doc.text(`${page}: ` + pagina.toString(), 195, 288, { align: "right" });
  }
}

export function proceso_xls(filtro) {
  let data = [];

  const resultado = async () => {
    const JSONdata = JSON.stringify({ tarea: "imprime_proceso" }); // Send the data to the server in JSON format.
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

    let fecha = new Date();
    fecha = fecha.toLocaleString();
    
    data = result.datos;
    data = data.filter(item => item.nombre_proceso.toLowerCase().indexOf(filtro) > -1 || 
    item.descripcion.toLowerCase().indexOf(filtro) > -1 ||
    item.descripcion_en.toLowerCase().indexOf(filtro) > -1 ||
    item.descripcion_por.toLowerCase().indexOf(filtro) > -1 ||
    item.opcion.toLowerCase().indexOf(filtro) > -1 ||
    item.id_proceso.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    console.log(data.length);
    if (data.length != 0) {
      //const wb = XLSX.utils.table_to_book(table);
      const ws = XLSX.utils.json_to_sheet(data);

      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "procesos");

      /* Export to file (start a download) */
      XLSX.writeFile(wb, fecha + "_Proceso.xlsx");
    }
  };
  resultado()
}
