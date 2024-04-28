import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { alta_organizacion_servicios } from "./funciones_organizacion_servicio";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalAgregar = () => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const [id_orga_serv, setId_orga_serv] = useState("");
  const [id_organizacion, setId_organizacion] = useState("");
  const [id_servicio, setId_servicio] = useState("");
  const [habilita, setHabilita] = useState(false);
  const { actualizador, traerOrganizaciones, organizaciones, traerServicios, servicios } = useContext(EquipaContext);
  
  const limpia_campos = () => {
    setId_orga_serv("");
    setId_organizacion("");
    setId_servicio("");
    setHabilita(false);
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };
  const acepta_accion = () => {
    const datos_cambios = {
      id_orga_serv: id_orga_serv,
      id_organizacion: id_organizacion,
      id_servicio: id_servicio,
      habilita: habilita === true ? "1" : "0",
    };

    if (id_organizacion === "" || id_servicio === "" ) {
      toast.error(`${t("organizacion_servicio.datoObligatorio")}`);
      return;
    }
    

    alta_organizacion_servicios(datos_cambios).then((respuesta_accion) => {
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
          {t("organizacion_servicio.agregarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("organizacion_servicio.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("organizacion_servicio.nombre-organizacion")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_organizacion"
                    value={id_organizacion}
                    onChange={(e) => setId_organizacion(e.target.value)}
                    onKeyUp={(e) => setId_organizacion(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("organizacion_servicio.seleccione_organizacion")}</option>
                    
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
                  {t("organizacion_servicio.nombre_servicio")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_servicio"
                    value={id_servicio}
                    onChange={(e) => setId_servicio(e.target.value)}
                    onKeyUp={(e) => setId_servicio(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("organizacion_servicio.seleccione_servicio")}</option>
                    
                    {servicios?.map((o) => (
                      <option key={o.id_servicio} value={o.id_servicio}>
                        {o.nombre_servicio}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("organizacion_servicio.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("organizacion_servicio.habilitado")}
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