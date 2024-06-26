import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export function tipo_usuario_pdf(filtro, idioma) {
    let titulo;
    let nombretusuario;
    let observacion;
    let habilitado;
    let page; 
    let reporte; 
    if (idioma === 'es') {
      titulo = "Registro de Tipo de Usuarios";
      nombretusuario = "Nombre de Tipo de Usuario";
      observacion = "Observación";
      habilitado = "Habil.";
      page = "Página";
      reporte = "Reporte al"
    } else if (idioma === 'en') {
      titulo = "Records of User Type";
      nombretusuario = "User Type Name";
      observacion = "Observation";
      habilitado = "Enab.";
      page = "Page";
      reporte = "Report as of";
    } else if (idioma === 'por') {
      titulo = "Datas do Tipo de Usuário";
      nombretusuario = "Nome do Tipo de Usuário";
      observacion = "Observação";
      habilitado = "Habil.";
      page = "Página";
      reporte = "Relatório em";
    } else {
      titulo = "Registro de Tipo de Usuarios";
      nombretusuario = "Nombre de Tipo de Usuario";
      observacion = "Observación";
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
    const JSONdata = JSON.stringify({ tarea: "imprime_tipo_usuario" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/tipo_usuario.php"; // API endpoint where we send form data.

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
    data = data.filter(item => item.nombre_tusuario.toLowerCase().indexOf(filtro) > -1 || 
    item.id_tusuario.toLowerCase().indexOf(filtro) > -1 ||
    item.observacion.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    doc.setProperties({
      title: titulo,
    });
    cabecera();
    data.map((datos, index) => {
      if (index % 2 == 0 && datos.nombre_tusuario.length > 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(11, lineas - 4, 279, 10, "F");
      }

      if (index % 2 == 0 && datos.nombre_tusuario.length < 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(11, lineas - 4, 279, 5, "F");
      }

      doc.text(datos.id_tusuario, 14, lineas);
      doc.text(datos.nombre_tusuario, 20, lineas);
      doc.text(datos.observacion, 65, lineas);

      if (datos.habilita == 0) habilita = "NO";
      else habilita = "SI";
      doc.text(habilita, 284, lineas);

      if (datos.observacion.length > 150) {
        //doc.line(5,lineas+6,200,lineas+6);
        lineas = lineas + 5;
      } else {
        //doc.line(5,lineas+1,200,lineas+1);
        lineas = lineas + 5;
      }

      if (lineas > 210) {
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
    doc.rect(10.8, 19.8, 279.3, 7.4);
    doc.setFillColor("#EBEBEB");
    doc.rect(11, 20, 279, 7, "F");
    doc.setFontSize(14);

    doc.setTextColor(55, 0, 0);
    doc.text(titulo, 11, 12);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.text("ID", 14, 25, { align: "center" });
    doc.line(17, 19.8, 17, 27.2);
    doc.text(nombretusuario , 40, 25, { align: "center" });
    doc.line(62, 19.8, 62, 27.2);
    doc.text(observacion , 150, 25, { align: "center" });
    doc.line(278, 19.8, 278, 27.2);

    doc.text(habilitado, 284, 25, { align: "center" });
    let fecha = new Date();
    fecha = fecha.toLocaleString();
8
    doc.text(`${reporte}: ` + fecha, 5, 198, { align: "left" });
    doc.text(`${page}: ` + pagina.toString(), 195, 198, { align: "right" });
  }
}

export function tipo_usuario_xls(filtro) {
  let data = [];

  const resultado = async () => {
    const JSONdata = JSON.stringify({ tarea: "imprime_tipo_usuario" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/tipo_usuario.php"; // API endpoint where we send form data.

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
    data = data.filter(item => item.nombre_tusuario.toLowerCase().indexOf(filtro) > -1 || 
    item.observacion.toLowerCase().indexOf(filtro) > -1 ||
    item.id_tusuario.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    console.log(data.length);
    if (data.length != 0) {
      //const wb = XLSX.utils.table_to_book(table);
      const ws = XLSX.utils.json_to_sheet(data);

      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Tipo de Usuarios");

      /* Export to file (start a download) */
      XLSX.writeFile(wb, fecha + "_Tipo_usuario.xlsx");
    }
  };
  resultado()
}
