import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export function adjunto_pdf(filtro) {
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
    const JSONdata = JSON.stringify({ tarea: "imprime_adjunto" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/adjunto.php"; // API endpoint where we send form data.

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
    data = data.filter(item => item.nombre_adjunto.toLowerCase().indexOf(filtro) > -1);
    doc.setProperties({
      title: "Registro de Adjuntos",
    });
    cabecera();
    data.map((datos, index) => {
      if (index % 2 == 0 && datos.nombre_adjunto.length > 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(15, lineas - 4, 169, 10, "F");
      }

      if (index % 2 == 0 && datos.nombre_adjunto.length < 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(15, lineas - 4, 169, 5, "F");
      }

      doc.text(datos.id_adjunto, 20, lineas);
      doc.text(datos.nombre_adjunto, 34, lineas);

      if (datos.habilita == 0) habilita = "NO";
      else habilita = "SI";
      doc.text(habilita, 168, lineas);

      if (datos.nombre_adjunto.length > 100) {
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
    doc.text("Registro de Adjuntos", 15, 12);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text("ID", 22, 25, { align: "center" });
    doc.line(30, 19.8, 30, 27.2);
    doc.text("Nombre de Adjunto", 80, 25, { align: "center" });
    doc.line(160, 19.8, 160, 27.2);
    doc.text("Habilitado", 172, 25, { align: "center" });
    let fecha = new Date();
    fecha = fecha.toLocaleString();

    doc.text("Reporte al: " + fecha, 5, 288, { align: "left" });
    doc.text("Página: " + pagina.toString(), 195, 288, { align: "right" });
  }
}

export function adjunto_xls(filtro) {
  let data = [];

  const resultado = async () => {
    const JSONdata = JSON.stringify({ tarea: "imprime_adjunto" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/adjunto.php"; // API endpoint where we send form data.

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
    data = data.filter(item => item.nombre_adjunto.toLowerCase().indexOf(filtro) > -1);
    console.log(data.length);
    if (data.length != 0) {
      //const wb = XLSX.utils.table_to_book(table);
      const ws = XLSX.utils.json_to_sheet(data);

      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "adjuntos");

      /* Export to file (start a download) */
      XLSX.writeFile(wb, fecha + "_Adjunto.xlsx");
    }
  };
  resultado()
}
