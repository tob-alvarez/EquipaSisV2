import { useContext, useEffect, useState } from "react";
import { EquipaContext } from "../../context/EquipaContext";
import "./Login.css";
import ingles from '../../assets/united-kingdom.svg'
import spain from '../../assets/spain.svg'
import portugal from '../../assets/portugal.svg'
import logo from "../../assets/logoEquipasis.png";
import { Box, Button, MenuItem, Modal, Select, TextField, Typography} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import DraftsIcon from "@mui/icons-material/Drafts";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginValues, setLoginvalues ,authenticated] = useState({
    email_persona: "",
    clave:"",
  })
  const { handleChangeLanguage, t, botonState, login} = useContext(EquipaContext);

    useEffect(() => {
      if (authenticated) {
        navigate("/inicio");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticated]);

  const [open, setOpen] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenTerms = () => setOpenTerms(true);
  const handleCloseTerms = () => setOpenTerms(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: 24,
    p: 10,
  };
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "80%",
    bgcolor: "background.paper",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: 24,
    p: 10,
    maxHeight: '80vh',
    overflowY: 'auto',
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setLoginvalues({
      ...loginValues,
      [name]: value,
    });
  };

  return (
    <>
      <div className="layoutHeight d-flex justify-content-center align-items-center">
        <div className=" w-75 d-flex align-items-center boxLogin">
          <div className="boxLeft d-flex flex-column justify-content-end align-items-center">
            <div className="d-flex gap-1">
              <AlternateEmailIcon htmlColor="white" />
              <p className="text-white">Edgardo Ariel Diaz</p>
              <p className="text-white">- Ing- Biomédico</p>
            </div>
            <p className="text-white">edgardo@bmeamericas.com</p>
            <p className="text-white">+54 9 11 6568-0968</p>
          </div>
          <div className="d-flex gap-5 flex-column boxRight justify-content-center align-items-center">
            <div className="d-flex align-items-center gap-4">
              <img src={logo} alt="" className="imgLogin" />
              <h1 className="m-0">Equipasis</h1>
              <div className="d-flex align-items-center gap-1">
                <Select
                  label={<LanguageIcon />}
                  value={localStorage.getItem("language") || "es"}
                  onChange={(e) => handleChangeLanguage(e.target.value)}
                >
                  <MenuItem value={"en"}>EN <img src={ingles} className="icono-lang ps-2"/></MenuItem>
                  <MenuItem value={"es"}>ES <img src={spain} className="icono-lang ps-2"/></MenuItem>
                  <MenuItem value={"por"}>POR <img src={portugal} className="icono-lang ps-2"/></MenuItem>
                </Select>
              </div>
            </div>
            <form className="d-flex flex-column gap-4" onSubmit={(event) => login(event, loginValues)}>
              <TextField
                id="user"
                name="email_persona"
                label={t("login.usuario")}
                variant="outlined"
                sx={{ width: 250 }}
                onChange={handleInputChange}
              />
              <TextField
                id="password"
                name="clave"
                label={t("login.contraseña")}
                type="password"
                autoComplete="current-password"
                sx={{ width: 250 }}
                onChange={handleInputChange}
              />
              <p
                onClick={handleOpen}
                className="text-decoration-underline p-pointer"
              >
                {t("login.olvidaste")}
              </p>
            <Button
              variant="contained"
              sx={{ width: 250 }}
              disabled={botonState}
              type="submit"
            >
              {t("login.ingresar")}
            </Button>
            </form>
            <div className="d-flex align-items-center">
              <DraftsIcon />
              <p className="m-0 p-pointer" onClick={handleOpenTerms}>{t("login.terminosTitulo")}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("login.olvidaste")}
            </Typography>
            <TextField
              placeholder={t("login.olvidaUsuario")}
              label={t("login.olvidaUsuario")}
              variant="standard"
              sx={{ width: 400 }}
            />
            <p className="mt-4">
            {t("login.mensajeCorreo")}
            </p>
            <div className="d-flex gap-3 justify-content-end">
              <Button variant="contained" color="error" onClick={handleClose}>
              {t("login.cancelar")}
              </Button>
              <Button variant="contained" color="success">
              {t("login.aceptar")}
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={openTerms}
          onClose={handleCloseTerms}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("login.terminosTitulo")}
            </Typography>
            <div className="mt-5 d-flex flex-column gap-3">
              {t("login.terminosSubtitulo1")} <br /> <br />
              {t("login.terminosTexto1")} <br /> <br />
              {t("login.terminosSubtitulo2")} <br /> <br />
              {t("login.terminosTexto2")} <br /> <br />
              {t("login.terminosSubtitulo3")} <br /> <br />
              {t("login.terminosTexto3")} <br /> <br />
              {t("login.terminosSubtitulo4")} <br /> <br />
              {t("login.terminosTexto4")} <br /> <br />
              {t("login.terminosSubtitulo5")} <br /> <br />
              {t("login.terminosTexto5")} <br /> <br />
              {t("login.terminosSubtitulo6")} <br /> <br />
              {t("login.terminosTexto6")} <br /> <br />
              {t("login.terminosSubtitulo7")} <br /> <br />
              {t("login.terminosTexto7")} <br /> <br />
              {t("login.terminosSubtitulo8")} <br /> <br />
              {t("login.terminosTexto8")} <br /> <br />
              {t("login.terminosSubtitulo9")} <br /> <br />
              {t("login.terminosTexto9")} <br /> <br />
              {t("login.terminosSubtitulo10")} <br /> <br />
              {t("login.terminosTexto10")} <br /> <br />
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Login;
