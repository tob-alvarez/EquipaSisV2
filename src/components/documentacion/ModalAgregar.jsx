import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { alta_documentaciones } from "./funciones_documentacion";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalAgregar = () => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const [id_documentacion, setId_documentacion] = useState("");
  const [nombre_documentacion, setNombre_documentacion] = useState("");
  const [corto_documentacion, setCorto_documentacion] = useState("");
  const [id_tarchivo, setId_tarchivo] = useState("");
  const [habilita, setHabilita] = useState(false);
  const { actualizador, traerTarchivos, tarchivos } = useContext(EquipaContext);
  
  const limpia_campos = () => {
    setId_documentacion("");
    setNombre_documentacion("");
    setCorto_documentacion("");
    setId_tarchivo("");
    setHabilita(false);
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };
  const acepta_accion = () => {
    const datos_cambios = {
      id_documentacion: id_documentacion,
      nombre_documentacion: nombre_documentacion,
      corto_documentacion: corto_documentacion,
      id_tarchivo: id_tarchivo,
      habilita: habilita === true ? "1" : "0",
    };

    if (nombre_documentacion === "" || corto_documentacion === "" || id_tarchivo === "") {
      toast.error(`${t("documentacion.datoObligatorio")}`);
      return;
    }
    

    alta_documentaciones(datos_cambios).then((respuesta_accion) => {
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
          {t("documentacion.agregarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("documentacion.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("documentacion.nombre-documentacion")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_documentacion"
                    value={nombre_documentacion}
                    onChange={(e) => setNombre_documentacion(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_documentacion(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("documentacion.corto_documentacion")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="corto_documentacion"
                    value={corto_documentacion}
                    onChange={(e) => setCorto_documentacion(e.target.value)}
                    onKeyUp={(e) =>
                      setCorto_documentacion(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("documentacion.id_tarchivo")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_tarchivo"
                    value={id_tarchivo}
                    onChange={(e) => setId_tarchivo(e.target.value)}
                    onKeyUp={(e) => setId_tarchivo(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("documentacion.seleccione_tarchivo")}</option>
                    
                    {tarchivos?.map((o) => (
                      <option key={o.id_tarchivo} value={o.id_tarchivo}>
                        {o.nombre_tarchivo}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("documentacion.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("documentacion.habilitado")}
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