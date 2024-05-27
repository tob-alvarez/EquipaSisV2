/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { toast } from "react-toastify";
import { cambia_stock_productos } from "./funciones_stock_producto";
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from "react-i18next";
import { FormControl, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";


const ModalEditar = ({dato}) => {
    const [t] = useTranslation("global")
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [id_stock, setId_stock] = useState("");
    const [id_tproducto, setId_tproducto] = useState("");
    const [id_organizacion, setId_organizacion] = useState("");
    const [id_servicio, setId_servicio] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [cantidad_minima, setCantidad_minima] = useState("");
    const [habilita, setHabilita] = useState(false);
    const { actualizador, traerOrganizaciones, organizaciones, traerServicios, servicios, traerTproductos, tproductos } = useContext(EquipaContext);

    useEffect(() => {
      if (isModalEditOpen && dato) {
        if (dato.habilita == 1) {
          setHabilita(true);
        } else {
          setHabilita(false);
        }
        setId_tproducto(dato.id_tproducto);
        setId_organizacion(dato.id_organizacion);
        setId_servicio(dato.id_servicio);
        setCantidad(dato.stock);
        setCantidad_minima(dato.stock_minima);
      }
    }, [isModalEditOpen, dato]);
    
    useEffect(() => {
      traerOrganizaciones({tarea: "combo_organizacion"})
      traerServicios({tarea: "combo_servicio"})
      traerTproductos({tarea: "combo_tipo_producto"})
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const limpia_campos = () => {
      setId_stock("");
      setCantidad("");
      setCantidad_minima("");
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
        id_stock: dato.id_stock,
        id_tproducto: id_tproducto,
        id_organizacion: id_organizacion,
        id_servicio: id_servicio,
        cantidad: cantidad,
        cantidad_minima: cantidad_minima,
        habilita: habilita === true ? "1" : "0",
      };
      if (cantidad == "" || id_organizacion == "" || id_servicio == "" || id_tproducto == "") {
        toast.info(`${t("stock_producto.datoObligatorio")}`);
        return;
      }
      
      cambia_stock_productos(datos_cambios).then((respuesta_accion) => {
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
          {t("stock_producto.editarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("stock_producto.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">

            <div className="col-6">
            <FormControl fullWidth size="small" className="mb-2">
                <InputLabel
                    sx={{ fontSize: 14 }}
                    id="demo-select-small-label"
                  >
                    {t("stock_producto.id_tproducto") + " #"}
                  </InputLabel>
                  <Select
                    id="id_tproducto"
                    value={id_tproducto}
                    onChange={(e) => setId_tproducto(e.target.value)}
                    onKeyUp={(e) => setId_tproducto(e.target.value.toUpperCase())}
                    className="mb-2"
                    label={t("stock_producto.id_tproducto") + " #"}
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
              
            <div className="col-6">
              <FormControl fullWidth size="small">
                <InputLabel
                    sx={{ fontSize: 14 }}
                    id="demo-select-small-label"
                  >
                    {t("stock_producto.id_organizacion") + " #"}
                  </InputLabel>
                  <Select
                    id="id_organizacion"
                    value={id_organizacion}
                    onChange={(e) => setId_organizacion(e.target.value)}
                    onKeyUp={(e) => setId_organizacion(e.target.value.toUpperCase())}
                    className="mb-2"
                    label={t("stock_producto.id_organizacion") + " #"}
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>None</em>
                    </MenuItem>
                    {organizaciones?.map((o) => (
                      <MenuItem key={o.id_organizacion} value={o.id_organizacion} sx={{ fontSize: 12, fontWeight: "medium" }}>
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
                    {t("stock_producto.id_servicio") + " #"}
                  </InputLabel>
                  <Select
                    id="id_servicio"
                    value={id_servicio}
                    onChange={(e) => setId_servicio(e.target.value)}
                    onKeyUp={(e) => setId_servicio(e.target.value.toUpperCase())}
                    className="mb-2"
                    label={t("stock_producto.id_servicio") + " #"}
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
                <InputGroup>
                  <TextField
                    id="cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    sx={{
                      "& .MuiInputLabel-outlined": {
                        fontSize: "14px",
                      },
                    }}
                    inputProps={{
                      style: { fontSize: "14px", fontWeight: "500", padding: 10 },
                    }}
                    fullWidth
                    label={t("stock_producto.cantidad") + " #"}
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <InputGroup>
                <TextField
                    id="cantidad_minima"
                    value={cantidad_minima}
                    onChange={(e) => setCantidad_minima(e.target.value)}
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
                    label={t("stock_producto.cantidad_minima") + " #"}
                  />
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("stock_producto.habilitado")}
                <Switch 
                  id={"habilita"}
                  checked={habilita}
                  label={t("stock_producto.habilitado")}
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