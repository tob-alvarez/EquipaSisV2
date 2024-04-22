/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { EquipaContext } from "../context/EquipaContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { getAuth, authenticated, loading } = useContext(EquipaContext);
  
    useEffect(() => {
      getAuth();
    }, []);
  
    return loading ? (
      <div>Cargando</div>
    ) : authenticated ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  };
  
  export default PrivateRoute;