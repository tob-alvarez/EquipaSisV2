import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export function tipo_equipo_pdf(filtro, idioma) {
    let titulo;
    let nombreAcciones;
    let nombre_categoria;
    let nombre_prioridad;
    let nombre_tcontrol;
    let habilitado;
    let page; 
    let reporte;
    if (idioma === 'es') {
      titulo = "Registro de Tipo de Equipos";
      nombreAcciones = "Nombre de Tipo de Equipo";
      nombre_categoria = "Categoría";
      nombre_prioridad = "Prioridad";
      nombre_tcontrol = "Tipo Control";
      habilitado = "Habil.";
      page = "Página";
      reporte = "Reporte al"
    } else if (idioma === 'en') {
      titulo = "Records of Equipment Type";
      nombreAcciones = "Equipment Type Name";
      nombre_categoria = "Category";
      nombre_prioridad = "Priority";
      nombre_tcontrol = "Control Type";
      habilitado = "Enab.";
      page = "Page";
      reporte = "Report as of";
    } else if (idioma === 'por') {
      titulo = "Datas da Tipo de Equipamento";
      nombreAcciones = "Nome do Equipamento";
      nombre_categoria = "Categoria";
      nombre_prioridad = "Prioridade";
      nombre_tcontrol = "Tipo Controle";
      habilitado = "Habil.";
      page = "Página";
      reporte = "Relatório em";
    } else {
      titulo = "Registro de Tipo de Equipos";
      nombreAcciones = "Nombre de Tipo de Equipo";
      nombre_categoria = "Categoría";
      nombre_prioridad = "Prioridad";
      nombre_tcontrol = "Tipo Control";
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
    const JSONdata = JSON.stringify({ tarea: "imprime_tipo_equipo" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/tipo_equipo.php"; // API endpoint where we send form data.

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
    data = data.filter(item => item.nombre_tequipo.toLowerCase().indexOf(filtro) > -1 || 
    item.id_tequipo.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_categoria.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_prioridad.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_tcontrol.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    doc.setProperties({
      title: titulo,
    });
    cabecera();
    data.map((datos, index) => {
      if (index % 2 == 0 && datos.nombre_tequipo.length > 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(10, lineas - 4, 192, 10, "F");
      }

      if (index % 2 == 0 && datos.nombre_tequipo.length < 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(10, lineas - 4, 192, 5, "F");
      }

      doc.text(datos.id_tequipo, 12, lineas);
      doc.text(datos.nombre_tequipo, 22, lineas);
      doc.text(datos.nombre_categoria, 120, lineas);
      doc.text(datos.nombre_prioridad, 150, lineas);
      doc.text(datos.nombre_tcontrol, 170, lineas);

      if (datos.habilita == 0) habilita = "NO";
      else habilita = "SI";
      doc.text(habilita, 194, lineas);

      if (datos.nombre_tequipo.length > 100) {
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
    doc.addImage(logo, "PNG", 175, 1, 14, 14); // Agregar la imagen al PDF (X, Y, Width, Height)
    doc.rect(9.8, 19.8, 194.3, 7.4);
    doc.setFillColor("#EBEBEB");
    doc.rect(10, 20, 193.8, 7, "F");
    doc.setFontSize(14);

    doc.setTextColor(55, 0, 0);
    doc.text(titulo, 10, 12);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text("ID", 14, 25, { align: "center" });
    doc.line(18, 19.8, 18, 27.2);
    doc.text(nombreAcciones , 60, 25, { align: "center" });
    doc.line(118, 19.8, 118, 27.2);
    doc.text(nombre_categoria , 132, 25, { align: "center" });
    doc.line(147, 19.8, 147, 27.2);
    doc.text(nombre_prioridad , 157, 25, { align: "center" });
    doc.line(170, 19.8, 170, 27.2);
    doc.text(nombre_tcontrol , 181, 25, { align: "center" });
    doc.line(193, 19.8, 193, 27.2);
    doc.text(habilitado, 194, 25, { align: "left" });
    let fecha = new Date();
    fecha = fecha.toLocaleString();

    doc.text(`${reporte}: ` + fecha, 5, 288, { align: "left" });
    doc.text(`${page}: ` + pagina.toString(), 195, 288, { align: "right" });
  }
}

export function tipo_equipo_xls(filtro) {
  let data = [];

  const resultado = async () => {
    const JSONdata = JSON.stringify({ tarea: "imprime_tipo_equipo" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/tipo_equipo.php"; // API endpoint where we send form data.

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
    data = data.filter(item => item.nombre_tequipo.toLowerCase().indexOf(filtro) > -1 || 
    item.nombre_categoria.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_prioridad.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_tcontrol.toLowerCase().indexOf(filtro) > -1 ||
    item.id_tequipo.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    console.log(data.length);
    if (data.length != 0) {
      //const wb = XLSX.utils.table_to_book(table);
      const ws = XLSX.utils.json_to_sheet(data);

      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Tipo_equipos");

      /* Export to file (start a download) */
      XLSX.writeFile(wb, fecha + "_Tipo_equipo.xlsx");
    }
  };
  resultado()
}
