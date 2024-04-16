import { useTranslation } from "react-i18next"
import user from '../assets/user.svg'
import { InputLabel, TextField } from "@mui/material"

const Perfil = () => {

    const [t] = useTranslation("global")

  return (
    <>
        <div className="d-flex justify-content-between align-items-center mb-2 container">
            <h1 className="m-0">{t("perfil.titulo")}</h1>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center mb-2 container">
            <img src={user} style={{height: 100, border: '2px solid #000', padding: 10, borderRadius: 50}} />
            <p className="mt-2" style={{color: '#6495ED'}}>{t("perfil.editarPerfil")}</p>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center mt-2 mb-2 container">
            <form className="d-flex gap-3">
                <div className="d-flex flex-column gap-3">
                    <InputLabel>{t("perfil.nombre")}</InputLabel>
                    <TextField/>
                    <InputLabel>{t("perfil.domicilio")}</InputLabel>
                    <TextField/>
                    <InputLabel>{t("perfil.localidad")}</InputLabel>
                    <TextField/>
                    <InputLabel>{t("perfil.pais")}</InputLabel>
                    <TextField/>
                </div>
                <div className="d-flex flex-column gap-3">
                    <InputLabel>{t("perfil.contraseña")}</InputLabel>
                    <TextField/>
                    <InputLabel>{t("perfil.email")}</InputLabel>
                    <TextField/>
                    <InputLabel>{t("perfil.telefono")}</InputLabel>
                    <TextField/>
                    <InputLabel>{t("perfil.provincia")}</InputLabel>
                    <TextField/>
                </div>
            </form>
        </div>
    </>
  )
}

export default Perfil