/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { toast } from "react-toastify";
import { cambia_acciones } from "./funciones_accion";
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";

const ModalEditar = ({dato}) => {
    const [t] = useTranslation("global")
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [id_accion, setId_accion] = useState("");
    const [nombre_accion, setNombre_accion] = useState("");
    const [nombre_corto_accion, setNombre_corto_accion] = useState("");
    const [habilita, setHabilita] = useState(false);
    
    useEffect(() => {
      if (isModalEditOpen && dato) {
        if (dato.habilita == 1) {
          setHabilita(true);
        } else {
          setHabilita(false);
        }
        setNombre_accion(dato.nombre_accion);
        setNombre_corto_accion(dato.corto_accion);
      }
    }, [isModalEditOpen, dato]);
    
    const limpia_campos = () => {
      setId_accion("");
      setNombre_accion("");
      setNombre_corto_accion("");
      setHabilita(false);
    };
    const closeModalEdit = () => {
      limpia_campos();
      setIsModalEditOpen(false);
    };
    const acepta_accion = () => {
      const datos_cambios = {
        id_accion: dato.id_accion,
        nombre_accion: nombre_accion,
        corto_accion: nombre_corto_accion,
        habilita: habilita === true ? "1" : "0",
      };
      console.log(datos_cambios)
      if (nombre_accion == "" || nombre_corto_accion == "") {
        toast.info(`${t("accion.datoObligatorio")}`);
        return;
      }
  
      cambia_acciones(datos_cambios).then((respuesta_accion) => {
        if (respuesta_accion[0].registros > 0) {
          toast.success(`Accion editada correctamente`, {
            duration: 1500,
          });
          limpia_campos()
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
          {t("accion.editarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("accion.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("accion.nombre-accion")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_accion"
                    value={nombre_accion}
                    onChange={(e) => setNombre_accion(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_accion(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("accion.nombre-corto")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_corto_accion"
                    value={nombre_corto_accion}
                    onChange={(e) => setNombre_corto_accion(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_corto_accion(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                <p>{t("accion.habilitado")}</p>
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("accion.habilitado")}
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
              Aceptar
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
              Cerrar
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