import { useEffect, useState } from "react";
import {
  trae_acciones,
  trae_permiso_acciones,
  // cambia_acciones,
  // alta_acciones,
  ayuda_acciones,
} from "./funciones_accion";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import HelpIcon from '@mui/icons-material/Help';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const Accion = () => {

  const [datos_acciones, setDatosAcciones] = useState([]);
  const [permisos_usuario, setPermisos_usuario] = useState([]);
  const [ayuda, setAyuda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {

    trae_permiso_acciones(1).then((auth_usuario) =>
      setPermisos_usuario(auth_usuario[0])
    );

    trae_acciones().then((result) => setDatosAcciones(result));

    ayuda_acciones().then((ayuda) => setAyuda(ayuda[0].texto));
  }, []);

  // console.log(datos_acciones)
  // console.log(permisos_usuario)
  // console.log(ayuda)
  ////////////////// majeador de busqueda////////////////////////

  function buscarPorExpresiones(grilla, expresiones) {
    const expresionesArray = expresiones
      .split(" ")
      .map((expresion) => expresion.trim());


    return expresionesArray.some(
      (expresion) =>
        /* if (expresion == "h" || expresion == "ha" || expresion == "hab" || expresion == "habi" || expresion == "habil" || expresion == "habili" || expresion == "habilit" || expresion == "habilita")
          var buscahabilita = "1"
 
        if (expresion == "d" || expresion == "de" || expresion == "des" || expresion == "desh" || expresion == "desha" || expresion == "deshab" || expresion == "deshabi" || expresion == "deshabil" || expresion == "deshabili" || expresion == "deshabilit" || expresion == "deshabilita")
          var buscahabilita = "0"
 
          grilla.habilita.toLowerCase().includes(buscahabilita) || */
        grilla.nombre_accion.toLowerCase().includes(expresion.toLowerCase()) ||
        grilla.corto_accion.toLowerCase().includes(expresion.toLowerCase())

    );
  }
  function buscarEnGrilla(expresiones) {
    return datos_acciones?.filter((grilla) => buscarPorExpresiones(grilla, expresiones));
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
    if (page >= 1 && page <= Math.ceil(datos_acciones.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mt-2 mb-2">
        {/* Funciones agregar, descargar, imprimir y ayuda */}
        <h1>Accion</h1>
        <div>

          {permisos_usuario.agregar == 1 ? (
            <AddIcon
              className="icons"
              sx={{ fontSize: '40px' }}
              style={{ cursor: "pointer" }}
            // onClick={openModal}
            />
          ) : (
            ""
          )}

          {permisos_usuario.exportar == 1 ? (
            <DownloadIcon
              sx={{ fontSize: '40px' }}
              className="icons"
              style={{ cursor: "pointer" }}
            // onClick={downloadInfo}
            />
          ) : (
            ""
          )}

          {permisos_usuario.imprimir == 1 ? (
            <LocalPrintshopIcon
              className="icons"
              sx={{ fontSize: '40px' }}
              style={{ cursor: "pointer" }}
            // onClick={printInfoProcess}
            />
          ) : (
            ""
          )}

          <HelpIcon
            sx={{ fontSize: '40px' }}
            className="icons"
            style={{ cursor: "pointer" }}
          // onClick={openModalHelp}
          />
        </div>
      </div>
      <div className="">
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex align-items-center w-50">
            <label htmlFor="search" className="form-label mb-0 p-2">
              Buscar:
            </label>
            <input
              type="text"
              className="form-control"
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      <div className="container mt-5">
        {/* <table
          className="table-container"
          style={{ backgroundColor: "#f6f5fa" }}
        >
          <thead style={{ backgroundColor: "#f6f5fa" }}>
            <tr>
              <th>Id</th>
              <th>Nombre Acción</th>
              <th>Nombre Corto</th>
              <th>Estado</th>
              <th className="text-center">Accion</th>
            </tr>
          </thead>
          <tbody className="table-body" style={{ backgroundColor: "#f6f5fa" }}>
            {currentItems?.map((dato, index) => (
              <tr
                className={
                  index % 2 == 0 ? "table-row-gray" : "table-row-gray--claro"
                }
                key={index}
              >
                <td>{dato.id_accion}</td>
                <td>{dato.nombre_accion.toUpperCase()}</td>
                <td>{dato.corto_accion}</td>
                <td
                  style={{
                    fontWeight: dato.habilita == 1 ? "bolder" : "lighter",
                    color: dato.habilita == 1 ? "" : "#ff0000",
                  }}
                >
                  {dato.habilita == 1 ? "HABILITADO" : "DESHABILITADO"}
                </td>
                <td className="text-center">
                  {permisos_usuario.modificar == 1 ? (
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      // onClick={() => onEdit(dato)}
                      className="icons_table"
                    />
                  ) : (
                    ""
                  )}
                  {permisos_usuario.eliminar == 1 ? (
                    <DeleteIcon
                      style={{ cursor: "pointer" }}
                      // onClick={() => onDelete(dato)}
                      className="icons_table"
                    />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination justify-content-center mt-2 align-items-center">
          <button className="icons-contact" onClick={() => handlePageChange(1)}>
            &laquo;&laquo;
          </button>
          <button
            className="mx-2 icons-contact"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &laquo;
          </button>
          <button
            className="mx-2 icons-contact"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &raquo;
          </button>
          <button
            className="icons-contact me-3"
            onClick={() =>
              handlePageChange(Math.ceil(datos_acciones.length / itemsPerPage))
            }
          >
            &raquo;&raquo;
          </button>
          <div className="col-3 align-self-center pt-2">
            <h6>
              Pagina {currentPage} de{" "}
              {Math.ceil(datos_acciones.length / itemsPerPage)}
            </h6>
          </div>
        </div> */}
        <TableContainer component={Paper}>
          <Table aria-label="material ui table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Nombre Acción</TableCell>
                <TableCell>Nombre Corto</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="center">Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((dato, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#e0e0e0',
                    '& .MuiTableCell-root': {
                      padding: '8px', // Ajusta el relleno de las celdas para reducir la altura
                    },
                    height: '40px', // Ajusta la altura de la fila
                  }}
                >
                  <TableCell>{dato.id_accion}</TableCell>
                  <TableCell>{dato.nombre_accion.toUpperCase()}</TableCell>
                  <TableCell>{dato.corto_accion}</TableCell>
                  <TableCell>
                    <Typography
                      fontWeight={dato.habilita === 1 ? 'bold' : 'lighter'}
                      color={dato.habilita === 1 ? '' : '#ff0000'}
                    >
                      {dato.habilita === 1 ? 'HABILITADO' : 'DESHABILITADO'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {permisos_usuario.modificar === "1" && (
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    )}
                    {permisos_usuario.eliminar === "1" && (
                      <IconButton>
                        <DeleteIcon />
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

            <Typography variant="h6" className="col-3 align-self-center pt-2">
              Página {currentPage} de {Math.ceil(filteredItems.length / itemsPerPage)}
            </Typography>
          </div>
        </TableContainer>
      </div>
    </>
  )
}

export default Accion