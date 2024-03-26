

//ELIMINAR DESPUES








import { useState, useEffect } from "react";
// import { accion_pdf, accion_xls } from "@/components/pdf/accion_pdf";
import {
  trae_acciones,
  trae_permiso_acciones,
  cambia_acciones,
  alta_acciones,
  ayuda_acciones,
} from "./funciones_accion";

import "./table.css";
import { toast } from "react-toastify";

export const Accionn = () => {

  const [datos_acciones, setDatosAcciones] = useState([]);
  const [permisos_usuario, setPermisos_usuario] = useState([]);
  const [ayuda, setAyuda] = useState("");
  const [id_accion, setId_accion] = useState("");
  const [nombre_accion, setNombre_accion] = useState("");
  const [nombre_corto_accion, setNombre_corto_accion] = useState("");
  const [habilita, setHabilita] = useState(false);
  const [titulo_modal, setTitulo_modal] = useState("NUEVA ACCION");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [isModalHelpOpen, setIsModalHelpOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem("authData"));

    trae_permiso_acciones(sesion.persona[0].id_usuario).then((auth_usuario) =>
      setPermisos_usuario(auth_usuario[0])
    );

    trae_acciones().then((result) => setDatosAcciones(result));

    ayuda_acciones().then((ayuda) => setAyuda(ayuda[0].texto));
  }, []);

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

  //////////////////////////////////////////////////////////////////

  /*   const filteredItems = datos_acciones?.filter((item) => {
      if (!searchTerm) {
        return true;
      }
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }); */

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Resetear la página cuando se realiza una nueva búsqueda
  };

  /////////////////////////////////////////////////////

  const currentItems = filteredItems?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(datos_acciones.length / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  const limpia_campos = () => {
    setId_accion("");
    setNombre_accion("");
    setNombre_corto_accion("");
    setHabilita(false);
  };

  const openModal = () => {
    limpia_campos();
    setTitulo_modal("NUEVA ACCION");
    setIsModalAttachOpen(true);
  };

  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };

  const openModalHelp = () => {
    setIsModalHelpOpen(true);
  };

  const closeModalHelp = () => {
    setIsModalHelpOpen(false);
  };

  const closeModalDelete = () => {
    setIsModalDeleteOpen(false);
  };

  const onEdit = (item) => {
    limpia_campos();
    setTitulo_modal("MODIFICAR ACCION");
    setId_accion(item.id_accion);
    setNombre_accion(item.nombre_accion);
    setNombre_corto_accion(item.corto_accion);
    setHabilita(item.habilita == "1" ? true : false);
    setIsModalAttachOpen(true);
  };

  const onDelete = (item) => {
    limpia_campos();
    setId_accion(item.id_accion);
    setNombre_accion(item.nombre_accion);
    setNombre_corto_accion(item.corto_accion);
    setHabilita(item.habilita == "1" ? true : false);
    setIsModalDeleteOpen(true);
  };

  const borra_accion = () => {
    const datos_cambios = {
      id_accion: id_accion,
      nombre_accion: nombre_accion,
      corto_accion: nombre_corto_accion,
      habilita: "0",
    };
    cambia_acciones(datos_cambios).then((respuesta_accion) => {
      if (respuesta_accion[0].registros > 0) {
        trae_acciones().then((result) => setDatosAcciones(result));
      } else {
        alert(respuesta_accion[0].Mensage);
      }
      setIsModalDeleteOpen(false);

      toast.success("Registro deshabiltado correctamente", {
        duration: 3000,
        className: "bg-success text-white fs-6",
      });
    });
  };

  const acepta_accion = () => {
    const datos_cambios = {
      id_accion: id_accion,
      nombre_accion: nombre_accion,
      corto_accion: nombre_corto_accion,
      habilita: habilita === true ? "1" : "0",
    };

    if (nombre_accion == "" || nombre_corto_accion == "") {
      alert("Los campos marcados con # son obligaotios");
      return;
    }

    if (titulo_modal === "NUEVA ACCION") {
      alta_acciones(datos_cambios).then((respuesta_accion) => {
        if (respuesta_accion[0].registros > 0) {
          trae_acciones().then((result) => setDatosAcciones(result));
          toast.success(`${titulo_modal} realizada correctamente`, {
            duration: 3000,
          });
        } else {
          toast.error(`${respuesta_accion[0].Mensage}`, {
            duration: 3000,
            className: "bg-success text-white fs-6",
          });
        }
        setIsModalAttachOpen(false);
      });
    } else {
      cambia_acciones(datos_cambios).then((respuesta_accion) => {
        if (respuesta_accion[0].registros > 0) {
          trae_acciones().then((result) => setDatosAcciones(result));
          toast.success(`${titulo_modal} realizada correctamente`, {
            duration: 3000,
            className: "bg-success text-white fs-6",
          });
        } else {
          toast.error(`${respuesta_accion[0].Mensage}`, {
            duration: 3000,
            className: "bg-danger text-white fs-6",
          });
        }
        setIsModalAttachOpen(false);
      });
    }
  };

  const printInfoProcess = () => {
    accion_pdf(searchTerm);
  };
  const downloadInfo = () => {
    accion_xls(searchTerm);
  };

  return (
    <>
      <Toaster position="top-center" richColors expand />
      <div className="d-flex justify-content-end mt-2 mb-2">
        {/* Funciones agregar, descargar, imprimir y ayuda */}

        {permisos_usuario.agregar == 1 ? (
          <BiMessageSquareAdd
            className="icons"
            style={{ cursor: "pointer" }}
            onClick={openModal}
          />
        ) : (
          ""
        )}

        {permisos_usuario.exportar == 1 ? (
          <BiDownload
            className="icons"
            style={{ cursor: "pointer" }}
            onClick={downloadInfo}
          />
        ) : (
          ""
        )}

        {permisos_usuario.imprimir == 1 ? (
          <BiPrinter
            className="icons"
            style={{ cursor: "pointer" }}
            onClick={printInfoProcess}
          />
        ) : (
          ""
        )}

        <MdOutlineHelpCenter
          className="icons"
          style={{ cursor: "pointer" }}
          onClick={openModalHelp}
        />
      </div>

      <div className="card p-3" style={{ backgroundColor: "#f6f5fa" }}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-lg h3 font-weight-bold">ACCION</div>
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

        <table
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
                    <BiEdit
                      style={{ cursor: "pointer" }}
                      onClick={() => onEdit(dato)}
                      className="icons_table"
                    />
                  ) : (
                    ""
                  )}
                  {permisos_usuario.eliminar == 1 ? (
                    <BiTrash
                      style={{ cursor: "pointer" }}
                      onClick={() => onDelete(dato)}
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
        </div>
      </div>

      <Modal
        show={isModalDeleteOpen}
        onHide={closeModalDelete}
        backdrop="static"
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Elimina la accion?...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {habilita == 1 ? (
            <>
              <h6>
                <b>Accion:</b>
              </h6>
              <p style={{ fontSize: "0.8em" }}>
                <b>{nombre_accion}</b>
              </p>
            </>
          ) : (
            <>
              <h6>
                <b>Accion:</b>
              </h6>
              <p style={{ fontSize: "0.8em" }}>
                <b>{nombre_accion}</b>
              </p>
              <p style={{ fontSize: "0.8em", color: "red" }}>
                Esta accion ya esta deshabilitada
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="justify-content-center mt-2">
            {habilita == 1 ? (
              <button
                onClick={borra_accion}
                className="btn btn-primary btn-sm m-2"
                style={{
                  float: "right",
                  backgroundColor: "green",
                  borderColor: "green",
                }}
              >
                Aceptar
              </button>
            ) : (
              ""
            )}
            <button
              onClick={closeModalDelete}
              className="btn btn-secondary btn-sm m-2"
              style={{
                float: "right",
                backgroundColor: "#990000",
                borderColor: "#990000",
              }}
            >
              Cerrar
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={isModalAttachOpen}
        onHide={closeModalAttach}
        size="lg"
        backdrop="static"
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {titulo_modal}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              (datos obligatorios marcados con #)
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  Nombre Acción: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_accion"
                    value={nombre_accion}
                    onChange={(e) => setNombre_accion(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_accion(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  Nombre Corto: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_corto_accion"
                    value={nombre_corto_accion}
                    onChange={(e) => setNombre_corto_accion(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_corto_accion(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                <Form.Check // prettier-ignore
                  type={"checkbox"}
                  id={"habilita"}
                  checked={habilita}
                  label={`Habilitado (tildar por afirmativo)`}
                  onChange={(e) => setHabilita(e.target.checked)}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="justify-content-center mt-2">
            <button
              onClick={acepta_accion}
              className="btn btn-primary btn-sm m-2"
              style={{
                float: "right",
                backgroundColor: "green",
                borderColor: "green",
              }}
            >
              Aceptar
            </button>
            <button
              onClick={closeModalAttach}
              className="btn btn-secondary btn-sm m-2"
              style={{
                float: "right",
                backgroundColor: "#990000",
                borderColor: "#990000",
              }}
            >
              Cerrar
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={isModalHelpOpen}
        onHide={closeModalHelp}
        backdrop="static"
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 className="form-header text-bold">AYUDA</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-white forms m-3">
            {ayuda &&
              ayuda
                .split("</br>")
                .map((line, index) => <p key={index}>{line}</p>)}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="justify-content-center mt-2">
            <button
              onClick={closeModalHelp}
              className="btn btn-secondary btn-sm m-2"
              style={{
                float: "right",
                backgroundColor: "#990000",
                borderColor: "#990000",
              }}
            >
              Cerrar
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

