import { useContext, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { alta_tipo_controles } from "./funciones_tipo_control";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalAgregar = () => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const [id_tcontrol, setId_tcontrol] = useState("");
  const [nombre_tcontrol, setNombre_tcontrol] = useState("");
  const [unidad, setUnidad] = useState("");
  const [habilita, setHabilita] = useState(false);
  const { actualizador } = useContext(EquipaContext);
  const limpia_campos = () => {
    setId_tcontrol("");
    setNombre_tcontrol("");
    setUnidad("");
    setHabilita(false);
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };
  const acepta_accion = () => {
    const datos_cambios = {
      id_tcontrol: id_tcontrol,
      nombre_tcontrol: nombre_tcontrol,
      unidad: unidad,
      habilita: habilita === true ? "1" : "0",
    };

    if (nombre_tcontrol === "" || unidad === "") {
      toast.error(`${t("tipo_control.datoObligatorio")}`);
      return;
    }
    

    alta_tipo_controles(datos_cambios).then((respuesta_accion) => {
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
          {t("tipo_control.agregarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("tipo_control.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("tipo_control.nombre-tcontrol")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_tcontrol"
                    value={nombre_tcontrol}
                    onChange={(e) => setNombre_tcontrol(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_tcontrol(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("tipo_control.unidad")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="unidad"
                    value={unidad}
                    onChange={(e) => setUnidad(e.target.value)}
                    onKeyUp={(e) =>
                      setUnidad(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("tipo_control.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("tipo_control.habilitado")}
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