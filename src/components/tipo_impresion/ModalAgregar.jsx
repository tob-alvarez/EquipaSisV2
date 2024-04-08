import { useContext, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { alta_tipo_impresiones } from "./funciones_tipo_impresion";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalAgregar = () => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const [id_timpresion, setId_timpresion] = useState("");
  const [nombre_timpresion, setNombre_timpresion] = useState("");
  const [habilita, setHabilita] = useState(false);
  const { actualizador } = useContext(EquipaContext);
  const limpia_campos = () => {
    setId_timpresion("");
    setNombre_timpresion("");
    setHabilita(false);
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };
  const acepta_accion = () => {
    const datos_cambios = {
      id_timpresion: id_timpresion,
      nombre_timpresion: nombre_timpresion,
      habilita: habilita === true ? "1" : "0",
    };

    if (nombre_timpresion === "") {
      toast.error(`${t("tipo_impresion.datoObligatorio")}`);
      return;
    }
    

    alta_tipo_impresiones(datos_cambios).then((respuesta_accion) => {
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
          {t("tipo_impresion.agregarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("tipo_impresion.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("tipo_impresion.nombre-timpresion")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_timpresion"
                    value={nombre_timpresion}
                    onChange={(e) => setNombre_timpresion(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_timpresion(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("tipo_impresion.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("tipo_impresion.habilitado")}
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