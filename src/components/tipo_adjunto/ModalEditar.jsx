/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { toast } from "react-toastify";
import { cambia_tipo_adjuntos } from "./funciones_tipo_adjunto";
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalEditar = ({dato}) => {
    const [t] = useTranslation("global")
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [id_tadjunto, setId_tadjunto] = useState("");
    const [nombre_tadjunto, setNombre_tadjunto] = useState("");
    const [habilita, setHabilita] = useState(false);
    const { actualizador } = useContext(EquipaContext);
    
    useEffect(() => {
      if (isModalEditOpen && dato) {
        if (dato.habilita == 1) {
          setHabilita(true);
        } else {
          setHabilita(false);
        }
        setNombre_tadjunto(dato.nombre_tadjunto);
      }
    }, [isModalEditOpen, dato]);
    
    const limpia_campos = () => {
      setId_tadjunto("");
      setNombre_tadjunto("");
      setHabilita(false);
    };
    const closeModalEdit = () => {
      limpia_campos();
      setIsModalEditOpen(false);
    };
    const acepta_accion = () => {
      const datos_cambios = {
        id_tadjunto: dato.id_tadjunto,
        nombre_tadjunto: dato.nombre_tadjunto,
        habilita: habilita === true ? "1" : "0",
      };
      if (nombre_tadjunto == "") {
        toast.info(`${t("tipo_adjunto.datoObligatorio")}`);
        return;
      }
  
      cambia_tipo_adjuntos(datos_cambios).then((respuesta_accion) => {
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
          {t("tipo_adjunto.editarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("tipo_adjunto.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("tipo_adjunto.nombre-tadjunto")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_tadjunto"
                    value={nombre_tadjunto}
                    onChange={(e) => setNombre_tadjunto(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_tadjunto(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("tipo_adjunto.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("tipo_adjunto.habilitado")}
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