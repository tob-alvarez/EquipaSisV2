/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from "react-i18next"
import user from '../assets/user.svg'
import { Button, InputLabel, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { EquipaContext } from "../context/EquipaContext";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const Perfil = () => {
    const { traerPaises, paises, traerProvincias, provincias } = useContext(EquipaContext);
    const [nombre_persona, setNombre_persona] = useState("");
    const [domicilio_persona, setDomicilio_persona] = useState("");
    const [localidad_persona, setLocalidad_persona] = useState("");
    const [id_pais, setId_pais] = useState("");
    const [id_provincia, setId_provincia] = useState("");
    const [telefono_persona, setTelefono_persona] = useState("");
    const [email_persona, setEmail_persona] = useState("");
    const [t] = useTranslation("global")

    async function cambia_personas(datos) {
        try {
            console.log(datos);

            const JSONdata = JSON.stringify({
                tarea: "cambia_persona",
                nombre_persona: datos.nombre_persona,
                domicilio_persona: datos.domicilio_persona,
                localidad_persona: datos.localidad_persona,
                id_pais: datos.id_pais,
                id_provincia: datos.id_provincia,
                telefono_persona: datos.telefono_persona,
                email_persona: datos.email_persona,
            });

            const endpoint = "https://v2.equipasis.com/api/persona.php";

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSONdata,
            };

            const response = await fetch(endpoint, options);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            toast.success(`${t("varios.editado")}`, {
                duration: 1500,
            });
            return result.registros;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    useEffect(() => {
        traerPaises({ tarea: "combo_pais" })
        traerProvincias({ tarea: "combo_provincia" })
    }, [])


    return (
        <>
            <ToastContainer />
            <div className="d-flex justify-content-between align-items-center mb-2 container">
                <h1 className="m-0">{t("perfil.titulo")}</h1>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center mb-5 container">
                <img src={user} style={{ height: 100, border: '2px solid #000', padding: 10, borderRadius: 50 }} />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center mt-2 mb-2 container">
                <form className="d-flex gap-3">
                    <div className="d-flex flex-column gap-3">
                        <InputLabel>{t("perfil.nombre")}</InputLabel>
                        <TextField
                            id="nombre_persona"
                            value={nombre_persona}
                            onChange={(e) => setNombre_persona(e.target.value)}
                            onKeyUp={(e) =>
                                setNombre_persona(e.target.value.toUpperCase())
                            }
                        />
                        <InputLabel>{t("perfil.domicilio")}</InputLabel>
                        <TextField
                            id="domicilio_persona"
                            value={domicilio_persona}
                            onChange={(e) => setDomicilio_persona(e.target.value)}
                            onKeyUp={(e) =>
                                setDomicilio_persona(e.target.value.toUpperCase())
                            }
                        />
                        <InputLabel>{t("perfil.localidad")}</InputLabel>
                        <TextField
                            id="localidad"
                            value={localidad_persona}
                            onChange={(e) => setLocalidad_persona(e.target.value)}
                            onKeyUp={(e) =>
                                setLocalidad_persona(e.target.value.toUpperCase())
                            }
                        />
                        <InputLabel>{t("perfil.pais")}</InputLabel>
                        <Form.Select
                            id="id_pais"
                            value={id_pais}
                            onChange={(e) => setId_pais(e.target.value)}
                            onKeyUp={(e) => setId_pais(e.target.value.toUpperCase())}
                            className="mb-2"
                        >
                            <option value="">{t("persona.seleccione_pais")}</option>
                            {paises?.map((o) => (
                                <option key={o.id_pais} value={o.id_pais}>
                                    {o.nombre_pais}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className="d-flex flex-column gap-3">
                        <InputLabel>{t("perfil.contraseña")}</InputLabel>
                        <TextField />
                        <InputLabel>{t("perfil.email")}</InputLabel>
                        <TextField
                            id="email_persona"
                            value={email_persona}
                            onChange={(e) => setEmail_persona(e.target.value)}
                        />
                        <InputLabel>{t("perfil.telefono")}</InputLabel>
                        <TextField
                            id="telefono_persona"
                            name="telefono_persona"
                            value={telefono_persona}
                            onChange={(e) => setTelefono_persona(e.target.value)}
                            onKeyUp={(e) =>
                                setTelefono_persona(e.target.value.toUpperCase())
                            }
                        />
                        <InputLabel>{t("perfil.provincia")}</InputLabel>
                        <Form.Select
                            id="id_provincia"
                            value={id_provincia}
                            onChange={(e) => setId_provincia(e.target.value)}
                            onKeyUp={(e) => setId_provincia(e.target.value.toUpperCase())}
                            className="mb-2"
                        >
                            <option value="">{t("persona.seleccione_provincia")}</option>

                            {provincias?.map((o) => (
                                <option key={o.id_provincia} value={o.id_provincia}>
                                    {o.nombre_provincia}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </form>
                <Button className="mt-5" variant="outlined" onClick={() => cambia_personas({ nombre_persona, domicilio_persona, localidad_persona, id_pais, id_provincia, telefono_persona, email_persona })}>Guardar Cambios</Button>
            </div>
        </>
    )
}

export default Perfil