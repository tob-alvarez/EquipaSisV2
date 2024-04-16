import { createContext, useEffect, useState } from "react";
import axios from '../config/axios';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const EquipaContext = createContext();

// eslint-disable-next-line react/prop-types
const EquipaProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [permisos, setPermisos] = useState(null);
  const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [t, i18n] = useTranslation("global")
  const [selected, setSelected] = useState([]);
  const [botonState, setBotonState] = useState(false);
  const [refresh, setRefresh] = useState(null);
  const [opciones, setOpciones] = useState(null);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  
  const handleChangeLanguage = async (lang) => {
    try {
      localStorage.setItem('language', lang);
      i18n.changeLanguage(lang);
    } catch (error) {
      console.log(error);
    }
  };
  const login = async (e, loginValues) => {
    e.preventDefault()
    setBotonState(true);
    try {
      const { data } = await axios.get(`https://v2.equipasis.com/api/usuarios.php?tarea=valida_usuario&email_persona=${loginValues.email_persona}&clave=${loginValues.clave}`);
      setAuthenticated(!!data.persona[0]);
      setUser(data.persona[0]);
      sessionStorage.setItem("token", data.token[0].token);
      localStorage.setItem("nombre", data.persona[0].nombre_persona);
      localStorage.setItem("rol", data.persona[0].nombre_tusuario);
      navigate('/inicio')
      window.location.reload()
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
    setBotonState(false);
  };

  const permisosMenu = async (token) => {
    try {
      const { data } = await axios.post(`https://v2.equipasis.com/api/usuario_menu.php`, token);
      setPermisos(data.permisos)
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
  };

  const traerOpciones = async (token) => {
    try {
      const { data } = await axios.post(`https://v2.equipasis.com/api/usuario_menu.php`, token);
      setOpciones(data.permisos)
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
  };
  
  const getAuth = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return setAuthenticated(false);
      }
      setAuthenticated(true)
    } catch (error) {
      setAuthenticated(false)
      sessionStorage.removeItem("token");
      localStorage.removeItem("nombre");
      localStorage.removeItem("rol");
      console.log("error de auth");
      console.log(error)
    }
    setLoading(false)
  }

  const logout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem("token");
  };

  const actualizador = () =>{
    setRefresh(!refresh)
  }

  return (
    <EquipaContext.Provider
      value={{
        user,
        authenticated,
        setAuthenticated,
        loading,
        getAuth,
        setLoading,
        logout,
        selected,
        setSelected,
        handleChangeLanguage,
        t,
        login,
        botonState,
        permisos,
        refresh,
        actualizador,
        permisosMenu,
        traerOpciones,
        opciones
      }}
    >
      {children}
    </EquipaContext.Provider>
  );
};

export default EquipaProvider;