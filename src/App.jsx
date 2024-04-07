// App.jsx
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import EquipaProvider from "./context/EquipaContext";
import Home from "./components/Home/Home";
import Layout from "./common/Layout";
import Login from "./components/Login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Accion from "./components/accion/Accion";
import Categoria from "./components/categoria/Categoria";
import Empresa from "./components/empresa/Empresa";
import Marca from "./components/marca/Marca";
import Motivo_solicitud from "./components/motivo_solicitud/Motivo_solicitud";
import Opcion from "./components/opcion/Opcion";
import Pais from "./components/pais/Pais";
import Provincia from "./components/provincia/Provincia";
import Tipo_adjunto from "./components/tipo_adjunto/Tipo_adjunto";
import Tipo_alimentacion from "./components/tipo_alimentacion/Tipo_alimentacion";
import Tipo_archivo from "./components/tipo_archivo/Tipo_archivo";
import Tipo_componente from "./components/tipo_componente/Tipo_componente";
import Tipo_comprobante from "./components/tipo_comprobante/Tipo_comprobante";

function App() {
  return (
    <HashRouter>
      <EquipaProvider>
        <Layout>
          <Routes>
            <Route exact path="/*" element={<Login />} />
            <Route path="/login" element={<Login />} />
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
              path="/categoria"
              element={
                <PrivateRoute>
                  <Categoria />
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
              path="/pais"
              element={
                <PrivateRoute>
                  <Pais />
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
          </Routes>
        </Layout>
      </EquipaProvider>
    </HashRouter>
  );
}

export default App;
