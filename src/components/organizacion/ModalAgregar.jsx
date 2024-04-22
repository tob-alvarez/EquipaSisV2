import { useContext, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { alta_organizaciones } from "./funciones_organizacion";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalAgregar = () => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const [id_organizacion, setId_organizacion] = useState("");
  const [nombre_organizacion, setNombre_organizacion] = useState("");
  const [corto_organizacion, setCorto_organizacion] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [habilita, setHabilita] = useState(false);
  const { actualizador } = useContext(EquipaContext);
  const limpia_campos = () => {
    setId_organizacion("");
    setNombre_organizacion("");
    setCorto_organizacion("");
    setDomicilio("");
    setTelefono("");
    setHabilita(false);
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };
  const acepta_accion = () => {
    const datos_cambios = {
      id_organizacion: id_organizacion,
      nombre_organizacion: nombre_organizacion,
      corto_organizacion: corto_organizacion,
      domicilio: domicilio,
      telefono: telefono,
      habilita: habilita === true ? "1" : "0",
    };

    if (nombre_organizacion === "" || corto_organizacion === "" ) {
      toast.error(`${t("organizacion.datoObligatorio")}`);
      return;
    }
    

    alta_organizaciones(datos_cambios).then((respuesta_accion) => {
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


  return (
    <>
      <ToastContainer/>
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
          {t("organizacion.agregarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("organizacion.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgrounddomicilio: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("organizacion.nombre-organizacion")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_organizacion"
                    value={nombre_organizacion}
                    onChange={(e) => setNombre_organizacion(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_organizacion(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("organizacion.corto_organizacion")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="corto_organizacion"
                    value={corto_organizacion}
                    onChange={(e) => setCorto_organizacion(e.target.value)}
                    onKeyUp={(e) =>
                      setCorto_organizacion(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("organizacion.domicilio")}: 
                </label>
                <InputGroup>
                  <Form.Control
                    type="domicilio"
                    id="domicilio"
                    value={domicilio}
                    onChange={(e) => setDomicilio(e.target.value)}
                    onKeyUp={(e) =>
                      setDomicilio(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("organizacion.telefono")}: 
                </label>
                <InputGroup>
                  <Form.Control
                    type="telefono"
                    id="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    onKeyUp={(e) =>
                      setTelefono(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("organizacion.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("organizacion.habilitado")}
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
                backgrounddomicilio: "green",
                borderdomicilio: "green",
              }}
            >
              {t("login.aceptar")}
            </button>
            <button
              onClick={closeModalAttach}
              className="btn btn-secondary btn-sm m-2"
              style={{
                float: "right",
                backgrounddomicilio: "#990000",
                borderdomicilio: "#990000",
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