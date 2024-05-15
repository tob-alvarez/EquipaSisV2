/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { useTranslation } from "react-i18next";
import { EquipaContext } from "../../context/EquipaContext";
import { cambia_permisos_procesos, trae_permisos_procesos } from "./funciones_proceso";

// eslint-disable-next-line react/prop-types
const ModalAdjuntar = ({dato}) => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const { actualizador } = useContext(EquipaContext);
  const [checkboxState, setCheckboxState] = useState({});
  const [permisosPorUsuario, setPermisosPorUsuario] = useState([]);
  const [datos, setDatos] = useState({});

  const limpia_campos = () => {
    setCheckboxState([])
    setDatos({})
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };
   
  const acepta_accion = () => {

    cambia_permisos_procesos(datos).then((respuesta_accion) => {
      if (respuesta_accion[0].registros > 0) {
        toast.success(`${t("varios.alta")}`, {
          duration: 2000,
        });
        limpia_campos()
        actualizador()
      } else {
        toast.error(`${respuesta_accion[0].Mensage}`, {
          duration: 2000,
          className: "bg-success text-white fs-6",
        });
      }
      setIsModalAttachOpen(false);
    });
  }

  
  const handleCheckboxChange = (event, index, fieldName, tipo) => {
    const { checked } = event.target;
    const updatedCheckboxState = { ...checkboxState };
  
    // Actualizar el estado del campo específico del tipo de usuario correspondiente
    updatedCheckboxState[index] = {
      ...updatedCheckboxState[index],
      [fieldName]: checked ? true : false,
      tusuario: tipo.id_tusuario,
    };
    setCheckboxState(updatedCheckboxState);
  
    // Crear una copia del estado actual de datos
    const updatedDatos = { ...datos };
  
    // Actualizar el objeto de permisos en el estado de datos
    updatedDatos.permisos = Object.values(updatedCheckboxState);
    updatedDatos.id_proceso = dato.id_proceso
    updatedDatos.id_tusuario = "1"
  
    // Establecer el estado actualizado de datos
    setDatos(updatedDatos);
  };
  
  
  useEffect(() => {
    trae_permisos_procesos(dato).then((result) => {
      setPermisosPorUsuario(result);
      // Inicializa el estado de los checkboxes aquí
      const initialCheckboxState = {};
      permisosPorUsuario.forEach((tipo, index) => {
        initialCheckboxState[index] = {
          ver_opcion: tipo.ver_opcion === "1",
          agregar: tipo.agregar === "1",
          modificar: tipo.modificar === "1",
          eliminar: tipo.eliminar === "1",
          imprimir: tipo.imprimir === "1",
          exportar: tipo.exportar === "1",
          adjuntar: tipo.adjuntar === "1",
          habilita: tipo.habilita === "1",
          // Agrega otros permisos aquí según sea necesario
        };
      });
      setCheckboxState(initialCheckboxState);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalAttachOpen]);
  
  // console.log(permisosPorUsuario)
  // console.log(checkboxState)
  console.log(datos)

  return (
    <>
      <ToastContainer />
      <Modal
        show={isModalAttachOpen}
        onHide={closeModalAttach}
        size="xl"
        backdrop="static"
        centered
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Permisos por tipo de usuario para el proceso : {dato.nombre_proceso}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-1">
      <div className="table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th></th>
              <th style={{ textAlign: "center" }}>VER</th>
              <th style={{ textAlign: "center" }}>AGREGAR</th>
              <th style={{ textAlign: "center" }}>MODIFICAR</th>
              <th style={{ textAlign: "center" }}>ELIMINAR</th>
              <th style={{ textAlign: "center" }}>IMPRIMIR</th>
              <th style={{ textAlign: "center" }}>EXPORTAR</th>
              <th style={{ textAlign: "center" }}>ADJUNTAR</th>
              <th style={{ textAlign: "center" }}>HABILITA</th>
            </tr>
          </thead>
          <tbody>
            {permisosPorUsuario?.map((tipo, index) => (
              <tr key={index}>
                <td >{tipo.nombre_tusuario}</td>
                <td>
                <Form.Check
                  type="checkbox"
                  name="ver_opcion"
                  style={{ textAlign: "center" }}
                  checked={checkboxState[index]?.ver_opcion === true}
                  onChange={(event) => handleCheckboxChange(event, index, 'ver_opcion', tipo)}
                />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="agregar"
                    style={{ textAlign: "center" }}
                    checked={checkboxState[index]?.agregar === true}
                    onChange={(event) => handleCheckboxChange(event, index, 'agregar', tipo)}
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="modificar"
                    style={{ textAlign: "center" }}
                    checked={checkboxState[index]?.modificar === true}
                    onChange={(event) => handleCheckboxChange(event, index, 'modificar', tipo)}
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="eliminar"
                    style={{ textAlign: "center" }}
                    checked={checkboxState[index]?.eliminar === true}
                    onChange={(event) => handleCheckboxChange(event, index, 'eliminar', tipo)}
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="imprimir"
                    style={{ textAlign: "center" }}
                    checked={checkboxState[index]?.imprimir === true}
                    onChange={(event) => handleCheckboxChange(event, index, 'imprimir', tipo)}
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="exportar"
                    style={{ textAlign: "center" }}
                    checked={checkboxState[index]?.exportar === true}
                    onChange={(event) => handleCheckboxChange(event, index, 'exportar', tipo)}
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="adjuntar"
                    style={{ textAlign: "center" }}
                    checked={checkboxState[index]?.adjuntar === true}
                    onChange={(event) => handleCheckboxChange(event, index, 'adjuntar', tipo)}
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="habilita"
                    style={{ textAlign: "center" }}
                    checked={checkboxState[index]?.habilita === true}
                    onChange={(event) => handleCheckboxChange(event, index, 'habilita', tipo)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
              {t("login.aceptar")}
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
              {t("login.cancelar")}
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      <AttachFileOutlinedIcon
        onClick={() => setIsModalAttachOpen(true)}
        sx={{ fontSize: '20px' }}
        style={{ cursor: "pointer" }} />
    </>

  )
}

export default ModalAdjuntar