/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Modal } from 'react-bootstrap'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTranslation } from 'react-i18next';

const ModalAyuda = ({ ayuda }) => {
    const [t] = useTranslation("global")
    const [isModalHelpOpen, setIsModalHelpOpen] = useState(false);
    const closeModalHelp = () => {
        setIsModalHelpOpen(false);
    };
    return (
        <>
            <Modal
                show={isModalHelpOpen}
                onHide={closeModalHelp}
                backdrop="static"
                keyboard={false}
                scrollable={true}
                centered
                style={{zIndex: 9999}}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2 className="form-header text-bold">{t("software.ayudaTitulo")}</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="bg-white forms m-3">
                        {ayuda &&
                            ayuda
                                .split("</br>")
                                .map((line, index) => <p key={index}>{line}</p>)}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="justify-content-center mt-2">
                        <button
                            onClick={closeModalHelp}
                            className="btn btn-secondary btn-sm m-2"
                            style={{
                                float: "right",
                                backgroundColor: "#990000",
                                borderColor: "#990000",
                            }}
                        >
                            {t("login.cerrar")}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            <HelpOutlineIcon
                onClick={() => setIsModalHelpOpen(true)}
                sx={{ fontSize: '40px' }}
                style={{ cursor: "pointer" }} />
        </>
    )
}

export default ModalAyuda