import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { alta_personas } from "./funciones_persona";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalAgregar = () => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const [id_persona, setId_persona] = useState("");
  const [nombre_persona, setNombre_persona] = useState("");
  const [corto_persona, setCorto_persona] = useState("");
  const [domicilio_persona, setDomicilio_persona] = useState("");
  const [localidad_persona, setLocalidad_persona] = useState("");
  const [id_pais, setId_pais] = useState("");
  const [id_provincia, setId_provincia] = useState("");
  const [telefono_persona, setTelefono_persona] = useState("");
  const [email_persona, setEmail_persona] = useState("");
  const [id_empresa, setId_empresa] = useState("");
  const [id_tpersona, setId_tpersona] = useState("");
  const [adjunto, setAdjunto] = useState(false);
  const [es_usuario, setEs_usuario] = useState(false);
  const [habilita, setHabilita] = useState(false);
  const { actualizador, traerPaises, paises, traerProvincias, provincias, traerEmpresas, empresas, traerTpersonas, tpersonas } = useContext(EquipaContext);
  
  const limpia_campos = () => {
    setId_persona("");
    setNombre_persona("");
    setCorto_persona("");
    setDomicilio_persona("");
    setLocalidad_persona("");
    setId_pais("");
    setId_provincia("");
    setTelefono_persona("");
    setEmail_persona("");
    setId_empresa("");
    setId_tpersona("");
    setAdjunto(false);
    setEs_usuario(false);
    setHabilita(false);
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };
  const acepta_accion = () => {
    const datos_cambios = {
      id_persona: id_persona,
      nombre_persona: nombre_persona,
      corto_persona: corto_persona,
      domicilio_persona: domicilio_persona,
      localidad_persona: localidad_persona,
      id_pais: id_pais,
      id_provincia: id_provincia,
      telefono_persona: telefono_persona,
      email_persona: email_persona,
      id_empresa: id_empresa,
      id_tpersona: id_tpersona,
      adjunto: adjunto === true ? "1" : "0",
      es_usuario: es_usuario === true ? "1" : "0",
      habilita: habilita === true ? "1" : "0",
    };

    if (nombre_persona === "" || email_persona === "" || id_pais === "" || id_provincia === "" || id_empresa === "" || id_tpersona === "") {
      toast.error(`${t("persona.datoObligatorio")}`);
      return;
    }
    

    alta_personas(datos_cambios).then((respuesta_accion) => {
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
    traerPaises({tarea: "combo_pais"})
    traerProvincias({tarea: "combo_provincia"})
    traerEmpresas({tarea: "combo_empresa"})
    traerTpersonas({tarea: "combo_tipo_persona"})
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
          {t("persona.agregarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("persona.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("persona.nombre-persona")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_persona"
                    value={nombre_persona}
                    onChange={(e) => setNombre_persona(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_persona(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("persona.corto_persona")}: 
                </label>
                <InputGroup>
                  <Form.Control
                    id="corto_persona"
                    value={corto_persona}
                    onChange={(e) => setCorto_persona(e.target.value)}
                    onKeyUp={(e) =>
                      setCorto_persona(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("persona.domicilio_persona")}: 
                </label>
                <InputGroup>
                  <Form.Control
                    id="domicilio_persona"
                    value={domicilio_persona}
                    onChange={(e) => setDomicilio_persona(e.target.value)}
                    onKeyUp={(e) =>
                      setDomicilio_persona(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("persona.localidad_persona")}: 
                </label>
                <InputGroup>
                  <Form.Control
                    id="localidad_persona"
                    value={localidad_persona}
                    onChange={(e) => setLocalidad_persona(e.target.value)}
                    onKeyUp={(e) =>
                      setLocalidad_persona(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("persona.nombre_pais")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_pais"
                    value={id_pais}
                    onChange={(e) => setId_pais(e.target.value)}
                    onKeyUp={(e) => setId_pais(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("persona.seleccione_pais")}</option>
                    
                    {paises?.map((o) => (
                      <option key={o.id_pais} value={o.id_pais}>
                        {o.nombre_pais}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("persona.nombre_provincia")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_provincia"
                    value={id_provincia}
                    onChange={(e) => setId_provincia(e.target.value)}
                    onKeyUp={(e) => setId_provincia(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("persona.seleccione_provincia")}</option>
                    
                    {provincias?.map((o) => (
                      <option key={o.id_provincia} value={o.id_provincia}>
                        {o.nombre_provincia}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("persona.telefono_persona")}: 
                </label>
                <InputGroup>
                  <Form.Control
                    id="telefono_persona"
                    value={telefono_persona}
                    onChange={(e) => setTelefono_persona(e.target.value)}
                    onKeyUp={(e) =>
                      setTelefono_persona(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("persona.email_persona")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="email_persona"
                    value={email_persona}
                    onChange={(e) => setEmail_persona(e.target.value)}
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("persona.nombre_empresa")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_empresa"
                    value={id_empresa}
                    onChange={(e) => setId_empresa(e.target.value)}
                    onKeyUp={(e) => setId_empresa(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("persona.seleccione_empresa")}</option>
                    
                    {empresas?.map((o) => (
                      <option key={o.id_empresa} value={o.id_empresa}>
                        {o.nombre_empresa}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("persona.nombre_tpersona")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_tpersona"
                    value={id_tpersona}
                    onChange={(e) => setId_tpersona(e.target.value)}
                    onKeyUp={(e) => setId_tpersona(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("persona.seleccione_tpersona")}</option>
                    
                    {tpersonas?.map((o) => (
                      <option key={o.id_tpersona} value={o.id_tpersona}>
                        {o.nombre_tpersona}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("persona.adjunto")}
                <Switch 
                  id={"adjunto"}
                  checked={adjunto}
                  label={t("persona.adjunto")}
                  onChange={(e) => setAdjunto(e.target.checked)}
                />
              </div>

              <div className="col-6 text-start">
                {t("persona.es_usuario")}
                <Switch 
                  id={"es_usuario"}
                  checked={es_usuario}
                  label={t("persona.es_usuario")}
                  onChange={(e) => setEs_usuario(e.target.checked)}
                />
              </div>

              <div className="col-6 text-start">
                {t("persona.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("persona.habilitado")}
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