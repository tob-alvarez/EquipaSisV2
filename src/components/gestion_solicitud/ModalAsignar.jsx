/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap"
import { toast } from "react-toastify";
import { cambia_gestion_solicitudes } from "./funciones_gestion_solicitud";
import { useTranslation } from "react-i18next";
import { FormControl, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

const ModalAsignar = ({ dato }) => {
    const [t] = useTranslation("global")
    const [isModalAsignarOpen, setIsModalAsignarOpen] = useState(false);
    const [id_solicitud, setId_solicitud] = useState("");
    const [detalle_solicita, setDetalle_solicita] = useState("");
    const [id_organizacion_solicita, setId_organizacion_solicita] = useState("");
    const [id_servicio_solicita, setId_servicio_solicita] = useState("");
    const [id_persona_solicita, setId_persona_solicita] = useState("");
    const [id_tsolicitud, setId_tsolicitud] = useState("");
    const [id_persona_deriva, setId_persona_deriva] = useState("");
    const [fecha_hora, setFecha_hora] = useState("");
    const [habilita, setHabilita] = useState(false);
    const { actualizador, traerOrganizaciones_solicita, organizaciones_solicita, traerServicios_solicita, servicios_solicita, traerTsolicitudes, tsolicitudes, traerPersonas_solicita, personas_solicita, traerPersonas_deriva, personas_deriva } = useContext(EquipaContext);

    useEffect(() => {
        if (isModalAsignarOpen && dato) {
            if (dato.habilita == 1) {
                setHabilita(true);
            } else {
                setHabilita(false);
            }
            setDetalle_solicita(dato.detalle_solicita);
            setFecha_hora(dato.fecha_hora);
            setId_persona_solicita(dato.id_persona_solicita);
            setId_persona_deriva(dato.id_persona_deriva);
            setId_organizacion_solicita(dato.id_organizacion_solicita);
            setId_servicio_solicita(dato.id_servicio_solicita);
            setId_tsolicitud(dato.id_tsolicitud);
        }
    }, [isModalAsignarOpen, dato]);

    useEffect(() => {
        traerOrganizaciones_solicita({ tarea: "combo_organizacion_solicita" })
        traerServicios_solicita({ tarea: "combo_servicio_solicita" })
        traerTsolicitudes({ tarea: "combo_tipo_solicitud" })
        traerPersonas_deriva({ tarea: "combo_persona_deriva" })
        traerPersonas_solicita({ tarea: "combo_persona_solicita" })
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
        setIsModalAsignarOpen(false);
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
            habilita: habilita === true ? "1" : "0",
        };

        if (detalle_solicita === "" || id_servicio_solicita === "" || id_organizacion_solicita === "" || id_tsolicitud === "" || id_persona_solicita === "" || id_persona_deriva === "") {
            toast.error(`${t("solicitud.datoObligatorio")}`);
            return;
        }

        cambia_gestion_solicitudes(datos_cambios).then((respuesta_accion) => {
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
            setIsModalAsignarOpen(false);
        });
    }

    console.log(dato)


    return (
        <>
            <Modal
                show={isModalAsignarOpen}
                onHide={closeModalEdit}
                size="lg"
                backdrop="static"
                centered
                keyboard={false}
                scrollable={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {t("solicitud.asignarTitulo")}
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
                                    <p>{dato.nombre_tsolicitud}</p>
                                </FormControl>
                            </div>

                            <div className="col-6">
                                <InputGroup className="mb-2">
                                    <p>{dato.detalle_solicita}</p>
                                </InputGroup>
                            </div>

                            <div className="col-6">
                                <FormControl fullWidth size="small" className="mb-2">
                                    <Select
                                        id="id_organizacion_solicita"
                                        value={id_organizacion_solicita}
                                        onChange={(e) => setId_organizacion_solicita(e.target.value)}
                                        onKeyUp={(e) => setId_organizacion_solicita(e.target.value.toUpperCase())}
                                        className="mb-2"
                                        label={t("solicitud.id_organizacion_solicita") + " #"}

                                    >
                                        <MenuItem
                                            value=""
                                            sx={{ fontSize: 12, fontWeight: "medium" }}
                                        >
                                            <em>{t("solicitud.seleccione_organizacion_solicita")}</em>
                                        </MenuItem>
                                        {organizaciones_solicita?.map((o) => (
                                            <MenuItem key={o.id_organizacion_solicita} value={o.id_organizacion_solicita} sx={{ fontSize: 12, fontWeight: "medium" }}>
                                                {o.nombre_organizacion_solicita}
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
                                        onKeyUp={(e) => setId_servicio_solicita(e.target.value.toUpperCase())}
                                        className="mb-2"
                                        label={t("solicitud.id_servicio_solicita") + " #"}
                                    >
                                        <MenuItem
                                            value=""
                                            sx={{ fontSize: 12, fontWeight: "medium" }}
                                        >
                                            <em>{t("solicitud.seleccione_servicio_solicita")}</em>
                                        </MenuItem>
                                        {servicios_solicita?.map((o) => (
                                            <MenuItem key={o.id_servicio_solicita} value={o.id_servicio_solicita} sx={{ fontSize: 12, fontWeight: "medium" }}>
                                                {o.nombre_servicio_solicita}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="col-6">
                                <FormControl fullWidth size="small" className="mb-2">
                                    <p>{dato.nombre_persona_solicita}</p>
                                </FormControl>
                            </div>

                            <div className="col-6">
                                <FormControl fullWidth size="small" className="mb-2">
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
                                        onKeyUp={(e) => setId_persona_deriva(e.target.value.toUpperCase())}
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
                                            <MenuItem key={o.id_persona_deriva} value={o.id_persona_deriva} sx={{ fontSize: 12, fontWeight: "medium" }}>
                                                {o.nombre_persona_deriva}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="col-6">
                                <InputGroup>
                                    <p>{fecha_hora}</p>
                                </InputGroup>
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

            <PersonAddAltOutlinedIcon
                onClick={() => setIsModalAsignarOpen(true)}
                sx={{ fontSize: '20px' }}
                style={{ cursor: "pointer" }} />
        </>
    )
}

export default ModalAsignar