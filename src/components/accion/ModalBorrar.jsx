/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { borra_acciones } from "./funciones_accion";
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from "react-i18next";
import { EquipaContext } from "../../context/EquipaContext";

const ModalBorrar = ({dato}) => {
    const [t] = useTranslation("global")
    const [nombre_accion, setNombre_accion] = useState("");
    const [habilita, setHabilita] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const { actualizador } = useContext(EquipaContext);

    const closeModalDelete = () => {
        setIsModalDeleteOpen(false);
      };
    const borra_accion = () => {
        const datos_cambios = {
            id_accion: dato.id_accion,
        };
        borra_acciones(datos_cambios).then(() => {
            setIsModalDeleteOpen(false);
            toast.success(`${t("varios.borrado")}`, {
            duration: 1000,
            className: "bg-success text-white fs-6",
          });
          actualizador()
        });
      };

    return (
        <>
            <Modal
                show={isModalDeleteOpen}
                onHide={closeModalDelete}
                backdrop="static"
                keyboard={false}
                scrollable={true}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title> {t("accion.borrarTitulo")}...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {dato.habilita_3 == 'HABILITADO' ? (
                        <>
                            <h6>
                                <b>{t("accion.titulo")}:</b>
                            </h6>
                            <p style={{ fontSize: "0.8em" }}>
                                <b>{dato.nombre_accion}</b>
                            </p>
                        </>
                    ) : (
                        <>
                            <h6>
                                <b>{t("accion.titulo")}:</b>
                            </h6>
                            <p style={{ fontSize: "0.8em" }}>
                                <b>{dato.nombre_accion}</b>
                            </p>
                            <p style={{ fontSize: "0.8em", color: "red" }}>
                            {t("accion.borrarListo")}
                            </p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <div className="justify-content-center mt-2">
                        {dato.habilita_3 == 'HABILITADO' ? (
                            <button
                                onClick={borra_accion}
                                className="btn btn-primary btn-sm m-2"
                                style={{
                                    float: "right",
                                    backgroundColor: "green",
                                    borderColor: "green",
                                }}
                            >
                                {t("login.aceptar")}
                            </button>
                        ) : (
                            ""
                        )}
                        <button
                            onClick={closeModalDelete}
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

            <DeleteIcon
                onClick={() => setIsModalDeleteOpen(true)}
                sx={{ fontSize: '20px' }}
                style={{ cursor: "pointer" }} />
        </>
    )
}

export default ModalBorrar