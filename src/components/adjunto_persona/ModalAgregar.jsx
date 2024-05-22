import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { alta_adjunto_personas } from "./funciones_adjunto_persona";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalAgregar = () => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const [id_adjunto_persona, setId_adjunto_persona] = useState("");
  const [id_persona, setId_persona] = useState("");
  const [id_tadjunto, setId_tadjunto] = useState("");
  const [id_tarchivo, setId_tarchivo] = useState("");
  const [nombre_archivo, setNombre_archivo] = useState("");
  const [habilita, setHabilita] = useState(false);
  const { actualizador, traerPersonas, personas, traerTadjuntos, tadjuntos, traerTarchivos, tarchivos } = useContext(EquipaContext);
  
  const limpia_campos = () => {
    setId_adjunto_persona("");
    setId_persona("");
    setId_tadjunto("");
    setId_tarchivo("");
    setNombre_archivo("");
    setHabilita(false);
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };
  const acepta_accion = () => {
    const datos_cambios = {
      id_adjunto_persona: id_adjunto_persona,
      id_persona: id_persona,
      id_tadjunto: id_tadjunto,
      id_tarchivo: id_tarchivo,
      nombre_archivo: nombre_archivo,
      habilita: habilita === true ? "1" : "0",
    };

    if (id_persona === "" || nombre_archivo === "" || id_tarchivo === "" || id_tadjunto === "") {
      toast.error(`${t("adjunto_persona.datoObligatorio")}`);
      return;
    }
    

    alta_adjunto_personas(datos_cambios).then((respuesta_accion) => {
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
    traerPersonas({tarea: "combo_persona"})
    traerTadjuntos({tarea: "combo_tipo_adjunto"})
    traerTarchivos({tarea: "combo_tipo_archivo"})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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
          {t("adjunto_persona.agregarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("adjunto_persona.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">

            <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("adjunto_persona.nombre_persona")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_persona"
                    value={id_persona}
                    onChange={(e) => setId_persona(e.target.value)}
                    onKeyUp={(e) => setId_persona(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("adjunto_persona.seleccione_persona")}</option>
                    
                    {personas?.map((o) => (
                      <option key={o.id_persona} value={o.id_persona}>
                        {o.nombre_persona}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("adjunto_persona.nombre_tadjunto")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_tadjunto"
                    value={id_tadjunto}
                    onChange={(e) => setId_tadjunto(e.target.value)}
                    onKeyUp={(e) => setId_tadjunto(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("adjunto_persona.seleccione_tadjunto")}</option>
                    
                    {tadjuntos?.map((o) => (
                      <option key={o.id_tadjunto} value={o.id_tadjunto}>
                        {o.nombre_tadjunto}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("adjunto_persona.nombre_tarchivo")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_tarchivo"
                    value={id_tarchivo}
                    onChange={(e) => setId_tarchivo(e.target.value)}
                    onKeyUp={(e) => setId_tarchivo(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("adjunto_persona.seleccione_tarchivo")}</option>
                    
                    {tarchivos?.map((o) => (
                      <option key={o.id_tarchivo} value={o.id_tarchivo}>
                        {o.nombre_tarchivo}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("adjunto_persona.nombre_archivo")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_archivo"
                    value={nombre_archivo}
                    onChange={(e) => setNombre_archivo(e.target.value)}
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("adjunto_persona.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("adjunto_persona.habilitado")}
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