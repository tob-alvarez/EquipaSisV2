/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { toast } from "react-toastify";
import { cambia_productos } from "./funciones_producto";
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from "react-i18next";
import { FormControl, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";


const ModalEditar = ({dato}) => {
    const [t] = useTranslation("global")
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [id_producto, setId_producto] = useState("");
    const [nombre_producto, setNombre_producto] = useState("");
    const [serie_producto, setSerie_producto] = useState("");
    const [detalle, setDetalle] = useState("");
    const [id_organizacion, setId_organizacion] = useState("");
    const [id_servicio, setId_servicio] = useState("");
    const [id_tproducto, setId_tproducto] = useState("");
    const [habilita, setHabilita] = useState(false);
    const { actualizador, traerOrganizaciones, organizaciones, traerServicios, servicios, traerTproductos, tproductos } = useContext(EquipaContext);

    useEffect(() => {
      if (isModalEditOpen && dato) {
        if (dato.habilita == 1) {
          setHabilita(true);
        } else {
          setHabilita(false);
        }
        setNombre_producto(dato.nombre_producto);
        setSerie_producto(dato.serie_producto);
        setDetalle(dato.detalle);
        setId_organizacion(dato.id_organizacion);
        setId_servicio(dato.id_servicio);
        setId_tproducto(dato.id_tproducto);
      }
    }, [isModalEditOpen, dato]);
    
    useEffect(() => {
      traerOrganizaciones({tarea: "combo_organizacion"})
      traerServicios({tarea: "combo_servicio"})
      traerTproductos({tarea: "combo_tipo_producto"})
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const limpia_campos = () => {
      setId_producto("");
      setNombre_producto("");
      setSerie_producto("");
      setDetalle("");
      setId_organizacion("");
      setId_servicio("");
      setId_tproducto("");
      setHabilita(false);
    };
    const closeModalEdit = () => {
      limpia_campos();
      setIsModalEditOpen(false);
    };
    
    const acepta_accion = () => {
      const datos_cambios = {
        id_producto: dato.id_producto,
        nombre_producto: nombre_producto,
        serie_producto: serie_producto,
        detalle: detalle,
        id_organizacion: id_organizacion,
        id_servicio: id_servicio,
        id_tproducto: id_tproducto,
        habilita: habilita === true ? "1" : "0",
      };
      if (nombre_producto == "" || id_organizacion == "" || id_servicio == "" || id_tproducto == "") {
        toast.info(`${t("producto.datoObligatorio")}`);
        return;
      }
      
      cambia_productos(datos_cambios).then((respuesta_accion) => {
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
          {t("producto.editarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("producto.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                <InputGroup className="mb-2">
                <TextField
                    id="nombre_producto"
                    value={nombre_producto}
                    onChange={(e) => setNombre_producto(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_producto(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                    sx={{
                      "& .MuiInputLabel-outlined": {
                        fontSize: "14px",
                      },
                    }}
                    inputProps={{
                      style: { fontSize: "14px", fontWeight: "500", padding: 10 },
                    }}
                    fullWidth
                    label={t("producto.nombre-producto") + " #"}
                  />
                </InputGroup>
              </div>
              
              <div className="col-6">
                <InputGroup>
                <TextField
                    id="serie_producto"
                    value={serie_producto}
                    onChange={(e) => setSerie_producto(e.target.value)}
                    className="mb-2"
                    sx={{
                      "& .MuiInputLabel-outlined": {
                        fontSize: "14px",
                      },
                    }}
                    inputProps={{
                      style: { fontSize: "14px", fontWeight: "500", padding: 10 },
                    }}
                    fullWidth
                    label={t("producto.serie_producto") + " #"}
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <InputGroup className="mb-2">
                <TextField
                    id="detalle"
                    value={detalle}
                    onChange={(e) => setDetalle(e.target.value)}
                    className="mb-2"
                    sx={{
                      "& .MuiInputLabel-outlined": {
                        fontSize: "14px",
                      },
                    }}
                    inputProps={{
                      style: { fontSize: "14px", fontWeight: "500", padding: 10 },
                    }}
                    fullWidth
                    label={t("producto.detalle") + " #"}
                  />
                </InputGroup>
              </div>

              <div className="col-6">
              <FormControl fullWidth size="small" className="mb-2">
                  <InputLabel
                    sx={{ fontSize: 14 }}
                    id="demo-select-small-label"
                  >
                    {t("producto.id_organizacion") + " #"}
                  </InputLabel>
                  <Select
                    id="id_organizacion"
                    value={id_organizacion}
                    onChange={(e) => setId_organizacion(e.target.value)}
                    onKeyUp={(e) => setId_organizacion(e.target.value.toUpperCase())}
                    className="mb-2"
                    label={t("producto.id_organizacion") + " #"}
                    
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>None</em>
                    </MenuItem>
                    {organizaciones?.map((o) => (
                      <MenuItem key={o.id_organizacion} value={o.id_organizacion}  sx={{ fontSize: 12, fontWeight: "medium" }}>
                      {o.nombre_organizacion}
                      </MenuItem>
                    ))}
                  </Select>
                  </FormControl>
              </div>


              <div className="col-6">
              <FormControl fullWidth size="small" className="mb-2">
                  <InputLabel
                    sx={{ fontSize: 14 }}
                    id="demo-select-small-label"
                  >
                    {t("producto.id_servicio") + " #"}
                  </InputLabel>
                  <Select
                    id="id_servicio"
                    value={id_servicio}
                    onChange={(e) => setId_servicio(e.target.value)}
                    onKeyUp={(e) => setId_servicio(e.target.value.toUpperCase())}
                    className="mb-2"
                    label={t("producto.id_servicio") + " #"}
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>None</em>
                    </MenuItem>
                    {servicios?.map((o) => (
                      <MenuItem key={o.id_servicio} value={o.id_servicio} sx={{ fontSize: 12, fontWeight: "medium" }}>
                      {o.nombre_servicio}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="col-6">
              <FormControl fullWidth size="small" className="mb-2">
                  <InputLabel
                    sx={{ fontSize: 14 }}
                    id="demo-select-small-label"
                  >
                    {t("producto.id_tproducto") + " #"}
                  </InputLabel>
                  <Select
                    id="id_tproducto"
                    value={id_tproducto}
                    onChange={(e) => setId_tproducto(e.target.value)}
                    onKeyUp={(e) => setId_tproducto(e.target.value.toUpperCase())}
                    className="mb-2"
                    label={t("producto.id_tproducto") + " #"}
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>None</em>
                    </MenuItem>
                    {tproductos?.map((o) => (
                      <MenuItem key={o.id_tproducto} value={o.id_tproducto} sx={{ fontSize: 12, fontWeight: "medium" }}>
                        {o.nombre_tproducto}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="col-6 text-start">
                {t("producto.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("producto.habilitado")}
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