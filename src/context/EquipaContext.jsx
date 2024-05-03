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
  const [tarchivos, setTarchivos] = useState(null);
  const [categorias, setCategorias] = useState(null);
  const [prioridades, setPrioridades] = useState(null);
  const [tcontroles, setTcontroles] = useState(null);
  const [paises, setPaises] = useState(null);
  const [provincias, setProvincias] = useState(null);
  const [empresas, setEmpresas] = useState(null);
  const [tpersonas, setTpersonas] = useState(null);
  const [ttareas, setTtareas] = useState(null);
  const [organizaciones, setOrganizaciones] = useState(null);
  const [servicios, setServicios] = useState(null);
  const [personas, setPersonas] = useState(null);
  const [tusuarios, setTusuarios] = useState(null);  


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
      sessionStorage.setItem("token", data.token[0].token);
      localStorage.setItem("nombre", data.persona[0].nombre_persona);
      localStorage.setItem("rol", data.persona[0].nombre_tusuario);
      localStorage.setItem("language", "es");
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

  const consultaPerfil = async (token) => {
    let datos = {
      tarea: "consulta_perfil",
      token : token
    }
    try {
      const { data } = await axios.post(`https://v2.equipasis.com/api/perfil.php`, datos);
      setUser(data.perfil[0])
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
  };

  const traerOpciones = async (tarea) => {
    try {
      const { data } = await axios.post(`https://v2.equipasis.com/api/opcion.php`, tarea);
      setOpciones(data.opcion)
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
  };
  
  const traerTarchivos = async (tarea) => {
    try {
      const { data } = await axios.post(`https://v2.equipasis.com/api/tipo_archivo.php`, tarea);
      setTarchivos(data.tipo_archivo)
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
  };

  const traerCategorias = async (tarea) => {
    try {
      const { data } = await axios.post(`https://v2.equipasis.com/api/categoria.php`, tarea);
      setCategorias(data.categoria)
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
  };
  
  const traerPrioridades = async (tarea) => {
    try {
      const { data } = await axios.post(`https://v2.equipasis.com/api/prioridad.php`, tarea);
      setPrioridades(data.prioridad)
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
  };
  
  const traerTcontroles = async (tarea) => {
    try {
      const { data } = await axios.post(`https://v2.equipasis.com/api/tipo_control.php`, tarea);
      setTcontroles(data.tipo_control)
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
  };

  const traerPaises = async (tarea) => {
    try {
      const { data } = await axios.post(`https://v2.equipasis.com/api/pais.php`, tarea);
      setPaises(data.pais)
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
  };

  const traerProvincias = async (tarea) => {
    try {
      const { data } = await axios.post(`https://v2.equipasis.com/api/provincia.php`, tarea);
      setProvincias(data.provincia)
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
  };
  
  const traerEmpresas = async (tarea) => {
    try {
      const { data } = await axios.post(`https://v2.equipasis.com/api/empresa.php`, tarea);
      setEmpresas(data.empresa)
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
  };

  const traerTpersonas = async (tarea) => {
    try {
      const { data } = await axios.post(`https://v2.equipasis.com/api/tipo_persona.php`, tarea);
      setTpersonas(data.tipo_persona)
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
  };

  const traerTtareas = async (tarea) => {
    try {
      const { data } = await axios.post(`https://v2.equipasis.com/api/tipo_tarea.php`, tarea);
      setTtareas(data.tipo_tarea)
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
  };
  
  const traerOrganizaciones = async (tarea) => {
    try {
      const { data } = await axios.post(`https://v2.equipasis.com/api/organizacion.php`, tarea);
      setOrganizaciones(data.organizacion)
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
  };
    
  const traerServicios = async (tarea) => {
    try {
      const { data } = await axios.post(`https://v2.equipasis.com/api/servicio.php`, tarea);
      setServicios(data.servicio)
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
  };

  const traerPersonas = async (tarea) => {
    try {
      const { data } = await axios.post(`https://v2.equipasis.com/api/persona.php`, tarea);
      setPersonas(data.persona)
    } catch (error) {
      console.error(error.response?.data.message || error.message);
    }
  };

  const traerTusuarios = async (tarea) => {
    try {
      const { data } = await axios.post(`https://v2.equipasis.com/api/tipo_usuario.php`, tarea);
      setTusuarios(data.servicio)
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
        opciones,
        traerTarchivos,
        tarchivos,
        traerCategorias,
        categorias,
        traerPrioridades,
        prioridades,
        traerTcontroles,
        tcontroles,
        traerPaises,
        paises,
        traerProvincias,
        provincias,
        traerEmpresas,
        empresas,
        traerTpersonas,
        tpersonas,
        traerTtareas,
        ttareas,
        traerOrganizaciones,
        organizaciones,
        traerServicios,
        servicios,
        traerPersonas,
        personas,
        traerTusuarios,
        tusuarios,
        consultaPerfil
      }}
    >
      {children}
    </EquipaContext.Provider>
  );
};

export default EquipaProvider;