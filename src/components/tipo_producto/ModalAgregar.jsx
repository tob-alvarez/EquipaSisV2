import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { alta_tipo_productos } from "./funciones_tipo_producto";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalAgregar = () => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const [id_tproducto, setId_tproducto] = useState("");
  const [nombre_tproducto, setNombre_tproducto] = useState("");
  const [id_categoria, setId_categoria] = useState("");
  const [habilita, setHabilita] = useState(false);
  const { actualizador, traerCategorias, categorias } = useContext(EquipaContext);
  
  const limpia_campos = () => {
    setId_tproducto("");
    setNombre_tproducto("");
    setId_categoria("");
    setHabilita(false);
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };
  const acepta_accion = () => {
    const datos_cambios = {
      id_tproducto: id_tproducto,
      nombre_tproducto: nombre_tproducto,
      id_categoria: id_categoria,
      habilita: habilita === true ? "1" : "0",
    };

    if (nombre_tproducto === "" || id_categoria === "" ) {
      toast.error(`${t("tipo_producto.datoObligatorio")}`);
      return;
    }
    

    alta_tipo_productos(datos_cambios).then((respuesta_accion) => {
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
    traerCategorias({tarea: "combo_categoria"})
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
          {t("tipo_producto.agregarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("tipo_producto.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("tipo_producto.nombre-tproducto")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_tproducto"
                    value={nombre_tproducto}
                    onChange={(e) => setNombre_tproducto(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_tproducto(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("tipo_producto.nombre_categoria")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_categoria"
                    value={id_categoria}
                    onChange={(e) => setId_categoria(e.target.value)}
                    onKeyUp={(e) => setId_categoria(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("tipo_producto.seleccione_categoria")}</option>
                    
                    {categorias?.map((o) => (
                      <option key={o.id_categoria} value={o.id_categoria}>
                        {o.nombre_categoria}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("tipo_producto.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("tipo_producto.habilitado")}
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