/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { toast } from "react-toastify";
import { cambia_clientes } from "./funciones_cliente";
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalEditar = ({dato}) => {
    const [t] = useTranslation("global")
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [id_cliente, setId_cliente] = useState("");
    const [nombre_cliente, setNombre_cliente] = useState("");
    const [base_datos, setBase_datos] = useState("");
    const [host, setHost] = useState("");
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [habilita, setHabilita] = useState(false);
    const { actualizador } = useContext(EquipaContext);
    
    useEffect(() => {
      if (isModalEditOpen && dato) {
        if (dato.habilita == 1) {
          setHabilita(true);
        } else {
          setHabilita(false);
        }
        setNombre_cliente(dato.nombre_cliente);
        setBase_datos(dato.base_datos);
        setHost(dato.host);
        setUser(dato.user);
        setPass(dato.pass);
      }
    }, [isModalEditOpen, dato]);
    
    const limpia_campos = () => {
      setId_cliente("");
      setNombre_cliente("");
      setBase_datos("");
      setHost("");
      setUser("");
      setPass("");
      setHabilita(false);
    };
    const closeModalEdit = () => {
      limpia_campos();
      setIsModalEditOpen(false);
    };
    const acepta_accion = () => {
      const datos_cambios = {
        id_cliente: dato.id_cliente,
        nombre_cliente: nombre_cliente,
        base_datos: base_datos,
        host: host,
        user: user,
        pass: pass,
        habilita: habilita === true ? "1" : "0",
      };
      if (nombre_cliente == "" || base_datos == "" || host == "" || user == "" || pass == "") {
        toast.info(`${t("cliente.datoObligatorio")}`);
        return;
      }
  
      cambia_clientes(datos_cambios).then((respuesta_accion) => {
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
          {t("cliente.editarTitulo")}
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