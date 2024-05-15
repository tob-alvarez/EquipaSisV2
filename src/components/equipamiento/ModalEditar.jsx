/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { cambia_acciones, trae_combos } from "./funciones_equipamiento";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useTranslation } from "react-i18next";
import { Switch } from "@mui/material";
import { EquipaContext } from "../../context/EquipaContext";

import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MarkChatReadOutlined } from "@mui/icons-material";

const ModalEditar = ({ dato, dedonde }) => {

  console.log(dato)
  const [t] = useTranslation("global");
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  ///////////////// CAMPOS DE LA TABLA ///////////////////////////////////
  const [organizacion, setOrganizacion] = useState(dato.id_organizacion);
  const [servicio, setServicio] = useState(dato.id_servicio);
  const [inventariobio, setInventarioBio] = useState(dato.num_inventario);
  const [tequipa, setTequipa] = useState(dato.id_tequipo);
  const [marca, setMarca] = useState(dato.id_marca);
  const [pais, setPais] = useState(dato.id_pais);
  const [modelo, setModelo] = useState(dato.modelo);
  const [anmat, setAnmat] = useState(dato.num_anmat);
  const [invpatrimonial, setInvpatrimonial] = useState(dato.num_patrimonial);
  const [proveedore, setProveedore] = useState(dato.num_id_proveedor);
  const [anofabrica, setAnofabrica] = useState(dato.anio_fabricacion);
  const [software, setSoftware] = useState(dato.id_software);
  const [nroserie, setNroserie] = useState(dato.num_serie);
  const [talimenta, setTalimenta] = useState(dato.id_talimenta);
  const [estadoequipo, setEstadoequipo] = useState(dato.id_estado);
  const [vtogarantia, setVtogarantia] = useState(dato.garantia);
  const [valordolar, setValordolar] = useState(dato.valor_compra);
  const [fechacompra, setFechacompra] = useState(dato.fecha_compra);
  const [mesamortiza, setMesamortiza] = useState(dato.amortiza);
  const [tpertenencia, setTpertenencia] = useState(dato.id_tpertenecia);
  const [valorcontrol, setValorcontrol] = useState(dato.valor_control);
  const [fechainstala, setFechainstala] = useState(dato.fecha_instala);
  const [obseestado, setObseestado] = useState(dato.observa_estado);
  const [archivoad, setArchivoad] = useState(false);
  const [foto, setfoto] = useState(false);
  const [manuusuario, setManuusuario] = useState(false);
  const [habilita, setHabilita] = useState(false);
  ///////////////////////////////////////////////////////////////////////

  const { actualizador } = useContext(EquipaContext);

  ///////////////// COMBOS /////////////////////////////////
  const [comboOrganizacion, setComboOrganizacion] = useState([]);
  const [comboServicio, setComboServicio] = useState([]);
  const [comboTequipa, setComboTequipa] = useState([]);
  const [comboMarca, setComboMarca] = useState([]);
  const [comboPais, setComboPais] = useState([]);
  const [comboSoftware, setComboSoftware] = useState([]);
  const [combotalimenta, setComboTalimenta] = useState([]);
  const [comboEstadoEquipo, setComboEstadoEquipo] = useState([]);
  const [comboTpertenencia, setComboTpertenencia] = useState([]);

  ////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    /////////////////////////////////////////////////////////////////////
    trae_combos("organizacion", sessionStorage.getItem("token")).then(
      (datos_organizacion) =>
        setComboOrganizacion(
          datos_organizacion.sort((a, b) =>
            a.nombre_organizacion.localeCompare(b.nombre_organizacion)
          )
        )
    );
    trae_combos("tipo_equipo", sessionStorage.getItem("token")).then(
      (datos_tequipo) =>
        setComboTequipa(
          datos_tequipo.sort((a, b) =>
            a.nombre_tequipo.localeCompare(b.nombre_tequipo)
          )
        )
    );
    trae_combos("marca", sessionStorage.getItem("token")).then((datos_marca) =>
      setComboMarca(
        datos_marca.sort((a, b) => a.nombre_marca.localeCompare(b.nombre_marca))
      )
    );
    trae_combos("pais", sessionStorage.getItem("token")).then((datos_pais) =>
      setComboPais(
        datos_pais.sort((a, b) => a.nombre_pais.localeCompare(b.nombre_pais))
      )
    );
    trae_combos("software", sessionStorage.getItem("token")).then(
      (datos_software) =>
        setComboSoftware(
          datos_software.sort((a, b) =>
            a.nombre_software.localeCompare(b.nombre_software)
          )
        )
    );
    trae_combos("tipo_alimentacion", sessionStorage.getItem("token")).then(
      (datos_alimentacion) =>
        setComboTalimenta(
          datos_alimentacion.sort((a, b) =>
            a.nombre_talimentacion.localeCompare(b.nombre_talimentacion)
          )
        )
    );
    trae_combos("estado_equipo", sessionStorage.getItem("token")).then(
      (datos_estadoequipo) =>
        setComboEstadoEquipo(
          datos_estadoequipo.sort((a, b) =>
            a.nombre_estado.localeCompare(b.nombre_estado)
          )
        )
    );
    trae_combos("tipo_pertenencia", sessionStorage.getItem("token")).then(
      (datos_tpertenencia) =>
        setComboTpertenencia(
          datos_tpertenencia.sort((a, b) =>
            a.nombre_tpertenencia.localeCompare(b.nombre_tpertenencia)
          )
        )
    );
    /////////////////////////////////////////////////////////////////////

    if (isModalEditOpen && dato) {
      if (dato.habilita == 1) {
        setHabilita(true);
      } else {
        setHabilita(false);
      }
    }
    combo_servicios(organizacion);
    setServicio(dato.id_servicio);
  }, [isModalEditOpen, dato]);

  function combo_servicios(valor) {
    setServicio("");
    trae_combos("servicio", valor == "" ? "0" : valor).then((datos_servicio) =>
      setComboServicio(
        datos_servicio.sort((a, b) =>
          a.nombre_servicio.localeCompare(b.nombre_servicio)
        )
      )
    );
  }

  const limpia_campos = () => {
    /*     setId_accion("");
    setNombre_accion("");
    setNombre_corto_accion(""); */
    setHabilita(false);
  };
  const closeModalEdit = () => {
    limpia_campos();
    setIsModalEditOpen(false);
  };
  const acepta_accion = () => {
    const datos_cambios = {
      id_accion: dato.id_accion,
      nombre_accion: nombre_accion,
      corto_accion: nombre_corto_accion,
      habilita: habilita === true ? "1" : "0",
    };

    cambia_acciones(datos_cambios).then((respuesta_accion) => {
      if (respuesta_accion[0].registros > 0) {
        toast.success(`${t("varios.editado")}`, {
          duration: 1500,
        });
        limpia_campos();
        actualizador();
      } else {
        toast.error(`${respuesta_accion[0].Mensage}`, {
          duration: 1500,
          className: "bg-success text-white fs-6",
        });
      }
      setIsModalEditOpen(false);
    });
  };

  return (
    <>
      <Modal
        show={isModalEditOpen}
        onHide={closeModalEdit}
        size="lg"
        backdrop="static"
        keyboard={false}
        scrollable={true}
        style={{ maxHeight: "700px" }}
        className="mt-5"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {dedonde==0?t("equipamiento.editarTitulo"):t("equipamiento.agregarTitulo")}
            <p
              className="pb-0 mb-0 text-body-emphasis fw-bold"
              style={{ fontSize: "0.5em" }}
            >
              {t("equipamiento.datoObligatorio")}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="p-3" style={{ backgroundColor: "#f6f5fa" }}>
            <div className="row">
              <div className="col-6">
                {/*                 <label htmlFor="name" className="label-material mb-1">
                  {t("equipamiento.nombre_organizacion")}: #
                </label>
                <InputGroup>
                  <Form.Control
                    id="nombre_accion"
                    value={nombre_accion}
                    onChange={(e) => setNombre_accion(e.target.value)}
                    onKeyUp={(e) =>
                      setNombre_accion(e.target.value.toUpperCase())
                    }
                    className="mb-2"
                  />
                </InputGroup> */}
                <FormControl fullWidth size="small">
                  <InputLabel
                    sx={{ fontSize: 14 }}
                    id="demo-select-small-label"
                  >
                    {t("equipamiento.seleccione_organizacion") + " #"}
                  </InputLabel>
                  <Select
                    sx={{ fontSize: 14, fontWeight: "medium" }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={organizacion}
                    label={t("equipamiento.seleccione_organizacion") + " #"}
                    MenuProps={{ style: { maxHeight: "300px" } }}
                    onChange={(e) => {
                      setOrganizacion(e.target.value);
                      combo_servicios(e.target.value);
                    }}
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>None</em>
                    </MenuItem>
                    {comboOrganizacion?.map((opcion, index) => (
                      <MenuItem
                        key={index}
                        sx={{ fontSize: 12, fontWeight: "medium" }}
                        value={opcion.id_organizacion}
                      >
                        {opcion.nombre_organizacion}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="col-6 ">
                <FormControl fullWidth size="small">
                  <InputLabel
                    sx={{ fontSize: 14 }}
                    id="demo-select-small-label"
                  >
                    {t("equipamiento.seleccione_servicio") + " #"}
                  </InputLabel>
                  <Select
                    sx={{ fontSize: 14, fontWeight: "medium" }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={servicio}
                    label={t("equipamiento.seleccione_servicio") + " #"}
                    onChange={(e) => setServicio(e.target.value)}
                    MenuProps={{ style: { maxHeight: "300px" } }}
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>None</em>
                    </MenuItem>
                    {comboServicio?.map((opcion, index) => (
                      <MenuItem
                        key={index}
                        sx={{ fontSize: 12, fontWeight: "medium" }}
                        value={opcion.id_servicio}
                      >
                        {opcion.nombre_servicio}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <TextField
                  sx={{
                    "& .MuiInputLabel-outlined": {
                      fontSize: "14px",
                    },
                  }}
                  inputProps={{
                    style: { fontSize: "14px", fontWeight: "500" },
                  }}
                  fullWidth
                  label={t("equipamiento.num_inventario") + "Bio"}
                  id="fullWidth"
                  size="small"
                  value={inventariobio}
                  onChange={(e) => setInventarioBio(e.target.value)}
                />
              </div>

              <div className="col-6">
                <FormControl fullWidth size="small">
                  <InputLabel
                    sx={{ fontSize: 14 }}
                    id="demo-select-small-label"
                  >
                    {t("equipamiento.seleccione_tequipo") + " #"}
                  </InputLabel>
                  <Select
                    sx={{ fontSize: 14, fontWeight: "medium", maxHeight: 200 }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={tequipa}
                    label={t("equipamiento.seleccione_tequipo") + " #"}
                    onChange={(e) => setTequipa(e.target.value)}
                    MenuProps={{ style: { maxHeight: "300px" } }}
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>None</em>
                    </MenuItem>
                    {comboTequipa?.map((opcion, index) => (
                      <MenuItem
                        key={index}
                        sx={{ fontSize: 12, fontWeight: "medium" }}
                        value={opcion.id_tequipo}
                      >
                        {opcion.nombre_tequipo}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <FormControl fullWidth size="small">
                  <InputLabel
                    sx={{ fontSize: 14 }}
                    id="demo-select-small-label"
                  >
                    {t("equipamiento.seleccione_marca") + " #"}
                  </InputLabel>
                  <Select
                    sx={{ fontSize: 14, fontWeight: "medium", maxHeight: 200 }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={marca}
                    label={t("equipamiento.seleccione_marca") + " #"}
                    onChange={(e) => setMarca(e.target.value)}
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>None</em>
                    </MenuItem>
                    {comboMarca?.map((opcion, index) => (
                      <MenuItem
                        key={index}
                        sx={{ fontSize: 12, fontWeight: "medium" }}
                        value={opcion.id_marca}
                      >
                        {opcion.nombre_marca}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-6">
                <TextField
                  sx={{
                    "& .MuiInputLabel-outlined": {
                      fontSize: "14px",
                    },
                  }}
                  inputProps={{
                    style: { fontSize: "14px", fontWeight: "500" },
                  }}
                  fullWidth
                  label={t("equipamiento.modelo") + " #"}
                  id="fullWidth"
                  size="small"
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <TextField
                  sx={{
                    "& .MuiInputLabel-outlined": {
                      fontSize: "14px",
                    },
                  }}
                  inputProps={{
                    style: { fontSize: "14px", fontWeight: "500" },
                  }}
                  fullWidth
                  label={t("equipamiento.num_serie") + " #"}
                  id="fullWidth"
                  size="small"
                  value={nroserie}
                  onChange={(e) => setNroserie(e.target.value)}
                />
              </div>
              <div className="col-6">
                <TextField
                  sx={{
                    "& .MuiInputLabel-outlined": {
                      fontSize: "14px",
                    },
                  }}
                  inputProps={{
                    style: { fontSize: "14px", fontWeight: "500" },
                  }}
                  fullWidth
                  label={t("equipamiento.num_anmat")}
                  id="fullWidth"
                  size="small"
                  value={anmat}
                  onChange={(e) => setAnmat(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <TextField
                  sx={{
                    "& .MuiInputLabel-outlined": {
                      fontSize: "14px",
                    },
                  }}
                  inputProps={{
                    style: { fontSize: "14px", fontWeight: "500" },
                  }}
                  fullWidth
                  label={t("equipamiento.num_patrimonial")}
                  id="fullWidth"
                  size="small"
                  value={invpatrimonial}
                  onChange={(e) => setInvpatrimonial(e.target.value)}
                />
              </div>
              <div className="col-6">
                <TextField
                  sx={{
                    "& .MuiInputLabel-outlined": {
                      fontSize: "14px",
                    },
                  }}
                  inputProps={{
                    style: { fontSize: "14px", fontWeight: "500" },
                  }}
                  fullWidth
                  label={t("equipamiento.num_id_proveedor")}
                  id="fullWidth"
                  size="small"
                  value={proveedore}
                  onChange={(e) => setProveedore(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <TextField
                  sx={{
                    "& .MuiInputLabel-outlined": {
                      fontSize: "14px",
                    },
                  }}
                  inputProps={{
                    style: { fontSize: "14px", fontWeight: "500" },
                  }}
                  fullWidth
                  label={t("equipamiento.anio_fabricación")}
                  id="fullWidth"
                  size="small"
                  value={anofabrica}
                  onChange={(e) => setAnofabrica(e.target.value)}
                />
              </div>
              <div className="col-6">
                <FormControl fullWidth size="small">
                  <InputLabel
                    sx={{ fontSize: 14 }}
                    id="demo-select-small-label"
                  >
                    {t("equipamiento.seleccione_pais") + " #"}
                  </InputLabel>
                  <Select
                    sx={{ fontSize: 14, fontWeight: "medium", maxHeight: 200 }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={pais}
                    label={t("equipamiento.seleccione_pais") + " #"}
                    onChange={(e) => setPais(e.target.value)}
                    MenuProps={{ style: { maxHeight: "300px" } }}
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>None</em>
                    </MenuItem>
                    {comboPais?.map((opcion, index) => (
                      <MenuItem
                        key={index}
                        sx={{ fontSize: 12, fontWeight: "medium" }}
                        value={opcion.id_pais}
                      >
                        {opcion.nombre_pais}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <FormControl fullWidth size="small">
                  <InputLabel
                    sx={{ fontSize: 14 }}
                    id="demo-select-small-label"
                  >
                    {t("equipamiento.seleccione_software") + " #"}
                  </InputLabel>
                  <Select
                    sx={{ fontSize: 14, fontWeight: "medium", maxHeight: 200 }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={software}
                    label={t("equipamiento.seleccione_software") + " #"}
                    onChange={(e) => setSoftware(e.target.value)}
                    MenuProps={{ style: { maxHeight: "300px" } }}
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>None</em>
                    </MenuItem>
                    {comboSoftware?.map((opcion, index) => (
                      <MenuItem
                        key={index}
                        sx={{ fontSize: 12, fontWeight: "medium" }}
                        value={opcion.id_software}
                      >
                        {opcion.nombre_software}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-6">
                <FormControl fullWidth size="small">
                  <InputLabel
                    sx={{ fontSize: 14 }}
                    id="demo-select-small-label"
                  >
                    {t("equipamiento.seleccione_talimentacion") + " #"}
                  </InputLabel>
                  <Select
                    sx={{ fontSize: 14, fontWeight: "medium", maxHeight: 200 }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={talimenta}
                    label={t("equipamiento.seleccione_talimentacion") + " #"}
                    onChange={(e) => setTalimenta(e.target.value)}
                    MenuProps={{ style: { maxHeight: "300px" } }}
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>None</em>
                    </MenuItem>
                    {combotalimenta?.map((opcion, index) => (
                      <MenuItem
                        key={index}
                        sx={{ fontSize: 12, fontWeight: "medium" }}
                        value={opcion.id_talimentacion}
                      >
                        {opcion.nombre_talimentacion}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <FormControl fullWidth size="small">
                  <InputLabel
                    sx={{ fontSize: 14 }}
                    id="demo-select-small-label"
                  >
                    {t("equipamiento.seleccione_estado") + " #"}
                  </InputLabel>
                  <Select
                    sx={{ fontSize: 14, fontWeight: "medium", maxHeight: 200 }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={estadoequipo}
                    label={t("equipamiento.seleccione_estado") + " #"}
                    onChange={(e) => setEstadoequipo(e.target.value)}
                    MenuProps={{ style: { maxHeight: "300px" } }}
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>None</em>
                    </MenuItem>
                    {comboEstadoEquipo?.map((opcion, index) => (
                      <MenuItem
                        key={index}
                        sx={{ fontSize: 12, fontWeight: "medium" }}
                        value={opcion.id_estado}
                      >
                        {opcion.nombre_estado}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-6">
                <TextField
                  sx={{
                    "& .MuiInputLabel-outlined": {
                      fontSize: "14px",
                    },
                  }}
                  inputProps={{
                    style: { fontSize: "14px", fontWeight: "500" },
                  }}
                  fullWidth
                  label={t("equipamiento.garantia")}
                  id="fullWidth"
                  size="small"
                  value={vtogarantia}
                  onChange={(e) => setVtogarantia(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <TextField
                  sx={{
                    "& .MuiInputLabel-outlined": {
                      fontSize: "14px",
                    },
                  }}
                  inputProps={{
                    style: { fontSize: "14px", fontWeight: "500" },
                  }}
                  fullWidth
                  label={t("equipamiento.valor_compra")}
                  id="fullWidth"
                  size="small"
                  value={valordolar}
                  onChange={(e) => setValordolar(e.target.value)}
                />
              </div>
              <div className="col-6">
                <TextField
                  sx={{
                    "& .MuiInputLabel-outlined": {
                      fontSize: "14px",
                    },
                  }}
                  inputProps={{
                    style: { fontSize: "14px", fontWeight: "500" },
                  }}
                  fullWidth
                  label={t("equipamiento.fecha_compra")}
                  id="fullWidth"
                  size="small"
                  value={fechacompra}
                  onChange={(e) => setFechacompra(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <TextField
                  sx={{
                    "& .MuiInputLabel-outlined": {
                      fontSize: "14px",
                    },
                  }}
                  inputProps={{
                    style: { fontSize: "14px", fontWeight: "500" },
                  }}
                  fullWidth
                  label={t("equipamiento.amortiza")}
                  id="fullWidth"
                  size="small"
                  value={mesamortiza}
                  onChange={(e) => setMesamortiza(e.target.value)}
                />
              </div>
              <div className="col-6">
                <FormControl fullWidth size="small">
                  <InputLabel
                    sx={{ fontSize: 14 }}
                    id="demo-select-small-label"
                  >
                    {t("equipamiento.seleccione_tpertenencia") + " #"}
                  </InputLabel>
                  <Select
                    sx={{ fontSize: 14, fontWeight: "medium", maxHeight: 200 }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={tpertenencia}
                    label={t("equipamiento.seleccione_tpertenencia") + " #"}
                    onChange={(e) => setTpertenencia(e.target.value)}
                    MenuProps={{ style: { maxHeight: "300px" } }}
                  >
                    <MenuItem
                      value=""
                      sx={{ fontSize: 12, fontWeight: "medium" }}
                    >
                      <em>None</em>
                    </MenuItem>
                    {comboTpertenencia?.map((opcion, index) => (
                      <MenuItem
                        key={index}
                        sx={{ fontSize: 12, fontWeight: "medium" }}
                        value={opcion.id_tpertenencia}
                      >
                        {opcion.nombre_tpertenencia}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <TextField
                  sx={{
                    "& .MuiInputLabel-outlined": {
                      fontSize: "14px",
                    },
                  }}
                  inputProps={{
                    style: { fontSize: "14px", fontWeight: "500" },
                  }}
                  fullWidth
                  label={t("equipamiento.valor_control")}
                  id="fullWidth"
                  size="small"
                  value={valorcontrol}
                  onChange={(e) => setValorcontrol(e.target.value)}
                />
              </div>
              <div className="col-6">
                <TextField
                  sx={{
                    "& .MuiInputLabel-outlined": {
                      fontSize: "14px",
                    },
                  }}
                  inputProps={{
                    style: { fontSize: "14px", fontWeight: "500" },
                  }}
                  fullWidth
                  label={t("equipamiento.fecha_instala")}
                  id="fullWidth"
                  size="small"
                  value={fechainstala}
                  onChange={(e) => setFechainstala(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <TextField
                  sx={{
                    "& .MuiInputLabel-outlined": {
                      fontSize: "14px",
                    },
                    style: { fontSize: 10 },
                  }}
                  inputProps={{
                    style: { fontSize: 10, fontWeight: "500" },
                  }}
                  fullWidth
                  multiline={true}
                  rows="3"
                  label={t("equipamiento.observa")}
                  id="fullWidth"
                  size="small"
                  value={obseestado}
                  onChange={(e) => setObseestado(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-3  border-bottom border-dark">
              <div className="col-6 text-center align-self-center">
                {"Archivo adjunto"}
                <Switch
                  id={"habilita"}
                  checked={archivoad}
                  label={"Archivo adjunto"}
                  onChange={(e) => setArchivoad(e.target.checked)}
                />
              </div>
              <div className="col-6   mb-3 text-center align-self-center">
                {"Posee foto"}
                <Switch
                  id={"habilita"}
                  checked={foto}
                  label={"Posee foto"}
                  onChange={(e) => setfoto(e.target.checked)}
                />
              </div>
            </div>
            {/* ********************************************************** */}
            <div className="row align-items-center mt-3">
              <div className="col-12 text-center align-self-center">
                {t("accion.habilitado")}
                <Switch
                  id={"habilita"}
                  checked={habilita}
                  label={t("accion.habilitado")}
                  onChange={(e) => setHabilita(e.target.checked)}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="justify-content-center mt-2">
            <button
              onClick={acepta_accion}
              className="btn btn-primary btn-sm m-2"
              style={{
                float: "right",
                backgroundColor: "green",
                borderColor: "green",
              }}
            >
              {t("login.aceptar")}
            </button>
            <button
              onClick={closeModalEdit}
              className="btn btn-secondary btn-sm m-2"
              style={{
                float: "right",
                backgroundColor: "#990000",
                borderColor: "#990000",
              }}
            >
              {t("login.cancelar")}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    {dedonde == 0 ?
      <EditIcon
        onClick={() => setIsModalEditOpen(true)}
        sx={{ fontSize: "20px" }}
        style={{ cursor: "pointer" }}
      />
      :<AddCircleOutlineOutlinedIcon
      onClick={() => setIsModalEditOpen(true)}
      sx={{ fontSize: '40px' }}
      style={{ cursor: "pointer" }} />}
    </>
  );
};

export default ModalEditar;
