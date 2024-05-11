import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export function stock_producto_pdf(filtro, idioma) {
    let titulo;
    let cantidad;
    let cantidad_minima;
    let corto_organizacion;
    let corto_servicio;
    let nombre_tproducto;
    let habilitado;
    let page; 
    let reporte;
    if (idioma === 'es') {
      titulo = "Inventario de Productos";
      nombre_tproducto = "Tipo de Producto";
      corto_organizacion = "Organización";
      corto_servicio = "Servicio";
      cantidad = "Cantidad";
      cantidad_minima = "Cantidad Mínima";
      habilitado = "Habil.";
      page = "Página";
      reporte = "Reporte al"
    } else if (idioma === 'en') {
      titulo = "Records of Product Inventory";
      nombre_tproducto = "Product Type";
      corto_organizacion = "Organization";
      corto_servicio = "Service";
      cantidad = "Amount";
      cantidad_minima = "Minimum Amount";
      habilitado = "Enab.";
      page = "Page";
      reporte = "Report as of";
    } else if (idioma === 'por') {
      titulo = "Datas da Inventário de Produtos";
      nombre_tproducto = "Tipo de Produto";
      corto_organizacion = "Organização";
      corto_servicio = "Serviço";
      cantidad = "Quantidade";
      cantidad_minima = "Quantidade Mínima";
      habilitado = "Habil.";
      page = "Página";
      reporte = "Relatório em";
    } else {
      titulo = "Inventario de Productos";
      nombre_tproducto = "Tipo de Producto";
      corto_organizacion = "Organización";
      corto_servicio = "Servicio";
      cantidad = "Cantidad";
      cantidad_minima = "Cantidad Mínima";
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
    const JSONdata = JSON.stringify({ tarea: "imprime_stock_producto" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/stock_producto.php"; // API endpoint where we send form data.

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
    data = data.filter(item => item.cantidad.toLowerCase().indexOf(filtro) > -1 || 
    item.cantidad_minima.toLowerCase().indexOf(filtro) > -1 ||
    item.id_stock.toLowerCase().indexOf(filtro) > -1 ||
    item.corto_organizacion.toLowerCase().indexOf(filtro) > -1 ||
    item.corto_servicio.toLowerCase().indexOf(filtro) > -1 ||
    item.nombre_tproducto.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    doc.setProperties({
      title: titulo,
    });
    cabecera();
    data.map((datos, index) => {
      if (index % 2 == 0 && datos.nombre_tproducto.length > 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(10, lineas - 4, 282, 10, "F");
      }

      if (index % 2 == 0 && datos.nombre_tproducto.length < 120) {
        doc.setFillColor("#ECECEC");
        doc.rect(10, lineas - 4, 282, 5, "F");
      }
      doc.text(datos.id_stock, 14, lineas);
      doc.text(datos.nombre_tproducto, 22, lineas);
      doc.text(datos.corto_organizacion, 155, lineas);
      doc.text(datos.corto_servicio, 180, lineas);
      doc.text(datos.cantidad, 212, lineas);
      doc.text(datos.cantidad_minima, 242, lineas);

      if (datos.habilita == 0) habilita = "NO";
      else habilita = "SI";
      doc.text(habilita, 284, lineas);

      if (datos.nombre_tproducto.length > 100) {
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
    doc.rect(9.8, 19.8, 282.3, 7.4);
    doc.setFillColor("#EBEBEB");
    doc.rect(10, 20, 282, 7, "F");
    doc.setFontSize(14);

    doc.setTextColor(55, 0, 0);
    doc.text(titulo, 10, 12);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text("ID", 15, 25, { align: "center" });
    doc.line(20, 19.8, 20, 27.2);
    doc.text(nombre_tproducto ,77, 25, { align: "center" });
    doc.line(148, 19.8, 148, 27.2);
    doc.text(corto_organizacion , 162, 25, { align: "center" });
    doc.line(177, 19.8, 177, 27.2);
    doc.text(corto_servicio , 192, 25, { align: "center" });
    doc.line(210, 19.8, 210, 27.2);
    doc.text(cantidad , 225, 25, { align: "center" });
    doc.line(240, 19.8, 240, 27.2);
    doc.text(cantidad_minima , 260, 25, { align: "center" });
    doc.line(280, 19.8, 280, 27.2);
    doc.text(habilitado, 282, 25, { align: "left" });
    let fecha = new Date();
    fecha = fecha.toLocaleString();

    doc.text(`${reporte}: ` + fecha, 5, 198, { align: "left" });
    doc.text(`${page}: ` + pagina.toString(), 270, 198, { align: "right" });
  }
}

export function stock_producto_xls(filtro) {
  let data = [];

  const resultado = async () => {
    const JSONdata = JSON.stringify({ tarea: "imprime_stock_producto" }); // Send the data to the server in JSON format.
    const endpoint = "https://v2.equipasis.com/api/stock_producto.php"; // API endpoint where we send form data.

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
    data = data.filter(item => item.nombre_tproducto.toLowerCase().indexOf(filtro) > -1 || 
    item.corto_organizacion.toLowerCase().indexOf(filtro) > -1 ||
    item.corto_servicio.toLowerCase().indexOf(filtro) > -1 ||
    item.cantidad.toLowerCase().indexOf(filtro) > -1 ||
    item.cantidad_minima.toLowerCase().indexOf(filtro) > -1 ||
    item.id_stock.toLowerCase().indexOf(filtro) > -1 ||
    item.habilita.toLowerCase().indexOf(filtro) > -1);
    console.log(data.length);
    if (data.length != 0) {
      //const wb = XLSX.utils.table_to_book(table);
      const ws = XLSX.utils.json_to_sheet(data);

      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Inventario_Productos");

      /* Export to file (start a download) */
      XLSX.writeFile(wb, fecha + "_Inventario_Producto.xlsx");
    }
  };
  resultado()
}
