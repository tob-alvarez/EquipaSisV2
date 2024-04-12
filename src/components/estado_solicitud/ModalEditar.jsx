/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { toast } from "react-toastify";
import { cambia_estado_solicitudes } from "./funciones_estado_solicitud";
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalEditar = ({dato}) => {
    const [t] = useTranslation("global")
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [id_estado_solicitud, setId_estado_solicitud] = useState("");
    const [nombre_estado_solicitud, setNombre_estado_solicitud] = useState("");
    const [color, setColor] = useState("");
    const [habilita, setHabilita] = useState(false);
    const { actualizador } = useContext(EquipaContext);
    
    useEffect(() => {
      if (isModalEditOpen && dato) {
        if (dato.habilita == 1) {
          setHabilita(true);
        } else {
          setHabilita(false);
        }
        setNombre_estado_solicitud(dato.nombre_estado_solicitud);
        setColor(dato.color);
      }
    }, [isModalEditOpen, dato]);
    
    const limpia_campos = () => {
      setId_estado_solicitud("");
      setNombre_estado_solicitud("");
      setColor("");
      setHabilita(false);
    };
    const closeModalEdit = () => {
      limpia_campos();
      setIsModalEditOpen(false);
    };
    const acepta_accion = () => {
      const datos_cambios = {
        id_estado_solicitud: dato.id_estado_solicitud,
        nombre_estado_solicitud: nombre_estado_solicitud,
        color: color,
        habilita: habilita === true ? "1" : "0",
      };
      if (nombre_estado_solicitud == "" || color == "") {
        toast.info(`${t("estado_solicitud.datoObligatorio")}`);
        return;
      }
  
      cambia_estado_solicitudes(datos_cambios).then((respuesta_accion) => {
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
          {t("estado_solicitud.editarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("estado_solicitud.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("estado_solicitud.nombre-estado_solicitud")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_estado_solicitud"
                    value={nombre_estado_solicitud}
                    onChange={(e) => setNombre_estado_solicitud(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_estado_solicitud(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("estado_solicitud.color")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    onKeyUp={(e) =>
                      setColor(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("estado_solicitud.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("estado_solicitud.habilitado")}
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