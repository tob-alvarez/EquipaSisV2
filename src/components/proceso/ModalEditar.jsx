/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { toast } from "react-toastify";
import { cambia_procesos } from "./funciones_proceso";
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalEditar = ({dato}) => {
    const [t] = useTranslation("global")
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [id_proceso, setId_proceso] = useState("");
    const [nombre_proceso, setNombre_proceso] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [descripcion_en, setDescripcion_en] = useState("");
    const [descripcion_por, setDescripcion_por] = useState("");
    const [id_opcion, setId_opcion] = useState("");
    const [habilita, setHabilita] = useState(false);
    const { actualizador, traerOpciones, opciones } = useContext(EquipaContext);
    
    useEffect(() => {
      if (isModalEditOpen && dato) {
        if (dato.habilita == 1) {
          setHabilita(true);
        } else {
          setHabilita(false);
        }
        setNombre_proceso(dato.nombre_proceso);
        setDescripcion(dato.descripcion);
        setDescripcion_en(dato.descripcion_en);
        setDescripcion_por(dato.descripcion_por);
        setId_opcion(dato.id_opcion);
      }
    }, [isModalEditOpen, dato]);

    useEffect(() => {
      traerOpciones({tarea: "combo_opcion"})
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const limpia_campos = () => {
      setId_proceso("");
      setNombre_proceso("");
      setDescripcion("");
      setDescripcion_en("");
      setDescripcion_por("");
      setId_opcion("");
      setHabilita(false);
    };
    const closeModalEdit = () => {
      limpia_campos();
      setIsModalEditOpen(false);
    };
    const acepta_accion = () => {
      const datos_cambios = {
        id_proceso: dato.id_proceso,
        nombre_proceso: nombre_proceso,
        descripcion: descripcion,
        descripcion_en: descripcion_en,
        descripcion_por: descripcion_por,
        id_opcion: id_opcion,
        habilita: habilita === true ? "1" : "0",
      };
      if (nombre_proceso == "" || descripcion == "" || descripcion_en == "" || descripcion_por == "" || id_opcion == "") {
        toast.info(`${t("proceso.datoObligatorio")}`);
        return;
      }
  
      cambia_procesos(datos_cambios).then((respuesta_accion) => {
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
          {t("proceso.editarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("proceso.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("proceso.nombre-proceso")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_proceso"
                    value={nombre_proceso}
                    onChange={(e) => setNombre_proceso(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_proceso(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("proceso.descripcion")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    onKeyUp={(e) =>
                      setDescripcion(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("proceso.descripcion_en")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="descripcion_en"
                    value={descripcion_en}
                    onChange={(e) => setDescripcion_en(e.target.value)}
                    onKeyUp={(e) =>
                      setDescripcion_en(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("proceso.descripcion_por")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="descripcion_por"
                    value={descripcion_por}
                    onChange={(e) => setDescripcion_por(e.target.value)}
                    onKeyUp={(e) =>
                      setDescripcion_por(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("proceso.id_opcion")}: #
                </label>
                <InputGroup>
                <Form.Select
                    id="id_opcion"
                    value={id_opcion}
                    onChange={(e) => setId_opcion(e.target.value)}
                    onKeyUp={(e) => setId_opcion(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("proceso.seleccione_opcion")}</option>

                    {opciones?.map((o) => (
                      <option key={o.id_opcion} value={o.id_opcion}>
                        {o.nombre_opcion}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("proceso.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("proceso.habilitado")}
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