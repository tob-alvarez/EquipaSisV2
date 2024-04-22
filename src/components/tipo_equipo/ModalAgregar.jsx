import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { alta_tipo_equipos } from "./funciones_tipo_equipo";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalAgregar = () => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const [id_tequipo, setId_tequipo] = useState("");
  const [nombre_tequipo, setNombre_tequipo] = useState("");
  const [id_categoria, setId_categoria] = useState("");
  const [id_prioridad, setId_prioridad] = useState("");
  const [id_tcontrol, setId_tcontrol] = useState("");
  const [habilita, setHabilita] = useState(false);
  const { actualizador, traerCategorias, categorias, traerPrioridades, prioridades, traerTcontroles, tcontroles } = useContext(EquipaContext);
  
  const limpia_campos = () => {
    setId_tequipo("");
    setNombre_tequipo("");
    setId_categoria("");
    setId_prioridad("");
    setId_tcontrol("");
    setHabilita(false);
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };
  const acepta_accion = () => {
    const datos_cambios = {
      id_tequipo: id_tequipo,
      nombre_tequipo: nombre_tequipo,
      id_categoria: id_categoria,
      id_prioridad: id_prioridad,
      id_tcontrol: id_tcontrol,
      habilita: habilita === true ? "1" : "0",
    };

    if (nombre_tequipo === "" || id_categoria === "" || id_prioridad === "" || id_tcontrol === "") {
      toast.error(`${t("tipo_equipo.datoObligatorio")}`);
      return;
    }
    

    alta_tipo_equipos(datos_cambios).then((respuesta_accion) => {
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
    traerPrioridades({tarea: "combo_prioridad"})
    traerTcontroles({tarea: "combo_tipo_control"})
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
          {t("tipo_equipo.agregarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("tipo_equipo.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("tipo_equipo.nombre-tequipo")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_tequipo"
                    value={nombre_tequipo}
                    onChange={(e) => setNombre_tequipo(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_tequipo(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("tipo_equipo.nombre_categoria")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_categoria"
                    value={id_categoria}
                    onChange={(e) => setId_categoria(e.target.value)}
                    onKeyUp={(e) => setId_categoria(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("tipo_equipo.seleccione_categoria")}</option>
                    
                    {categorias?.map((o) => (
                      <option key={o.id_categoria} value={o.id_categoria}>
                        {o.nombre_categoria}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("tipo_equipo.nombre_prioridad")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_prioridad"
                    value={id_prioridad}
                    onChange={(e) => setId_prioridad(e.target.value)}
                    onKeyUp={(e) => setId_prioridad(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("tipo_equipo.seleccione_prioridad")}</option>
                    
                    {prioridades?.map((o) => (
                      <option key={o.id_prioridad} value={o.id_prioridad}>
                        {o.nombre_prioridad}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("tipo_equipo.nombre_tcontrol")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_tcontrol"
                    value={id_tcontrol}
                    onChange={(e) => setId_tcontrol(e.target.value)}
                    onKeyUp={(e) => setId_tcontrol(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("tipo_equipo.seleccione_tcontrol")}</option>
                    
                    {tcontroles?.map((o) => (
                      <option key={o.id_tcontrol} value={o.id_tcontrol}>
                        {o.nombre_tcontrol}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("tipo_equipo.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("tipo_equipo.habilitado")}
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