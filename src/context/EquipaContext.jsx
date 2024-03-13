import { createContext, useEffect, useState } from "react";
import axios from '../config/axios';
import { useTranslation } from "react-i18next";

export const EquipaContext = createContext();

// eslint-disable-next-line react/prop-types
const EquipaProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ t, i18n] = useTranslation("global")
  const [selected, setSelected] = useState([]);

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


  const getAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return setAuthenticated(false);
      }
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.get("/usuarios/authStatus");
      setUser(data.usuarioSinContraseña);
      setAuthenticated(true);
    } catch (error) {
      setAuthenticated(false);
      // toast.error("Error de autenticación. Ingrese nuevamente");
    }
    setLoading(false);
  };

  const logout = () => {
    setAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenSet");
    const url = new URL(`http://localhost:5173/`);
    url.searchParams.append("logout", true);
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
        t
      }}
    >
      {children}
    </EquipaContext.Provider>
  );
};

export default EquipaProvider;