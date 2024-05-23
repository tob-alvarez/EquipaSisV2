/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { useTranslation } from "react-i18next";
import { EquipaContext } from "../../context/EquipaContext";

// eslint-disable-next-line react/prop-types
const ModalAdjuntar = ({dato}) => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const { actualizador } = useContext(EquipaContext);
  const [checkboxState, setCheckboxState] = useState({});
  const [datos, setDatos] = useState({});

  const limpia_campos = () => {
    setCheckboxState([])
    setDatos({})
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };

  console.log(dato)

  return (
    <>
      <ToastContainer />
      <Modal
        show={isModalAttachOpen}
        onHide={closeModalAttach}
        size="xl"
        backdrop="static"
        centered
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Adjuntar archivo para {dato.nombre_persona}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-1">
      <div className="container my-5 px-5">
        <form>
          <input type="file" />
        </form>
      </div>
    </Modal.Body>
        <Modal.Footer>
          <div className="justify-content-center mt-2">
            <button
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

      <AttachFileOutlinedIcon
        onClick={() => setIsModalAttachOpen(true)}
        sx={{ fontSize: '20px' }}
        style={{ cursor: "pointer" }} />
    </>

  )
}

export default ModalAdjuntar