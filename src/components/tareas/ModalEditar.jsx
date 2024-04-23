/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { toast } from "react-toastify";
import { cambia_tareas } from "./funciones_tareas";
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";


const ModalEditar = ({dato}) => {
    const [t] = useTranslation("global")
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [id_tarea, setId_tarea] = useState("");
    const [nombre_tarea, setNombre_tarea] = useState("");
    const [id_ttarea, setId_ttarea] = useState("");
    const [repara, setRepara] = useState(false);
    const [down, setDown] = useState(false);
    const [restringido, setRestringido] = useState(false);
    const [preventivo, setPreventivo] = useState(false);
    const [externo, setExterno] = useState(false);
    const [habilita, setHabilita] = useState(false);
    const { actualizador, traerTtareas, ttareas } = useContext(EquipaContext);

    useEffect(() => {
      if (isModalEditOpen && dato) {
        if (dato.repara == 1) {
          setRepara(true);
        } else {
          setRepara(false);
        }
        if (dato.down == 1) {
          setDown(true);
        } else {
          setDown(false);
        }
        if (dato.restringido == 1) {
          setRestringido(true);
        } else {
          setRestringido(false);
        }
        if (dato.preventivo == 1) {
          setPreventivo(true);
        } else {
          setPreventivo(false);
        }
        if (dato.externo == 1) {
          setExterno(true);
        } else {
          setExterno(false);
        }
        if (dato.habilita == 1) {
          setHabilita(true);
        } else {
          setHabilita(false);
        }
        setNombre_tarea(dato.nombre_tarea);
        setId_ttarea(dato.id_ttarea);
      }
    }, [isModalEditOpen, dato]);
    
    useEffect(() => {
      traerTtareas({tarea: "combo_tipo_tarea"})
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const limpia_campos = () => {
      setId_tarea("");
      setNombre_tarea("");
      setId_ttarea("");
      setRepara(false);
      setDown(false);
      setRestringido(false);
      setPreventivo(false);
      setExterno(false);
      setHabilita(false);
    };
    const closeModalEdit = () => {
      limpia_campos();
      setIsModalEditOpen(false);
    };
    
    const acepta_accion = () => {
      const datos_cambios = {
        id_tarea: dato.id_tarea,
        nombre_tarea: nombre_tarea,
        id_ttarea: id_ttarea,
        repara: repara === true ? "1" : "0",
        down: down === true ? "1" : "0",
        restringido: restringido === true ? "1" : "0",
        preventivo: preventivo === true ? "1" : "0",
        externo: externo === true ? "1" : "0",
        habilita: habilita === true ? "1" : "0",
      };
      if (nombre_tarea == "" || id_ttarea == "" ) {
        toast.info(`${t("tarea.datoObligatorio")}`);
        return;
      }
      
      cambia_tareas(datos_cambios).then((respuesta_accion) => {
        if (respuesta_accion[0].registros > 0) {
          toast.success(`${t("varios.editado")}`, {
            duration: 1500,
          });
          limpia_campos()
          actualizador()
        } else {
          toast.error(`${respuesta_accion[0].Mensage}`, {
            duration: 1500,
            className: "bg-success text-white fs-6",
          });
        }
        setIsModalEditOpen(false);
      });
    }
    

  return (
    <>
      <Modal
        show={isModalEditOpen}
        onHide={closeModalEdit}
        size="lg"
        backdrop="static"
        centered
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
          {t("tarea.editarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("tarea.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("tarea.nombre-tarea")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_tarea"
                    value={nombre_tarea}
                    onChange={(e) => setNombre_tarea(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_tarea(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>
              
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("tarea.nombre_ttarea")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_ttarea"
                    value={id_ttarea}
                    onChange={(e) => setId_tarea(e.target.value)}
                    onKeyUp={(e) => setId_tarea(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("tarea.seleccione_ttarea")}</option>
                    
                    {ttareas?.map((o) => (
                      <option key={o.id_ttarea} value={o.id_ttarea}>
                        {o.nombre_ttarea}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("tarea.repara")}
                <Switch 
                  id={"repara"}
                  checked={repara}
                  label={t("tarea.repara")}
                  onChange={(e) => setRepara(e.target.checked)}
                />
              </div>

              <div className="col-6 text-start">
                {t("tarea.down")}
                <Switch 
                  id={"down"}
                  checked={down}
                  label={t("tarea.down")}
                  onChange={(e) => setDown(e.target.checked)}
                />
              </div>

              <div className="col-6 text-start">
                {t("tarea.restringido")}
                <Switch 
                  id={"restringido"}
                  checked={restringido}
                  label={t("tarea.restringido")}
                  onChange={(e) => setRestringido(e.target.checked)}
                />
              </div>

              <div className="col-6 text-start">
                {t("tarea.preventivo")}
                <Switch 
                  id={"preventivo"}
                  checked={preventivo}
                  label={t("tarea.preventivo")}
                  onChange={(e) => setPreventivo(e.target.checked)}
                />
              </div>

              <div className="col-6 text-start">
                {t("tarea.externo")}
                <Switch 
                  id={"externo"}
                  checked={externo}
                  label={t("tarea.externo")}
                  onChange={(e) => setExterno(e.target.checked)}
                />
              </div>

              <div className="col-6 text-start">
                {t("tarea.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("tarea.habilitado")}
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
              onClick={closeModalEdit}
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
      
        <EditIcon
          onClick={() => setIsModalEditOpen(true)}
          sx={{ fontSize: '20px' }}
          style={{ cursor: "pointer" }} />
    </>
  )
}

export default ModalEditar