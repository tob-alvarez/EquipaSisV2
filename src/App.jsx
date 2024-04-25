// App.jsx
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import EquipaProvider from "./context/EquipaContext";
import Home from "./components/Home/Home";
import Layout from "./common/Layout";
import Login from "./components/Login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Accion from "./components/accion/Accion";
import Ayuda from "./components/ayuda/Ayuda";
import Categoria from "./components/categoria/Categoria";
import Cliente from "./components/cliente/Cliente";
import Documentacion from "./components/documentacion/Documentacion";
import Empresa from "./components/empresa/Empresa";
import Estado_equipo from "./components/estado_equipo/Estado_equipo";
import Estado_solicitud from "./components/estado_solicitud/Estado_solicitud";
import Marca from "./components/marca/Marca";
import Motivo_solicitud from "./components/motivo_solicitud/Motivo_solicitud";
import Opcion from "./components/opcion/Opcion";
import Organizacion from "./components/organizacion/Organizacion";
//import Organizacion_servicio from "./components/organizacion_servicio/Organizacion_servicio";
import Pais from "./components/pais/Pais";
import Persona from "./components/persona/Persona";
import Prioridad from "./components/prioridad/Prioridad";
import Proceso from "./components/proceso/Proceso";
import Provincia from "./components/provincia/Provincia";
import Servicio from "./components/servicio/Servicio";
import Software from "./components/software/Software";
import Tareas from "./components/tareas/Tareas";
import Tipo_adjunto from "./components/tipo_adjunto/Tipo_adjunto";
import Tipo_alimentacion from "./components/tipo_alimentacion/Tipo_alimentacion";
import Tipo_archivo from "./components/tipo_archivo/Tipo_archivo";
import Tipo_componente from "./components/tipo_componente/Tipo_componente";
import Tipo_comprobante from "./components/tipo_comprobante/Tipo_comprobante";
import Tipo_control from "./components/tipo_control/Tipo_control";
import Tipo_equipo from "./components/tipo_equipo/Tipo_equipo";
import Tipo_evento from "./components/tipo_evento/Tipo_evento";
import Tipo_impresion from "./components/tipo_impresion/Tipo_impresion";
import Tipo_indicador from "./components/tipo_indicador/Tipo_indicador";
import Tipo_persona from "./components/tipo_persona/Tipo_persona";
import Tipo_pertenencia from "./components/tipo_pertenencia/Tipo_pertenencia";
import Tipo_solicitud from "./components/tipo_solicitud/Tipo_solicitud";
import Tipo_tarea from "./components/tipo_tarea/Tipo_tarea";
import Tipo_usuario from "./components/tipo_usuario/Tipo_usuario";
import Perfil from "./common/Perfil";


function App() {
  return (
    <HashRouter>
      <EquipaProvider>
        <Layout>
          <Routes>
            <Route exact path="/*" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route
              exact
              path="/inicio"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/accion"
              element={
                <PrivateRoute>
                  <Accion />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/ayuda"
              element={
                <PrivateRoute>
                  <Ayuda />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/categoria"
              element={
                <PrivateRoute>
                  <Categoria />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/cliente"
              element={
                <PrivateRoute>
                  <Cliente />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/documentacion"
              element={
                <PrivateRoute>
                  <Documentacion />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/empresa"
              element={
                <PrivateRoute>
                  <Empresa />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/estado_equipo"
              element={
                <PrivateRoute>
                  <Estado_equipo />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/estado_solicitud"
              element={
                <PrivateRoute>
                  <Estado_solicitud />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/marca"
              element={
                <PrivateRoute>
                  <Marca />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/motivo_solicitud"
              element={
                <PrivateRoute>
                  <Motivo_solicitud />
                </PrivateRoute>
              }
            /> 
            <Route
              exact
              path="/opcion"
              element={
                <PrivateRoute>
                  <Opcion />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/organizacion"
              element={
                <PrivateRoute>
                  <Organizacion />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/pais"
              element={
                <PrivateRoute>
                  <Pais />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/persona"
              element={
                <PrivateRoute>
                  <Persona />
                </PrivateRoute>
              }
            />            
            <Route
              exact
              path="/prioridad"
              element={
                <PrivateRoute>
                  <Prioridad />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/proceso"
              element={
                <PrivateRoute>
                  <Proceso />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/provincia"
              element={
                <PrivateRoute>
                  <Provincia />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/servicio"
              element={
                <PrivateRoute>
                  <Servicio />
                </PrivateRoute>
              }
            />  
            <Route
              exact
              path="/software"
              element={
                <PrivateRoute>
                  <Software />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/tareas"
              element={
                <PrivateRoute>
                  <Tareas />
                </PrivateRoute>
              }
            />                                                
            <Route
              exact
              path="/tipo_adjunto"
              element={
                <PrivateRoute>
                  <Tipo_adjunto />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/tipo_alimentacion"
              element={
                <PrivateRoute>
                  <Tipo_alimentacion />
                </PrivateRoute>
              }
            />   
            <Route
              exact
              path="/tipo_archivo"
              element={
                <PrivateRoute>
                  <Tipo_archivo />
                </PrivateRoute>
              }
            />   
            <Route
              exact
              path="/tipo_componente"
              element={
                <PrivateRoute>
                  <Tipo_componente />
                </PrivateRoute>
              }
            />   
            <Route
              exact
              path="/tipo_comprobante"
              element={
                <PrivateRoute>
                  <Tipo_comprobante />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/tipo_control"
              element={
                <PrivateRoute>
                  <Tipo_control />
                </PrivateRoute>
              }
            />              
            <Route
              exact
              path="/tipo_equipo"
              element={
                <PrivateRoute>
                  <Tipo_equipo />
                </PrivateRoute>
              }
            /> 
            <Route
              exact
              path="/tipo_evento"
              element={
                <PrivateRoute>
                  <Tipo_evento />
                </PrivateRoute>
              }
            />            
            <Route
              exact
              path="/tipo_impresion"
              element={
                <PrivateRoute>
                  <Tipo_impresion />
                </PrivateRoute>
              }
            />            
            <Route
              exact
              path="/tipo_indicador"
              element={
                <PrivateRoute>
                  <Tipo_indicador />
                </PrivateRoute>
              }
            />            
            <Route
              exact
              path="/tipo_persona"
              element={
                <PrivateRoute>
                  <Tipo_persona />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/tipo_pertenencia"
              element={
                <PrivateRoute>
                  <Tipo_pertenencia />
                </PrivateRoute>
              }
            />            
            <Route
              exact
              path="/tipo_solicitud"
              element={
                <PrivateRoute>
                  <Tipo_solicitud />
                </PrivateRoute>
              }
            />            
            <Route
              exact
              path="/tipo_tarea"
              element={
                <PrivateRoute>
                  <Tipo_tarea />
                </PrivateRoute>
              }
            /> 
            <Route
              exact
              path="/tipo_usuario"
              element={
                <PrivateRoute>
                  <Tipo_usuario />
                </PrivateRoute>
              }
            />             
          </Routes>
        </Layout>
      </EquipaProvider>
    </HashRouter>
  );
}

export default App;
