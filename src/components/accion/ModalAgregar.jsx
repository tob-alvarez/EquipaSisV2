import { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { alta_acciones } from "./funciones_accion";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from "react-i18next";

const ModalAgregar = () => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const [id_accion, setId_accion] = useState("");
  const [nombre_accion, setNombre_accion] = useState("");
  const [nombre_corto_accion, setNombre_corto_accion] = useState("");
  const [habilita, setHabilita] = useState(false);
  const limpia_campos = () => {
    setId_accion("");
    setNombre_accion("");
    setNombre_corto_accion("");
    setHabilita(false);
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };
  const acepta_accion = () => {
    const datos_cambios = {
      id_accion: id_accion,
      nombre_accion: nombre_accion,
      corto_accion: nombre_corto_accion,
      habilita: habilita === true ? "1" : "0",
    };

    if (nombre_accion === "" || nombre_corto_accion === "") {
      toast.error(`${t("accion.datoObligatorio")}`);
      return;
    }
    

    alta_acciones(datos_cambios).then((respuesta_accion) => {
      if (respuesta_accion[0].registros > 0) {
        toast.success(`Accion agregada correctamente`, {
          duration: 3000,
        });
        limpia_campos()
      } else {
        toast.error(`${respuesta_accion[0].Mensage}`, {
          duration: 3000,
          className: "bg-success text-white fs-6",
        });
      }
      setIsModalAttachOpen(false);
    });
  }


  return (
    <>
      <ToastContainer position="top-center"/>
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
          {t("accion.agregarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("accion.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("accion.nombre-accion")}: #
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
                {t("accion.nombre-corto")}: #
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
                  label={t("accion.habilitado")}
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
      
        <AddCircleOutlineOutlinedIcon
          onClick={() => setIsModalAttachOpen(true)}
          sx={{ fontSize: '40px' }}
          style={{ cursor: "pointer" }} />
    </>

  )
}

export default ModalAgregar