import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { toast } from "react-toastify";
import { cambia_usuarios } from "./funciones_usuario";
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";


const ModalEditar = ({dato}) => {
    const [t] = useTranslation("global")
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [id_usuario, setId_usuario] = useState("");
    const [id_persona, setId_persona] = useState("");
    const [id_tusuario, setId_tusuario] = useState("");
    const [clave, setClave] = useState("");
    const [habilita, setHabilita] = useState(false);
    const { actualizador, traerPersonas, personas, traerTusuarios, usuarios } = useContext(EquipaContext);
  

    useEffect(() => {
      if (isModalEditOpen && dato) {
        if (dato.habilita == 1) {
          setHabilita(true);
        } else {
          setHabilita(false);
        }
        setId_persona(dato.id_persona);
        setId_tusuario(dato.id_tusuario);
        setClave(dato.clave);
      }
    }, [isModalEditOpen, dato]);
    
    useEffect(() => {
      traerPersonas({tarea: "combo_persona"})
      traerTusuarios({tarea: "combo_tusuario"})
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const limpia_campos = () => {
      setId_usuario("");
      setId_persona("");
      setId_tusuario("");
      setClave("");
      setHabilita(false);
    };
    const closeModalEdit = () => {
      limpia_campos();
      setIsModalEditOpen(false);
    };
    
    const acepta_accion = () => {
      const datos_cambios = {
        id_usuario: dato.id_usuario,
        id_persona: id_persona,
        id_tusuario: id_tusuario,
        clave: clave,
        habilita: habilita === true ? "1" : "0",
      };
      if (id_persona == "" || id_tusuario == "" || clave == "") {
        toast.info(`${t("usuario.datoObligatorio")}`);
        return;
      }
      
      cambia_usuarios(datos_cambios).then((respuesta_accion) => {
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
          {t("usuario.editarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("usuario.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("usuario.nombre-persona")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_persona"
                    value={id_persona}
                    onChange={(e) => setId_persona(e.target.value)}
                    onKeyUp={(e) => setId_persona(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("usuario.seleccione_persona")}</option>
                    
                    {personas?.map((o) => (
                      <option key={o.id_persona} value={o.id_persona}>
                        {o.nombre_persona}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                  {t("usuario.nombre_tusuario")}: #
                </label>
                <InputGroup>
                  <Form.Select
                    id="id_tusuario"
                    value={id_tusuario}
                    onChange={(e) => setId_tusuario(e.target.value)}
                    onKeyUp={(e) => setId_tusuario(e.target.value.toUpperCase())}
                    className="mb-2"
                  >
                    <option value="">{t("usuario.seleccione_tusuario")}</option>
                    
                    {usuarios?.map((o) => (
                      <option key={o.id_tusuario} value={o.id_tusuario}>
                        {o.nombre_tusuario}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("usuario.clave")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="clave"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    onKeyUp={(e) =>
                      setClave(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("usuario.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("usuario.habilitado")}
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