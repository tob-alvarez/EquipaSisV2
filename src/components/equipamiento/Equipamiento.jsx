import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./table.css";
import {
  trae_equipamiento,
  ayuda_equipamiento,
  trae_permisos,
  trae_combos,
} from "./funciones_equipamiento";
import { equipamiento_pdf, equipamiento_xls } from "../pdf/equipamiento_pdf";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Collapse,
  Box,
  Grid,
  } from "@mui/material";
import { useTranslation } from "react-i18next";
import ModalAgregar from "./ModalAgregar";
import ModalAyuda from "./ModalAyuda";
import ModalEditar from "./ModalEditar";
import ModalBorrar from "./ModalBorrar";
import { EquipaContext } from "../../context/EquipaContext";

const Equipamiento = () => {
  const navigate = useNavigate();

  const { logout } = React.useContext(EquipaContext);

  const [open, setOpen] = React.useState([]);

  const [t] = useTranslation("global");
  const [datos_equipamiento, setDatosEquipamiento] = useState([]);
  const [permisos_usuario, setPermisos_usuario] = useState([]);
  const [ayuda, setAyuda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const { refresh } = useContext(EquipaContext);
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [datos, setDatos] = useState({
    tarea: "permiso_usuario",
    token: sessionStorage.getItem("token"),
  });

  let idioma = localStorage.getItem("language");

  useEffect(() => {
    trae_equipamiento(datos).then((result) => setDatosEquipamiento(result));
    switch (idioma) {
      case "es":
        ayuda_equipamiento().then((ayuda) => setAyuda(ayuda[0].texto));
        break;
      case "en":
        ayuda_equipamiento().then((ayuda) => setAyuda(ayuda[0].texto_en));
        break;
      case "por":
        ayuda_equipamiento().then((ayuda) => setAyuda(ayuda[0].texto_por));
        break;
      default:
        ayuda_equipamiento().then((ayuda) => setAyuda(ayuda[0].texto));
    }
    trae_permisos(datos).then((result) => {
      setPermisos_usuario(result.equipamiento[0]);
      if (result.estado_token[0].estado == "VENCIDO") {
        toast.success("Su sesion ha expirado, por favor ingrese nuevamente", {
          autoClose: false,
          onClose: () => logout(),
        });
      }
      console.log(
        result.estado_token[0].estado + "-" + result.estado_token[0].tiempo
      );
    });
    console.log(datos_equipamiento)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    datos_equipamiento.map((dato, index) => {
      setOpen({ [index]: false });
    });
  }, [idioma, refresh]);

  ////////////////// majeador de busqueda////////////////////////

  function buscarPorExpresiones(grilla, expresiones) {
    const expresionesArray = expresiones
      .split(" ")
      .map((expresion) => expresion.trim());
    return expresionesArray.some(
      (expresion) =>
        grilla.id_equipamiento.toLowerCase().includes(expresion.toLowerCase())
      /* grilla.habilita_3.toLowerCase().includes(expresion.toLowerCase()) ||
        grilla.nombre_accion.toLowerCase().includes(expresion.toLowerCase()) ||
        grilla.corto_accion.toLowerCase().includes(expresion.toLowerCase())  */
    );
  }

  function buscarEnGrilla(expresiones) {
    return datos_equipamiento?.filter((grilla) =>
      buscarPorExpresiones(grilla, expresiones)
    );
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
    if (
      page >= 1 &&
      page <= Math.ceil(datos_equipamiento.length / itemsPerPage)
    ) {
      setCurrentPage(page);
    }
  };
  const printInfoProcess = () => {
    let idioma = localStorage.getItem("language");
    equipamiento_pdf(searchTerm, idioma);
  };
  const downloadInfo = () => {
    equipamiento_xls(searchTerm);
  };

  function abircerrar(paso) {
    if (open[paso] == true) setOpen({ [paso]: false });
    else setOpen({ [paso]: true });
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2 container">
        {/* Funciones agregar, descargar, imprimir y ayuda */}
        <h1 className="m-0">{t("equipamiento.titulo")}</h1>
        <div className="inputContainer d-flex">
          <label htmlFor="search" className="form-label mb-0 p-2">
            {t("equipamiento.busqueda")}
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
          {permisos_usuario.agregar == 1 ? <ModalEditar dato={''} dedonde={1} /> : ""}
          {permisos_usuario.exportar == 1 ? (
            <DownloadOutlinedIcon
              sx={{ fontSize: "40px" }}
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
              sx={{ fontSize: "40px" }}
              style={{ cursor: "pointer" }}
              onClick={printInfoProcess}
            />
          ) : (
            ""
          )}
          <ModalAyuda ayuda={ayuda} />
        </div>
      </div>
      <div className="container mt-3 mb-5">
        <TableContainer component={Paper}>
          <Table aria-label="material ui  collapsible  table">
            <TableHead>
              <TableRow>
                <TableCell>&nbsp;</TableCell>
                <TableCell>{t("equipamiento.id_equipamiento")}</TableCell>
                <TableCell>{t("equipamiento.nombre_organizacion")}</TableCell>
                <TableCell>{t("equipamiento.nombre_servicio")}</TableCell>
                <TableCell>{t("equipamiento.nombre_tequipo")}</TableCell>
                <TableCell>{t("equipamiento.nombre_marca")}</TableCell>
                <TableCell>{t("equipamiento.modelo")}</TableCell>
                <TableCell>{t("equipamiento.num_serie")}</TableCell>
                <TableCell>{t("equipamiento.fecha_instala")}</TableCell>
                <TableCell>{t("equipamiento.anio_fabricación")}</TableCell>
                <TableCell>{t("equipamiento.nombre_estado")}</TableCell>
                <TableCell align="center">
                  {t("equipamiento.habilita")}
                </TableCell>
                <TableCell align="center">
                  {t("equipamiento.acciones")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((dato, index) => {
                return (
                  <React.Fragment key={dato.id_equipamiento}>
                    <TableRow
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#f0f0f0" : "#e0e0e0",
                        "& .MuiTableCell-root": {
                          padding: "0px", // Ajusta el relleno de las celdas para reducir la altura
                        },
                        height: "5px", // Ajusta la altura de la fila
                      }}
                    >
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => abircerrar(index)}
                        >
                          {open[index] ? (
                            <RemoveCircleOutlineRoundedIcon />
                          ) : (
                            <AddCircleOutlineRoundedIcon  />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: "center" }}
                        style={{ fontSize: "0.7rem" }}
                      >
                        {dato.id_equipamiento}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.7rem" }}>
                        {dato.nombre_organizacion.toUpperCase()}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.7rem" }}>
                        {dato.nombre_servicio.toUpperCase()}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.7rem" }}>
                        {dato.nombre_tequipo}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.7rem" }}>
                        {dato.nombre_marca}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.7rem" }}>
                        {dato.modelo}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.7rem" }}>
                        {dato.num_serie}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.7rem" }}>
                        {dato.fecha_instala}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.7rem" }}>
                        {dato.anio_fabricacion}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.7rem" }}>
                        {dato.nombre_estado}
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: "center" }}
                        style={{ fontSize: "0.7rem" }}
                      >
                        <p
                          style={
                            dato.habilita_3 === "SI"
                              ? { margin: 0 }
                              : { margin: 0, color: "#ff0000" }
                          }
                        >
                          {dato.habilita_3}
                        </p>
                      </TableCell>
                      <TableCell align="center" style={{ fontSize: "0.7rem" }}>
                        {permisos_usuario.modificar === "1" && (
                          <IconButton>
                            <ModalEditar dato={dato} dedonde={0} />
                          </IconButton>
                        )}
                        {permisos_usuario.eliminar === "1" && (
                          <IconButton>
                            <ModalBorrar dato={dato} />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow key={dato.id_equipamiento}>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={13}
                      >
                        <Collapse in={open[index]} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 2 }}>
                              <Grid
                                container
                                /* rowSpacing={1} */
                                columnSpacing={{xs: 2}}
                              >
                                <Grid item >
                                <Button variant="contained" sx={{fontSize:"0.7em",backgroundColor:"#1565c0",color:"white"}}>{dato.nombre_organizacion}</Button>
                                </Grid>
                                <Grid item>
                                  Prioridad: {dato.nombre_prioridad}
                                </Grid>
                                <Grid item >
                                  Software: {dato.nombre_software}
                                </Grid>
                                <Grid item>
                                 Pertenecia: {dato.nombre_tpertenencia}
                                </Grid>
                              </Grid>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
          <div className="pagination justify-content-center mt-2 align-items-center p-2">
            <Button
              className="icons-contact"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              <KeyboardDoubleArrowLeftIcon />
            </Button>
            <Button
              className="mx-2 icons-contact"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <KeyboardArrowLeftIcon />
            </Button>
            <Button
              className="mx-2 icons-contact"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(filteredItems.length / itemsPerPage)
              }
            >
              <KeyboardArrowRightIcon />
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
              <KeyboardDoubleArrowRightIcon />
            </Button>

            <Typography variant="p" className="col-3 align-self-center">
              {t("equipamiento.pagina")} {currentPage} {t("equipamiento.de")}{" "}
              {Math.ceil(filteredItems.length / itemsPerPage)}
            </Typography>
            <Typography variant="p" className="align-self-center">
              {t("equipamiento.registros")} {filteredItems.length}
            </Typography>
          </div>
        </TableContainer>
      </div>
    </>
  );
};

export default Equipamiento;
