/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { alta_procesos } from "./funciones_proceso";
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { useTranslation } from "react-i18next";
import { EquipaContext } from "../../context/EquipaContext";

// eslint-disable-next-line react/prop-types
const ModalAdjuntar = ({dato}) => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const [id_proceso, setId_proceso] = useState("");
  const [nombre_proceso, setNombre_proceso] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [descripcion_en, setDescripcion_en] = useState("");
  const [descripcion_por, setDescripcion_por] = useState("");
  const [id_opcion, setId_opcion] = useState("");
  const [habilita, setHabilita] = useState(false);
  const { actualizador, traerOpciones } = useContext(EquipaContext);
  const limpia_campos = () => {
    setId_proceso("");
    setNombre_proceso("");
    setDescripcion("");
    setDescripcion_en("");
    setDescripcion_por("");
    setId_opcion("");
    setHabilita(false);
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };
  const acepta_accion = () => {
    const datos_cambios = {
      id_proceso: id_proceso,
      nombre_proceso: nombre_proceso,
      descripcion: descripcion,
      descripcion_en: descripcion_en,
      descripcion_por: descripcion_por,
      id_opcion: id_opcion,
      habilita: habilita === true ? "1" : "0",
    };

    if (nombre_proceso === "" || descripcion === "" || descripcion_en === "" || descripcion_por === "" || id_opcion === "") {
      toast.error(`${t("proceso.datoObligatorio")}`);
      return;
    }


    alta_procesos(datos_cambios).then((respuesta_accion) => {
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
  useEffect(() => {
    traerOpciones({tarea: "combo_opcion"})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <>
      <ToastContainer />
      <Modal
        show={isModalAttachOpen}
        onHide={closeModalAttach}
        size="lg"
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
          <div className="d-flex">
            <p className="m-0 py-2 px-1" style={{width: 200}}></p>
            <p className="m-0 py-2 px-1">VER</p>
            <p className="m-0 py-2 px-1">AGREGAR</p>
            <p className="m-0 py-2 px-1">MODIFICAR</p>
            <p className="m-0 py-2 px-1">ELIMINAR</p>
            <p className="m-0 py-2 px-1">IMPRIMIR</p>
            <p className="m-0 py-2 px-1">EXPORTAR</p>
            <p className="m-0 py-2 px-1">ADJUNTAR</p>
            <p className="m-0 py-2 px-1">HABILITA</p>
          </div>
          <div className="d-flex" style={{width: 200}}> 
            <p className="m-0 py-3 px-3">Administrador</p>
          </div>
          <div className="d-flex" style={{width: 200}}> 
            <p className="m-0 py-3 px-3">Supervisor</p>
          </div>
          <div className="d-flex" style={{width: 200}}> 
            <p className="m-0 py-3 px-3">Tecnico</p>
          </div>
          <div className="d-flex" style={{width: 200}}> 
            <p className="m-0 py-3 px-3">Operador de Carga</p>
          </div>
          <div className="d-flex" style={{width: 200}}> 
            <p className="m-0 py-3 px-3">Solo Lectura</p>
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