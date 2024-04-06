import jsPDF from "jspdf";

const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
});

let lineas = 35

export function proveedores_pdf(data,) {

    doc.setProperties({
        title: "Registro de Proveedores"
    });
    cabecera()
    data.map((datos, index) => {
        doc.text(datos.razonSocial, 5, lineas);
        doc.text(datos.email, 100, lineas);
        lineas=lineas+5;
    })

    doc.addPage()
    cabecera()

    window.open(doc.output('bloburl'))

}


function cabecera() {
    const logo = new Image();
    logo.src = "public/logo.png";
    doc.addImage(logo, "PNG", 170, 1, 14, 14); // Agregar la imagen al PDF (X, Y, Width, Height)
    doc.rect(4.3, 19.7, 201, 7.5)
    doc.setFillColor('#EBEBEB');
    doc.rect(5, 20, 200, 7, 'F')
    doc.setFontSize(14)

    doc.setTextColor(55, 0, 0);
    doc.text('Registro de Proveedores', 5, 12);
    doc.setTextColor(0, 0, 0);
    doc.text('Logo', 180, 12);
    doc.setFontSize(9)
    doc.text('Usuario', 15, 25, { align: "center" })
    doc.line(25, 20, 25, 27)
    doc.text('Apellidos y Nombres', 52.5, 25, { align: "center" })
    doc.line(80, 20, 80, 27)
    doc.text('Email', 110, 25, { align: "center" })
    doc.line(140, 20, 140, 27)
    doc.text('Teléfono', 162, 25, { align: "center" })
    doc.line(185, 20, 185, 27)
    doc.text('Habilitado', 195, 25, { align: "center" })
    let fecha = new Date()
    fecha = fecha.toLocaleString();

    doc.text('Reporte al: ' + fecha, 5, 288, { align: "left" })
    doc.text('Página: ', 195, 288, { align: "right" })
}