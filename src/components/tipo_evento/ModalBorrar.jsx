/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { borra_tipo_archivos } from "./funciones_tipo_archivo";
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from "react-i18next";
import { EquipaContext } from "../../context/EquipaContext";

const ModalBorrar = ({dato}) => {
    const [t] = useTranslation("global")
    const [nombre_tarchivo, setNombre_tarchivo] = useState("");
    const [habilita, setHabilita] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const { actualizador } = useContext(EquipaContext);

    const closeModalDelete = () => {
        setIsModalDeleteOpen(false);
      };
    const borra_tipo_archivo = () => {
        const datos_cambios = {
            id_tarchivo: dato.id_tarchivo,
        };
        borra_tipo_archivos(datos_cambios).then(() => {
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
                    <Modal.Title> {t("tipo_archivo.borrarTitulo")}...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {dato.habilita_3 == 'SI' ? (
                        <>
                            <h6>
                                <b>{t("tipo_archivo.titulo")}:</b> {dato.nombre_tarchivo}
                            </h6>
                        </>
                    ) : (
                        <>
                            <h6>
                                <b>{t("tipo_archivo.titulo")}:</b> {dato.nombre_tarchivo}
                            </h6>
                            <p style={{ fontSize: "0.8em", color: "red" }}>
                            {t("tipo_archivo.borrarListo")}
                            </p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <div className="justify-content-center mt-2">
                        {dato.habilita_3 == 'SI' ? (
                            <button
                                onClick={borra_tipo_archivo}
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