import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export function tarea_pdf(filtro, idioma) {
    let titulo;
    let nombretarea;
    let nombre_ttarea;
    let repara;
    let reparacion;
    let down;
    let hs_down;
    let restringido;
    let restringida;
    let preventivo;
    let preventiva;
    let externo;
    let externa;
    let habilitado;
    let page; 
    let reporte;
    if (idioma === 'es') {
      titulo = "Registro de Tareas";
      nombretarea = "Nombre de Tarea";
      nombre_ttarea = "Tipo de Tarea";
      reparacion = "Repara";
      hs_down = "Down";
      restringida = "Restringido";
      preventiva = "Preventivo";
      externa = "Externo";
      habilitado = "Habil.";
      page = "Página";
      reporte = "Reporte al"
    } else if (idioma === 'en') {
      titulo = "Records of Task";
      nombretarea = "Task Name";
      nombre_ttarea = "Task Type";
      reparacion = "Repair";
      hs_down = "Down";
      restringida = "Restricted";
      preventiva = "Preventive";
      externa = "External";
      habilitado = "Enab.";
      page = "Page";
      reporte = "Report as of";
    } else if (idioma === 'por') {
      titulo = "Datas da Tarefa";
      nombretarea = "Nome da Tarefa";
      nombre_ttarea = "Tipo da Tarefa";
      reparacion = "Reparar";
      hs_down = "Desligar";
      restringida = "Restrito";
      preventiva = "Preventivo";
      externa = "Externo";
      habilitado = "Habil.";
      page = "Página";
      reporte = "Relatório em";
    } else {
      titulo = "Registro de Tareas";
      nombretarea = "Nombre de Tarea";
      nombre_ttarea = "Tipo de Tarea";
      reparacion = "Repara";
      hs_down = "Hs.Down";
      restringida = "Restringido";
      preventiva = "Preventivo";
      externa = "Externo";
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
    const JSONdata = JSON.stringify({ tarea: "imprime_tarea" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/tarea.php"; // API endpoint where we send form data.

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
    data = data.filter(item => item.nombre_tarea.toLowerCase().indexOf(filtro) > -1 || 
    item.nombre_ttarea.toLowerCase().indexOf(filtro) > -1 ||
    item.id_tarea.toLowerCase().indexOf(filtro) > -1 ||
    item.repara.toLowerCase().indexOf(filtro) > -1 ||
    item.down.toLowerCase().indexOf(filtro) > -1 ||
    item.restringido.toLowerCase().indexOf(filtro) > -1 ||
    item.preventivo.toLowerCase().indexOf(filtro) > -1 ||
    item.externo.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    doc.setProperties({
      title: titulo,
    });
    cabecera();
    data.map((datos, index) => {
      if (index % 2 == 0 && datos.nombre_tarea.length > 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(10, lineas - 4, 279, 10, "F");
      }

      if (index % 2 == 0 && datos.nombre_tarea.length < 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(10, lineas - 4, 279, 5, "F");
      }

      doc.text(datos.id_tarea, 12, lineas);
      doc.text(datos.nombre_tarea, 22, lineas);
      doc.text(datos.nombre_ttarea, 156, lineas);

      if (datos.repara == 0) repara = "NO";
      else repara = "SI";
      doc.text(repara, 193, lineas);
      
      if (datos.down == 0) down = "NO";
      else down = "SI";
      doc.text(down, 212, lineas);

      if (datos.restringido == 0) restringido = "NO";
      else restringido = "SI";
      doc.text(restringido, 229, lineas);

      if (datos.preventivo == 0) preventivo = "NO";
      else preventivo = "SI";
      doc.text(preventivo, 247, lineas);

      if (datos.externo == 0) externo = "NO";
      else externo = "SI";
      doc.text(externo, 265, lineas);

      if (datos.habilita == 0) habilita = "NO";
      else habilita = "SI";
      doc.text(habilita, 282, lineas);

      if (datos.nombre_tarea.length > 100) {
        //doc.line(5,lineas+6,200,lineas+6);
        lineas = lineas + 5;
      } else {
        //doc.line(5,lineas+1,200,lineas+1);
        lineas = lineas + 5;
      }

      if (lineas > 188) {
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
    doc.addImage(logo, "PNG", 260, 1, 14, 14); // Agregar la imagen al PDF (X, Y, Width, Height)
    doc.rect(9.8, 19.8, 279.3, 7.4);
    doc.setFillColor("#EBEBEB");
    doc.rect(10, 20, 279, 7, "F");
    doc.setFontSize(14);

    doc.setTextColor(55, 0, 0);
    doc.text(titulo, 10, 12);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text("ID", 15, 25, { align: "center" });
    doc.line(21, 19.8, 21, 27.2);
    doc.text(nombretarea , 70, 25, { align: "center" });
    doc.line(155, 19.8, 155, 27.2);
    doc.text(nombre_ttarea , 168, 25, { align: "center" });
    doc.line(185, 19.8, 185, 27.2);
    doc.text(reparacion , 195, 25, { align: "center" });
    doc.line(204, 19.8, 204, 27.2);
    doc.text(hs_down , 212, 25, { align: "center" });
    doc.line(220, 19.8, 220, 27.2);
    doc.text(restringida , 230, 25, { align: "center" });
    doc.line(240, 19.8, 240, 27.2);
    doc.text(preventiva , 249, 25, { align: "center" });
    doc.line(258, 19.8, 258, 27.2);
    doc.text(externa , 267, 25, { align: "center" });
    doc.line(276, 19.8, 276, 27.2);
    doc.text(habilitado, 279, 25, { align: "left" });
    let fecha = new Date();
    fecha = fecha.toLocaleString();

    doc.text(`${reporte}: ` + fecha, 10, 192, { align: "left" });
    doc.text(`${page}: ` + pagina.toString(), 275, 192, { align: "right" });
  }
}

export function tarea_xls(filtro) {
  let data = [];

  const resultado = async () => {
    const JSONdata = JSON.stringify({ tarea: "imprime_tarea" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/tarea.php"; // API endpoint where we send form data.

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
    data = data.filter(item => item.nombre_tarea.toLowerCase().indexOf(filtro) > -1 || 
    item.nombre_ttarea.toLowerCase().indexOf(filtro) > -1 ||
    item.repara.toLowerCase().indexOf(filtro) > -1 ||
    item.down.toLowerCase().indexOf(filtro) > -1 ||
    item.restringido.toLowerCase().indexOf(filtro) > -1 ||
    item.preventivo.toLowerCase().indexOf(filtro) > -1 ||
    item.externo.toLowerCase().indexOf(filtro) > -1 ||
    item.id_tarea.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    console.log(data.length);
    if (data.length != 0) {
      //const wb = XLSX.utils.table_to_book(table);
      const ws = XLSX.utils.json_to_sheet(data);

      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "tareas");

      /* Export to file (start a download) */
      XLSX.writeFile(wb, fecha + "_Tarea.xlsx");
    }
  };
  resultado()
}
