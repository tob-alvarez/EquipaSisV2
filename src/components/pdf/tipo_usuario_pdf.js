import jsPDF from "jspdf";

const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
});

let lineas = 35
let pagina = 1
let data = []

dataFetch_otro()

export function tipo_usuario_pdf() {
 
    doc.setProperties({
        title: "Registro de Tipo de Usuarios"
    });
    cabecera()
    data.map((datos, index) => {

        if(index % 2 == 0 && datos.nombre_tusuario.length > 120){
            doc.setFillColor('#ECECEC');
            doc.rect(5, lineas-4, 200, 10, 'F')
        }

        if(index % 2 == 0 && datos.nombre_tusuario.length < 120){
            doc.setFillColor('#ECECEC');
            doc.rect(5, lineas-4, 200, 5, 'F')
        } 

        doc.text(datos.id_tusuario, 7, lineas);
        doc.text(datos.nombre_tusuario, 20, lineas);
        
        console.log(datos.observacion.length)
        if (datos.observacion > 24) {
            doc.text(datos.observacion, 65, lineas, { maxWidth: 23 , lineHeightFactor: 1.6 });
        }
        else {
            doc.text(datos.observacion, 65, lineas);
        }

        if(datos.habilita == 0) 
            datos.habilita = 'NO';
        else
            datos.habilita = 'SI';
         
        doc.text(datos.habilita, 195, lineas);
        
        if (datos.observacion.length > 27){
            //doc.line(5,lineas+6,200,lineas+6);
            lineas = lineas + 10;
        }
        
        else{
            //doc.line(5,lineas+1,200,lineas+1);
            lineas = lineas + 5;
        }
        if(lineas>270 ){
            pagina=pagina+1
            lineas=35
            doc.addPage()
            cabecera()
        }

    })


    window.open(doc.output('bloburl'))

}


function cabecera() {
    const logo = new Image();
    logo.src = '/imagenes/equipasis.jpg';
    doc.addImage(logo, 'JPEG', 180, 1, 20, 15); // Agregar la imagen al PDF (X, Y, Width, Height)
    doc.rect(4.8, 19.8, 200.3, 7.4)
    doc.setFillColor('#EBEBEB');
    doc.rect(5, 20, 200, 7, 'F')
    doc.setFontSize(14)

    doc.setTextColor(55, 0, 0);
    doc.text('Registro de Tipo de Usuarios', 5, 12);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9)
    doc.text('ID', 12, 25, { align: "center" })
    doc.line(18, 19.8, 18, 27.2)
    doc.text('Tipo de Usuario', 40, 25, { align: "center" })
    doc.line(63, 19.8, 63, 27.2)
    doc.text('Observación', 120, 25, { align: "center" })
    doc.text('Habilitada', 197, 25, { align: "center" })
    doc.line(187, 19.8, 187, 27.2)
    let fecha = new Date()
    fecha = fecha.toLocaleString();

    doc.text('Reporte al: ' + fecha, 5, 288, { align: "left" })
    doc.text('Página: '+pagina.toString(), 195, 288, { align: "right" })
}

async function dataFetch_otro () {
    const data_otro = await (
      await fetch(
        "https://v2.equipasis.com/api/prueba.php?tarea=imprimir_tipo_usuario"
      )
    ).json();
    data = data_otro["datos"];
  };