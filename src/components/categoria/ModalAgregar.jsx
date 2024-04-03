import { useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import { alta_categorias } from "./funciones_categoria";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTranslation } from "react-i18next";

const ModalAgregar = () => {

  const [isModalAttachOpen, setIsModalAttachOpen] = useState(false);
  const [t] = useTranslation("global")
  const [id_categoria, setId_categoria] = useState("");
  const [nombre_categoria, setNombre_categoria] = useState("");
  const [habilita, setHabilita] = useState(false);
  const limpia_campos = () => {
    setId_categoria("");
    setNombre_categoria("");
    setHabilita(false);
  };
  const closeModalAttach = () => {
    limpia_campos();
    setIsModalAttachOpen(false);
  };
  const acepta_categoria = () => {
    const datos_cambios = {
      id_categoria: id_categoria,
      nombre_categoria: nombre_categoria,
      habilita: habilita === true ? "1" : "0",
    };

    if (nombre_categoria === "") {
      toast.error(`${t("categoria.datoObligatorio")}`);
      return;
    }
    

    alta_categorias(datos_cambios).then((respuesta_categoria) => {
      if (respuesta_categoria[0].registros > 0) {
        toast.success(`Categoria agregada correctamente`, {
          duration: 3000,
        });
        limpia_campos()
      } else {
        toast.error(`${respuesta_categoria[0].Mensage}`, {
          duration: 3000,
          className: "bg-success text-white fs-6",
        });
      }
      setIsModalAttachOpen(false);
    });
  }


  return (
    <>
      <ToastContainer position="top-center"/>
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
          {t("categoria.agregarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("categoria.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name" className="label-material mb-1">
                {t("categoria.nombre-categoria")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_categoria"
                    value={nombre_categoria}
                    onChange={(e) => setNombre_categoria(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_categoria(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                <Form.Check // prettier-ignore
                  type={"checkbox"}
                  id={"habilita"}
                  checked={habilita}
                  label={t("categoria.habilitado")}
                  onChange={(e) => setHabilita(e.target.checked)}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="justify-content-center mt-2">
            <button
              onClick={acepta_categoria}
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