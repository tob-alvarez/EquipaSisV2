import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export function software_pdf(filtro, idioma) {
    let titulo;
    let nombresoftware;
    let corto_software;
    let habilitado;
    let page; 
    let reporte;
    if (idioma === 'es') {
      titulo = "Registro de Softwares";
      nombresoftware = "Nombre de Software";
      corto_software = "Nombre Corto";
      habilitado = "Habilitada";
      page = "Página";
      reporte = "Reporte al"
    } else if (idioma === 'en') {
      titulo = "Records of Software";
      nombresoftware = "Software Name";
      corto_software = "Software Short Name";
      habilitado = "Enabled";
      page = "Page";
      reporte = "Report as of";
    } else if (idioma === 'por') {
      titulo = "Datas do Software";
      nombresoftware = "Nome do Software";
      corto_software = "Nome Abreviado do Software";
      habilitado = "Habilitado";
      page = "Página";
      reporte = "Relatório em";
    } else {
      titulo = "Registro de Softwares";
      nombresoftware = "Nombre de Software";
      corto_software = "Nombre Corto Software";
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
    const JSONdata = JSON.stringify({ tarea: "imprime_software" }); // Send the data to the server in JSON format.
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
    data = result.datos;
    data = data.filter(item => item.nombre_software.toLowerCase().indexOf(filtro) > -1 || 
    item.id_software.toLowerCase().indexOf(filtro) > -1 ||
    item.corto_software.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    doc.setProperties({
      title: titulo,
    });
    cabecera();
    data.map((datos, index) => {
      if (index % 2 == 0 && datos.nombre_software.length > 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(15, lineas - 4, 169, 10, "F");
      }

      if (index % 2 == 0 && datos.nombre_software.length < 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(15, lineas - 4, 169, 5, "F");
      }

      doc.text(datos.id_software, 20, lineas);
      doc.text(datos.nombre_software, 35, lineas);
      doc.text(datos.corto_software, 110, lineas);

      if (datos.habilita == 0) habilita = "NO";
      else habilita = "SI";
      doc.text(habilita, 168, lineas);

      if (datos.nombre_software.length > 100) {
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
    logo.src = "public/logo.png";
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
    doc.text(nombresoftware , 47, 25, { align: "center" });
    doc.line(105, 19.8, 105, 27.2);
    doc.text(corto_software , 130, 25, { align: "center" });
    doc.line(160, 19.8, 160, 27.2);

    doc.text(habilitado, 172, 25, { align: "center" });
    let fecha = new Date();
    fecha = fecha.toLocaleString();

    doc.text(`${reporte}: ` + fecha, 5, 288, { align: "left" });
    doc.text(`${page}: ` + pagina.toString(), 195, 288, { align: "right" });
  }
}

export function software_xls(filtro) {
  let data = [];

  const resultado = async () => {
    const JSONdata = JSON.stringify({ tarea: "imprime_software" }); // Send the data to the server in JSON format.
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

    let fecha = new Date();
    fecha = fecha.toLocaleString();
    
    data = result.datos;
    data = data.filter(item => item.nombre_software.toLowerCase().indexOf(filtro) > -1 || 
    item.corto_software.toLowerCase().indexOf(filtro) > -1 ||
    item.id_software.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    console.log(data.length);
    if (data.length != 0) {
      //const wb = XLSX.utils.table_to_book(table);
      const ws = XLSX.utils.json_to_sheet(data);

      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Softwares");

      /* Export to file (start a download) */
      XLSX.writeFile(wb, fecha + "_Software.xlsx");
    }
  };
  resultado()
}
