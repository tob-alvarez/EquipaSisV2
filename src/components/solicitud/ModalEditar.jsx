/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { cambia_solicitudes, trae_combos } from "./funciones_solicitud";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

const ModalEditar = ({ dato }) => {
  const [t] = useTranslation("global");
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [id_solicitud, setId_solicitud] = useState("");
  const [detalle_solicita, setDetalle_solicita] = useState("");
  const [id_organizacion_solicita, setId_organizacion_solicita] = useState("");
  const [id_servicio_solicita, setId_servicio_solicita] = useState("");
  const [id_persona_solicita, setId_persona_solicita] = useState("");
  const [id_tsolicitud, setId_tsolicitud] = useState("");
  const [id_persona_deriva, setId_persona_deriva] = useState("");
  const [fecha_hora, setFecha_hora] = useState("");
  const [habilita, setHabilita] = useState(false);
  const [comboOrganizacion, setComboOrganizacion] = useState([]);
  const [comboServicio, setComboServicio] = useState([]);
  const {
    actualizador,
    traerOrganizaciones_solicita,
    organizaciones_solicita,
    traerServicios_solicita,
    servicios_solicita,
    traerTsolicitudes,
    tsolicitudes,
    traerPersonas_solicita,
    personas_solicita,
    traerPersonas_deriva,
    personas_deriva,
  } = useContext(EquipaContext);

  useEffect(() => {
    if (isModalEditOpen && dato) {
      if (dato.habilita == 1) {
        setHabilita(true);
      } else {
        setHabilita(false);
      }
      setId_solicitud(dato.id_solicitud)
      setDetalle_solicita(dato.detalle_solicita);
      setFecha_hora(dato.fecha_hora);
      setId_persona_solicita(dato.id_persona_solicita);
      setId_persona_deriva(dato.id_persona_deriva);
      setId_organizacion_solicita(dato.id_organizacion_solicita);
      setId_servicio_solicita(dato.id_servicio_solicita);
      setId_tsolicitud(dato.id_tsolicitud);
      setFecha_hora(dato.fecha_hora);
    }
  }, [isModalEditOpen, dato]);

  useEffect(() => {
    //traerOrganizaciones_solicita({tarea: "combo_organizacion_solicita"})
    trae_combos("organizacion", sessionStorage.getItem("token")).then(
      (datos_organizacion) => {
        setId_persona_solicita(datos_organizacion.usuario[0].id_usuario);
        setComboOrganizacion(
          datos_organizacion.datos.sort((a, b) =>
            a.nombre_organizacion.localeCompare(b.nombre_organizacion)
          )
        );
      }
    );
    trae_combos("servicio", dato.id_organizacion_solicita).then(
      (datos_servicio) =>
        setComboServicio(
          datos_servicio.datos.sort((a, b) =>
            a.nombre_servicio.localeCompare(b.nombre_servicio)
          )
        )
    );

    //traerServicios_solicita({tarea: "combo_servicio_solicita"})
    traerTsolicitudes({ tarea: "combo_tipo_solicitud" });
    traerPersonas_deriva({ tarea: "combo_persona_deriva" });
    traerPersonas_solicita({ tarea: "combo_persona_solicita" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const limpia_campos = () => {
    setId_solicitud("");
    setDetalle_solicita("");
    setId_organizacion_solicita("");
    setId_servicio_solicita("");
    setId_persona_solicita("");
    setId_tsolicitud("");
    setId_persona_deriva("");
    setFecha_hora("");
    setHabilita(false);
  };

  const closeModalEdit = () => {
    limpia_campos();
    setIsModalEditOpen(false);
  };

  const acepta_accion = () => {
    const datos_cambios = {
      id_solicitud: id_solicitud,
      detalle_solicita: detalle_solicita,
      id_organizacion_solicita: id_organizacion_solicita,
      id_servicio_solicita: id_servicio_solicita,
      id_persona_solicita: id_persona_solicita,
      id_tsolicitud: id_tsolicitud,
      id_persona_deriva: id_persona_deriva,
      fecha_hora: fecha_hora,
      habilita: habilita === true ? "1" : "0",
    };

    if (
      detalle_solicita === "" ||
      id_servicio_solicita === "" ||
      id_organizacion_solicita === "" ||
      id_tsolicitud === "" ||
      id_persona_solicita === "" ||
      id_persona_deriva === ""
    ) {
      toast.error(`${t("solicitud.datoObligatorio")}`);
      return;
    }

    cambia_solicitudes(datos_cambios).then((respuesta_accion) => {
      if (respuesta_accion[0].registros > 0) {
        toast.success(`${t("varios.editado")}`, {
          duration: 1000,
        });
        limpia_campos();
        actualizador();
      } else {
        toast.error(`${respuesta_accion[0].Mensage}`, {
          duration: 2000,
          className: "bg-success text-white fs-6",
        });
      }
      setIsModalEditOpen(false);
    });
  };

  function combo_servicios(valor) {
    setId_servicio_solicita("");
    trae_combos("servicio", valor == "" ? "0" : valor).then((datos_servicio) =>
      setComboServicio(
        datos_servicio.datos.sort((a, b) =>
          a.nombre_servicio.localeCompare(b.nombre_servicio)
        )
      )
    );
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
            {t("solicitud.editarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("solicitud.datoObligatorio")}
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
                    {t("solicitud.id_tsolicitud") + " #"}
                  </InputLabel>
                  <Select
                    id="id_tsolicitud"
                    value={id_tsolicitud}
                    onChange={(e) => setId_tsolicitud(e.target.value)}
                    onKeyUp={(e) =>
                      setId_tsolicitud(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                    label={t("solicitud.id_tsolicitud") + " #"}
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>{t("solicitud.seleccione_tsolicitud")}</em>
                    </MenuItem>
                    {tsolicitudes?.map((o) => (
                      <MenuItem
                        key={o.id_tsolicitud}
                        value={o.id_tsolicitud}
                        sx={{ fontSize: 12, fontWeight: "medium" }}
                      >
                        {o.nombre_tsolicitud}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="col-6">
                <InputGroup className="mb-2">
                  <TextField
                    id="detalle_solicita"
                    value={detalle_solicita}
                    onChange={(e) => setDetalle_solicita(e.target.value)}
                    onKeyUp={(e) =>
                      setDetalle_solicita(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                    sx={{
                      "& .MuiInputLabel-outlined": {
                        fontSize: "14px",
                      },
                    }}
                    inputProps={{
                      style: {
                        fontSize: "14px",
                        fontWeight: "500",
                        padding: 10,
                      },
                    }}
                    fullWidth
                    label={t("solicitud.detalle-solicitud") + " #"}
                  />
                </InputGroup>
              </div>

              <div className="col-6">
                <FormControl fullWidth size="small" className="mb-2">
                  <InputLabel
                    sx={{ fontSize: 14 }}
                    id="demo-select-small-label"
                  >
                    {t("solicitud.id_organizacion_solicita") + " #"}
                  </InputLabel>
                  <Select
                    id="id_organizacion_solicita"
                    value={id_organizacion_solicita}
                    onChange={(e) => {
                      setId_organizacion_solicita(e.target.value);
                      combo_servicios(e.target.value);
                    }}
                    onKeyUp={(e) =>
                      setId_organizacion_solicita(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                    label={t("solicitud.id_organizacion_solicita") + " #"}
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>{t("solicitud.seleccione_organizacion_solicita")}</em>
                    </MenuItem>
                    {comboOrganizacion?.map((o) => (
                      <MenuItem
                        key={o.id_organizacion}
                        value={o.id_organizacion}
                        sx={{ fontSize: 12, fontWeight: "medium" }}
                      >
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
                    {t("solicitud.id_servicio_solicita") + " #"}
                  </InputLabel>
                  <Select
                    id="id_servicio_solicita"
                    value={id_servicio_solicita}
                    onChange={(e) => setId_servicio_solicita(e.target.value)}
                    onKeyUp={(e) =>
                      setId_servicio_solicita(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                    label={t("solicitud.id_servicio_solicita") + " #"}
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>{t("solicitud.seleccione_servicio_solicita")}</em>
                    </MenuItem>
                    {comboServicio?.map((o) => (
                      <MenuItem
                        key={o.id_servicio}
                        value={o.id_servicio}
                        sx={{ fontSize: 12, fontWeight: "medium" }}
                      >
                        {o.nombre_servicio}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="col-6">
                <FormControl fullWidth size="small" className="mb-2" disabled>
                  <InputLabel
                    sx={{ fontSize: 14 }}
                    id="demo-select-small-label"
                  >
                    {t("solicitud.id_persona_solicita") + " #"}
                  </InputLabel>
                  <Select
                    id="id_persona_solicita"
                    value={id_persona_solicita}
                    onChange={(e) => setId_persona_solicita(e.target.value)}
                    onKeyUp={(e) =>
                      setId_persona_solicita(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                    label={t("solicitud.id_persona_solicita") + " #"}
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>{t("solicitud.seleccione_persona_solicita")}</em>
                    </MenuItem>
                    {personas_solicita?.map((o) => (
                      <MenuItem
                        key={o.id_persona_solicita}
                        value={o.id_persona_solicita}
                        sx={{ fontSize: 12, fontWeight: "medium" }}
                      >
                        {o.nombre_persona_solicita}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="col-6">
                <FormControl
                  fullWidth
                  size="small"
                  className="mb-2"
                  sx={{ display: "none" }}
                >
                  <InputLabel
                    sx={{ fontSize: 14 }}
                    id="demo-select-small-label"
                  >
                    {t("solicitud.id_persona_deriva") + " #"}
                  </InputLabel>
                  <Select
                    id="id_persona_deriva"
                    value={id_persona_deriva}
                    onChange={(e) => setId_persona_deriva(e.target.value)}
                    onKeyUp={(e) =>
                      setId_persona_deriva(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                    label={t("solicitud.id_persona_deriva") + " #"}
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>{t("solicitud.seleccione_persona_deriva")}</em>
                    </MenuItem>
                    {personas_deriva?.map((o) => (
                      <MenuItem
                        key={o.id_persona_deriva}
                        value={o.id_persona_deriva}
                        sx={{ fontSize: 12, fontWeight: "medium" }}
                      >
                        {o.nombre_persona_deriva}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="col-6">
                <InputGroup disabled>
                  <TextField
                    disabled
                    id="fecha_hora"
                    value={fecha_hora}
                    onChange={(e) => setFecha_hora(e.target.value)}
                    className="mb-2"
                    sx={{
                      "& .MuiInputLabel-outlined": {
                        fontSize: "14px",
                      },
                    }}
                    inputProps={{
                      style: {
                        fontSize: "14px",
                        fontWeight: "500",
                        padding: 10,
                      },
                    }}
                    fullWidth
                    label={t("solicitud.fecha_hora") + " #"}
                  />
                </InputGroup>
              </div>

              <div className="col-6 text-start">
                {t("solicitud.habilitado")}
                <Switch
                  id={"habilita"}
                  checked={habilita}
                  label={t("solicitud.habilitado")}
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
        sx={{ fontSize: "20px" }}
        style={{ cursor: "pointer" }}
      />
    </>
  );
};

export default ModalEditar;
