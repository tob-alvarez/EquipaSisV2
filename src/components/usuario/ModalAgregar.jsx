import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { alta_usuarios } from "./funciones_usuario";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalAgregar = () => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const [id_usuario, setId_usuario] = useState("");
  const [id_persona, setId_persona] = useState("");
  const [id_tusuario, setId_tusuario] = useState("");
  const [clave, setClave] = useState("");
  const [habilita, setHabilita] = useState(false);
  const { actualizador, traerPersonas, personas, traerTusuarios, tusuarios } = useContext(EquipaContext);
  
  const limpia_campos = () => {
    setId_usuario("");
    setId_persona("");
    setId_tusuario("");
    setClave("");
    setHabilita(false);
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };
  const acepta_accion = () => {
    const datos_cambios = {
      id_usuario: id_usuario,
      id_persona: id_persona,
      id_tusuario: id_tusuario,
      clave: clave,
      habilita: habilita === true ? "1" : "0",
    };

    if (id_persona === "" || id_tusuario === "" || clave === "") {
      toast.error(`${t("usuario.datoObligatorio")}`);
      return;
    }
    

    alta_usuarios(datos_cambios).then((respuesta_accion) => {
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
    traerTusuarios({tarea: "combo_tipo_usuario"})
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
          {t("usuario.agregarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("usuario.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("usuario.nombre-persona")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_persona"
                    value={id_persona}
                    onChange={(e) => setId_persona(e.target.value)}
                    onKeyUp={(e) => setId_persona(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("usuario.seleccione_persona")}</option>
                    
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
                  {t("usuario.nombre_tusuario")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_tusuario"
                    value={id_tusuario}
                    onChange={(e) => setId_tusuario(e.target.value)}
                    onKeyUp={(e) => setId_tusuario(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("usuario.seleccione_tusuario")}</option>
                    
                    {tusuarios?.map((o) => (
                      <option key={o.id_tusuario} value={o.id_tusuario}>
                        {o.nombre_tusuario}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("usuario.clave")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="clave"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("usuario.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("usuario.habilitado")}
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