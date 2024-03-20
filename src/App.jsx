// App.jsx
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import EquipaProvider from "./context/EquipaContext";
import Home from "./components/Home/Home";
import Layout from "./common/Layout";
import Login from "./components/Login/Login";
import PrivateRoute from "./routes/PrivateRoute";

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
          </Routes>
        </Layout>
      </EquipaProvider>
    </HashRouter>
  );
}

export default App;
