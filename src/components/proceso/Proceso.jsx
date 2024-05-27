import { useContext, useEffect, useState } from "react";
import './table.css'
import {
  trae_procesos,
  ayuda_procesos,
  trae_permisos
} from "./funciones_proceso";
import { proceso_pdf, proceso_xls } from '../pdf/proceso_pdf';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ModalAgregar from "./ModalAgregar";
import ModalAyuda from "./ModalAyuda";
import ModalEditar from "./ModalEditar";
import ModalBorrar from "./ModalBorrar";
import { EquipaContext } from "../../context/EquipaContext";
import ModalAdjuntar from "./ModalAdjuntar";

const Proceso = () => {
  const [t] = useTranslation("global")
  const [datos_procesos, setDatosprocesos] = useState([]);
  const [permisos_usuario, setPermisos_usuario] = useState([]);
  const [ayuda, setAyuda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const { refresh, user, consultaPerfil } = useContext(EquipaContext);
  const [searchTerm, setSearchTerm] = useState("");
  
  let idioma = localStorage.getItem('language')
  
  useEffect(() => {
    let token = sessionStorage.getItem('token')
    consultaPerfil(token)
      trae_procesos().then((result) => setDatosprocesos(result));
      switch (idioma) {
        case "es":
          ayuda_procesos().then((ayuda) => setAyuda(ayuda[0].texto));
          break;
        case "en":
          ayuda_procesos().then((ayuda) => setAyuda(ayuda[0].texto_en));
          break;
        case "por":
          ayuda_procesos().then((ayuda) => setAyuda(ayuda[0].texto_por));
          break;
        default:
          ayuda_procesos().then((ayuda) => setAyuda(ayuda[0].texto));
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idioma, refresh]);
  
    useEffect(() => {
      let id = user?.id_usuario
      let datos = {
        tarea: "permiso_usuario",
        proceso: "proceso",
        id_usuario: id
      }
      console.log(datos)
      trae_permisos(datos).then((result) =>setPermisos_usuario(result[0]))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultaPerfil])
  ////////////////// majeador de busqueda////////////////////////

  function buscarPorExpresiones(grilla, expresiones) {
    const expresionesArray = expresiones
      .split(" ")
      .map((expresion) => expresion.trim());
    return expresionesArray.some(
      (expresion) =>
        grilla.id_proceso.toLowerCase().includes(expresion.toLowerCase()) ||
        grilla.nombre_proceso.toLowerCase().includes(expresion.toLowerCase()) ||
        grilla.descripcion.toLowerCase().includes(expresion.toLowerCase()) ||
        grilla.descripcion_en.toLowerCase().includes(expresion.toLowerCase()) ||
        grilla.descripcion_por.toLowerCase().includes(expresion.toLowerCase()) ||
        grilla.nombre_opcion.toLowerCase().includes(expresion.toLowerCase()) ||
        grilla.habilita_3.toLowerCase().includes(expresion.toLowerCase())
    );
  }

  function buscarEnGrilla(expresiones) {
    return datos_procesos?.filter((grilla) => buscarPorExpresiones(grilla, expresiones));
  }
  const filteredItems = buscarEnGrilla(searchTerm);
  const currentItems = filteredItems?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Resetear la página cuando se realiza una nueva búsqueda
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(datos_procesos.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };
  const printInfoProcess = () => {
    let idioma = localStorage.getItem("language")
    console.log(idioma)
    proceso_pdf(searchTerm, idioma);
  };
  const downloadInfo = () => {
    proceso_xls(searchTerm);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2 container">
        {/* Funciones agregar, descargar, imprimir y ayuda */}
        <h1 className="m-0">{t("proceso.titulo")}</h1>
        <div className="inputContainer d-flex">
          <label htmlFor="search" className="form-label mb-0 p-2">
            {t("proceso.busqueda")}
          </label>
          <input
            type="text"
            className="form-control"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          {permisos_usuario.agregar == 1 ? (
            <ModalAgregar />
          ) : (
            ""
          )}
          {permisos_usuario.exportar == 1 ? (
            <DownloadOutlinedIcon
              sx={{ fontSize: '40px' }}
              className="icons"
              style={{ cursor: "pointer" }}
              onClick={downloadInfo}
            />
          ) : (
            ""
          )}
          {permisos_usuario.imprimir == 1 ? (
            <LocalPrintshopOutlinedIcon
              className="icons"
              sx={{ fontSize: '40px' }}
              style={{ cursor: "pointer" }}
              onClick={printInfoProcess}
            />
          ) : (
            ""
          )}
          <ModalAyuda
            ayuda={ayuda}
          />
        </div>
      </div>
      <div className="container mt-3 mb-5">
        <TableContainer component={Paper}>
          <Table aria-label="material ui table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>{t("proceso.nombre-proceso")}</TableCell>
                <TableCell>{t("proceso.descripcion")}</TableCell>
                <TableCell>{t("proceso.descripcion_en")}</TableCell>
                <TableCell>{t("proceso.descripcion_por")}</TableCell>
                <TableCell>{t("proceso.nombre_opcion")}</TableCell>
                <TableCell>{t("proceso.estado")}</TableCell>
                <TableCell align="center">{t("proceso.acciones")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((dato, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#e0e0e0',
                    '& .MuiTableCell-root': {
                      padding: '0px', // Ajusta el relleno de las celdas para reducir la altura
                    },
                    height: '5px', // Ajusta la altura de la fila
                  }}
                >
                  <TableCell sx={{textAlign: 'center'}}>{dato.id_proceso}</TableCell>
                  <TableCell>{dato.nombre_proceso.toUpperCase()}</TableCell>
                  <TableCell>{dato.descripcion.toUpperCase()}</TableCell>
                  <TableCell>{dato.descripcion_en.toUpperCase()}</TableCell>
                  <TableCell>{dato.descripcion_por.toUpperCase()}</TableCell>
                  <TableCell>{dato.nombre_opcion.toUpperCase()}</TableCell>
                  <TableCell>
                    <p
                      style={dato.habilita_3 === 'SI' ? {margin: 0, textAlign: "center"}:{margin:0, color: "#ff0000", textAlign: "center"}}
                    >
                      {dato.habilita_3}
                    </p>
                  </TableCell>
                  <TableCell align="center">
                    {permisos_usuario.modificar === "1" && (
                      <IconButton>
                        <ModalEditar dato={dato}/>
                      </IconButton>
                    )}
                    {permisos_usuario.eliminar === "1" && (
                      <IconButton>
                        <ModalBorrar dato={dato} />
                      </IconButton>
                    )}
                    {permisos_usuario.adjuntar === "1" && (
                      <IconButton>
                        <ModalAdjuntar dato={dato} />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="pagination justify-content-center mt-2 align-items-center p-2">
            <Button
              className="icons-contact"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              <KeyboardDoubleArrowLeftIcon/>
            </Button>
            <Button
              className="mx-2 icons-contact"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <KeyboardArrowLeftIcon/>
            </Button>
            <Button
              className="mx-2 icons-contact"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
            >
              <KeyboardArrowRightIcon/>
            </Button>
            <Button
              className="icons-contact me-3"
              onClick={() =>
                handlePageChange(Math.ceil(filteredItems.length / itemsPerPage))
              }
              disabled={
                currentPage === Math.ceil(filteredItems.length / itemsPerPage)
              }
            >
              <KeyboardDoubleArrowRightIcon/>
            </Button>

            <Typography variant="p" className="col-3 align-self-center">
            {t("proceso.pagina")} {currentPage} {t("accion.de")} {Math.ceil(filteredItems.length / itemsPerPage)}
            </Typography>
            <Typography variant="p" className="align-self-center">
            {t("proceso.registros")} {filteredItems.length}
            </Typography>
          </div>
        </TableContainer>
      </div>
    </>
  )
}

export default Proceso