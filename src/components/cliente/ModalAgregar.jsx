import { useContext, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { alta_clientes } from "./funciones_cliente";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalAgregar = () => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const [id_cliente, setId_cliente] = useState("");
  const [nombre_cliente, setNombre_cliente] = useState("");
  const [base_datos, setBase_datos] = useState("");
  const [host, setHost] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [habilita, setHabilita] = useState(false);
  const { actualizador } = useContext(EquipaContext);
  const limpia_campos = () => {
    setId_cliente("");
    setNombre_cliente("");
    setBase_datos("");
    setHost("");
    setUser("");
    setPass("");
    setHabilita(false);
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };
  const acepta_accion = () => {
    const datos_cambios = {
      id_cliente: id_cliente,
      nombre_cliente: nombre_cliente,
      base_datos: base_datos,
      host: host,
      user: user,
      pass: pass,
      habilita: habilita === true ? "1" : "0",
    };

    if (nombre_cliente === "" || base_datos === "" || host === "" || user === "" || pass === "" ) {
      toast.error(`${t("cliente.datoObligatorio")}`);
      return;
    }
    

    alta_clientes(datos_cambios).then((respuesta_accion) => {
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
          {t("cliente.agregarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("cliente.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("cliente.nombre-cliente")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_cliente"
                    value={nombre_cliente}
                    onChange={(e) => setNombre_cliente(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_cliente(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("cliente.base_datos")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="base_datos"
                    value={base_datos}
                    onChange={(e) => setBase_datos(e.target.value)}
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("cliente.host")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="host"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("cliente.user")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("cliente.pass")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="pass"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("cliente.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("cliente.habilitado")}
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