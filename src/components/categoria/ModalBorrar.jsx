/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { borra_categorias } from "./funciones_categoria";
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from "react-i18next";

const ModalBorrar = ({dato}) => {
    const [t] = useTranslation("global")
    const [nombre_categoria, setNombre_categoria] = useState("");
    const [habilita, setHabilita] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const closeModalDelete = () => {
        setIsModalDeleteOpen(false);
      };
    const borra_categoria = () => {
        const datos_cambios = {
            id_categoria: dato.id_categoria,
        };
        borra_categorias(datos_cambios).then(() => {
            setIsModalDeleteOpen(false);
            toast.success("Registro deshabiltado correctamente", {
            duration: 3000,
            className: "bg-success text-white fs-6",
          });
        });
      };
    return (
        <>
            <ToastContainer position="top-center" />
            <Modal
                show={isModalDeleteOpen}
                onHide={closeModalDelete}
                backdrop="static"
                keyboard={false}
                scrollable={true}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title> {t("categoria.borrarTitulo")}...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {dato.habilita_3 == 'HABILITADO' ? (
                        <>
                            <h6>
                                <b>{t("categoria.titulo")}:</b>
                            </h6>
                            <p style={{ fontSize: "0.8em" }}>
                                <b>{dato.nombre_categoria}</b>
                            </p>
                        </>
                    ) : (
                        <>
                            <h6>
                                <b>{t("categoria.titulo")}:</b>
                            </h6>
                            <p style={{ fontSize: "0.8em" }}>
                                <b>{dato.nombre_categoria}</b>
                            </p>
                            <p style={{ fontSize: "0.8em", color: "red" }}>
                            {t("categoria.borrarListo")}
                            </p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <div className="justify-content-center mt-2">
                        {dato.habilita_3 == 'HABILITADO' ? (
                            <button
                                onClick={borra_categoria}
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
                sx={{ fontSize: '30px' }}
                style={{ cursor: "pointer" }} />
        </>
    )
}

export default ModalBorrar