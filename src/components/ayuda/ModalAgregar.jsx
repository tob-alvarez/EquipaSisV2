import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { alta_ayudas } from "./funciones_ayuda";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalAgregar = () => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const [id_ayuda, setId_ayuda] = useState("");
  const [nombre_ayuda, setNombre_ayuda] = useState("");
  const [texto, setTexto] = useState("");
  const [texto_en, setTexto_en] = useState("");
  const [texto_por, setTexto_por] = useState("");
  const [proceso, setProceso] = useState("");
  const [habilita, setHabilita] = useState(false);
  const { actualizador } = useContext(EquipaContext);
  
  const limpia_campos = () => {
    setId_ayuda("");
    setNombre_ayuda("");
    setTexto("");
    setTexto_en("");
    setTexto_por("");
    setProceso("");
    setHabilita(false);
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };
  const acepta_accion = () => {
    const datos_cambios = {
      id_ayuda: id_ayuda,
      nombre_ayuda: nombre_ayuda,
      texto: texto,
      texto_en: texto_en,
      texto_por: texto_por,
      proceso: proceso,
      habilita: habilita === true ? "1" : "0",
    };

    if (nombre_ayuda === "" || texto === "" || texto_en === "" || texto_por === "" || proceso === "") {
      toast.error(`${t("ayuda.datoObligatorio")}`);
      return;
    }
    

    alta_ayudas(datos_cambios).then((respuesta_accion) => {
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
          {t("ayuda.agregarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("ayuda.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("ayuda.nombre-ayuda")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_ayuda"
                    value={nombre_ayuda}
                    onChange={(e) => setNombre_ayuda(e.target.value)}
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("ayuda.texto")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    id="texto"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("ayuda.texto_en")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    id="texto_en"
                    value={texto_en}
                    onChange={(e) => setTexto_en(e.target.value)}
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("ayuda.texto_por")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    id="texto_por"
                    value={texto_por}
                    onChange={(e) => setTexto_por(e.target.value)}
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("ayuda.proceso")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="proceso"
                    value={proceso}
                    onChange={(e) => setProceso(e.target.value)}
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("ayuda.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("ayuda.habilitado")}
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