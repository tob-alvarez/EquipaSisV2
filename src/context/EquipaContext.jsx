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
  const [ t, i18n] = useTranslation("global")
  const [selected, setSelected] = useState([]);
  const [botonState, setBotonState] = useState(false);

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
      localStorage.setItem("token", true);
      localStorage.setItem("nombre", data.persona[0].nombre_persona);
      localStorage.setItem("rol", data.persona[0].nombre_tusuario);
      setPermisos(data.permisos)
      navigate('/inicio')
      console.log(data)
      
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
    setBotonState(false);
  };
  
  const getAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return setAuthenticated(false);
      }
      setAuthenticated(true)
    } catch (error) {
      setAuthenticated(false)
      localStorage.removeItem("token");
      localStorage.removeItem("nombre");
      localStorage.removeItem("rol");
      localStorage.removeItem("permisos");
      console.log("error de auth");
      console.log(error)
    }
    setLoading(false)
  }

  const logout = () => {
    setAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenSet");
    const url = new URL(`http://localhost:5173/`);
    // url.searchParams.append("logout", true);
    window.open(url.toString(), '_self');
  };

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
        permisos
      }}
    >
      {children}
    </EquipaContext.Provider>
  );
};

export default EquipaProvider;