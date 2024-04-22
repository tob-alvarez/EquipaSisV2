import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export function persona_pdf(filtro, idioma) {
    let titulo;
    let nombreAcciones;
    let telefono_persona;
    let email_persona;
    let nombre_empresa;
    let nombre_tpersona;
    let habilitado;
    let page; 
    let reporte;
    if (idioma === 'es') {
      titulo = "Registro de Personas";
      nombreAcciones = "Nombre de Persona";
      telefono_persona = "Teléfono";
      email_persona = "Email";
      nombre_empresa = "Empresa";
      nombre_tpersona = "Tipo Persona";
      habilitado = "Habil.";
      page = "Página";
      reporte = "Reporte al"
    } else if (idioma === 'en') {
      titulo = "Records of People";
      nombreAcciones = "Person's Name";
      telefono_persona = "Phone";
      email_persona = "Email";
      nombre_empresa = "Company";
      nombre_tpersona = "Persona Type";
      habilitado = "Enab.";
      page = "Page";
      reporte = "Report as of";
    } else if (idioma === 'por') {
      titulo = "Datas da Pessoas";
      nombreAcciones = "Nome da Pessoas";
      telefono_persona = "Telefone";
      email_persona = "E-mail";
      nombre_empresa = "Empresa";
      nombre_tpersona = "Tipo de Pessoa";
      habilitado = "Habil.";
      page = "Página";
      reporte = "Relatório em";
    } else {
      titulo = "Registro de Personas";
      nombreAcciones = "Nombre de Persona";
      telefono_persona = "Teléfono";
      email_persona = "Email";
      nombre_empresa = "Empresa";
      nombre_tpersona = "Tipo Persona";
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
    const JSONdata = JSON.stringify({ tarea: "imprime_persona" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/persona.php"; // API endpoint where we send form data.

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
    item.id_persona.toLowerCase().indexOf(filtro) > -1 ||
    item.telefono_persona.toLowerCase().indexOf(filtro) > -1 ||
    item.email_persona.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_empresa.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_tpersona.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    doc.setProperties({
      title: titulo,
    });
    cabecera();
    data.map((datos, index) => {
      if (index % 2 == 0 && datos.nombre_persona.length > 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(10, lineas - 4, 192, 10, "F");
      }

      if (index % 2 == 0 && datos.nombre_persona.length < 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(10, lineas - 4, 192, 5, "F");
      }

      doc.text(datos.id_persona, 12, lineas);
      doc.text(datos.nombre_persona, 22, lineas);
      doc.text(datos.telefono_persona, 120, lineas);
      doc.text(datos.email_persona, 150, lineas);
      doc.text(datos.nombre_empresa, 170, lineas);
      doc.text(datos.nombre_tpersona, 172, lineas);

      if (datos.habilita == 0) habilita = "NO";
      else habilita = "SI";
      doc.text(habilita, 194, lineas);

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
    doc.text(telefono_persona , 132, 25, { align: "center" });
    doc.line(147, 19.8, 147, 27.2);
    doc.text(email_persona , 157, 25, { align: "center" });
    doc.line(170, 19.8, 170, 27.2);
    doc.text(nombre_empresa , 181, 25, { align: "center" });
    doc.line(193, 19.8, 193, 27.2);
    doc.text(nombre_tpersona , 181, 25, { align: "center" });
    doc.line(193, 19.8, 193, 27.2);
    doc.text(habilitado, 194, 25, { align: "left" });
    let fecha = new Date();
    fecha = fecha.toLocaleString();

    doc.text(`${reporte}: ` + fecha, 5, 288, { align: "left" });
    doc.text(`${page}: ` + pagina.toString(), 195, 288, { align: "right" });
  }
}

export function persona_xls(filtro) {
  let data = [];

  const resultado = async () => {
    const JSONdata = JSON.stringify({ tarea: "imprime_persona" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/persona.php"; // API endpoint where we send form data.

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
    item.telefono_persona.toLowerCase().indexOf(filtro) > -1 ||
    item.email_persona.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_empresa.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_tpersona.toLowerCase().indexOf(filtro) > -1 ||
    item.id_persona.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);

    console.log(data.length);
    if (data.length != 0) {
      //const wb = XLSX.utils.table_to_book(table);
      const ws = XLSX.utils.json_to_sheet(data);

      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "personas");

      /* Export to file (start a download) */
      XLSX.writeFile(wb, fecha + "_Persona.xlsx");
    }
  };
  resultado()
}
