/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { cambia_categorias } from "./funciones_categoria";
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";

const ModalEditar = ({dato}) => {
    const [t] = useTranslation("global")
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [id_categoria, setId_categoria] = useState("");
    const [nombre_categoria, setNombre_categoria] = useState("");
    const [habilita, setHabilita] = useState(false);

    useEffect(() => {
      if (isModalEditOpen && dato) {
        if (dato.habilita == 1) {
          setHabilita(true);
        } else {
          setHabilita(false);
        }
        setNombre_categoria(dato.nombre_categoria);
        console.log(dato)
      }
    }, [isModalEditOpen, dato]);

    const limpia_campos = () => {
      setId_categoria("");
      setNombre_categoria("");
      setHabilita(false);
    };
    const closeModalEdit = () => {
      limpia_campos();
      setIsModalEditOpen(false);
    };
    const acepta_categoria = () => {
      const datos_cambios = {
        id_categoria: dato.id_categoria,
        nombre_categoria: nombre_categoria,
        habilita: habilita === true ? "1" : "0",
      };
      console.log(datos_cambios)
      if (nombre_categoria == "") {
        toast.info(`${t("categoria.datoObligatorio")}`);
        return;
      }
  
      cambia_categorias(datos_cambios).then((respuesta_categoria) => {
        if (respuesta_categoria[0].registros > 0) {
          toast.success(`Categoria editada correctamente`, {
            duration: 3000,
          });
          limpia_campos()
        } else {
          toast.error(`${respuesta_categoria[0].Mensage}`, {
            duration: 3000,
            className: "bg-success text-white fs-6",
          });
        }
        setIsModalEditOpen(false);
      });
    }
  return (
    <>
    <ToastContainer position="bottom-right"/>
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
          {t("categoria.editarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("categoria.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("categoria.nombre-categoria")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_categoria"
                    value={nombre_categoria}
                    onChange={(e) => setNombre_categoria(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_categoria(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                <p>{t("categoria.habilitado")}</p>
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("categoria.habilitado")}
                  onChange={(e) => setHabilita(e.target.checked)}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="justify-content-center mt-2">
            <button
              onClick={acepta_categoria}
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
          sx={{ fontSize: '30px' }}
          style={{ cursor: "pointer" }} />
    </>
  )
}

export default ModalEditar