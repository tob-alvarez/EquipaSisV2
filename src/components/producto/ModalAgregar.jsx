import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { alta_productos } from "./funciones_producto";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalAgregar = () => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const [id_producto, setId_producto] = useState("");
  const [nombre_producto, setNombre_producto] = useState("");
  const [serie_producto, setSerie_producto] = useState("");
  const [detalle, setDetalle] = useState("");
  const [id_organizacion, setId_organizacion] = useState("");
  const [id_servicio, setId_servicio] = useState("");
  const [id_categoria, setId_categoria] = useState("");
  const [habilita, setHabilita] = useState(false);
  const { actualizador, traerOrganizaciones, organizaciones, traerServicios, servicios, traerCategorias, categorias } = useContext(EquipaContext);
  
  const limpia_campos = () => {
    setId_producto("");
    setNombre_producto("");
    setSerie_producto("");
    setDetalle("");
    setId_organizacion("");
    setId_servicio("");
    setId_categoria("");
    setHabilita(false);
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };
  const acepta_accion = () => {
    const datos_cambios = {
      id_producto: id_producto,
      nombre_producto: nombre_producto,
      serie_producto: serie_producto,
      detalle: detalle,
      id_organizacion: id_organizacion,
      id_servicio: id_servicio,
      id_categoria: id_categoria,
      habilita: habilita === true ? "1" : "0",
    };

    if (nombre_producto === "" || id_servicio === "" || id_organizacion === "" || id_categoria === "") {
      toast.error(`${t("producto.datoObligatorio")}`);
      return;
    }
    

    alta_productos(datos_cambios).then((respuesta_accion) => {
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
    traerOrganizaciones({tarea: "combo_organizacion"})
    traerServicios({tarea: "combo_servicio"})
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
          {t("producto.agregarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("producto.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("producto.nombre-producto")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_producto"
                    value={nombre_producto}
                    onChange={(e) => setNombre_producto(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_producto(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("producto.serie_producto")}: 
                </label>
                <InputGroup>
                  <Form.Control
                    id="serie_producto"
                    value={serie_producto}
                    onChange={(e) => setSerie_producto(e.target.value)}
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("producto.detalle")}: 
                </label>
                <InputGroup>
                  <Form.Control
                    id="detalle"
                    value={detalle}
                    onChange={(e) => setDetalle(e.target.value)}
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("producto.id_organizacion")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_organizacion"
                     value={id_organizacion}
                     onChange={(e) => setId_organizacion(e.target.value)}
                     onKeyUp={(e) => setId_organizacion(e.target.value.toUpperCase())}
                     className="mb-2"
                  >
                    <option value="">{t("producto.seleccione_organizacion")}</option>
                    
                    {organizaciones?.map((o) => (
                      <option key={o.id_organizacion} value={o.id_organizacion}>
                       {o.nombre_organizacion}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>


              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("producto.id_servicio")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_servicio"
                    value={id_servicio}
                    onChange={(e) => setId_servicio(e.target.value)}
                    onKeyUp={(e) => setId_servicio(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("producto.seleccione_servicio")}</option>
                    
                    {servicios?.map((o) => (
                      <option key={o.id_servicio} value={o.id_servicio}>
                      {o.nombre_servicio}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("producto.id_categoria")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_categoria"
                    value={id_categoria}
                    onChange={(e) => setId_categoria(e.target.value)}
                    onKeyUp={(e) => setId_categoria(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("producto.seleccione_categoria")}</option>
                    
                    {categorias?.map((o) => (
                      <option key={o.id_categoria} value={o.id_categoria}>
                        {o.nombre_categoria}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("producto.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("producto.habilitado")}
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