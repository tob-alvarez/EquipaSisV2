/* eslint-disable react/prop-types */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ingles from '../assets/united-kingdom.svg'
import spain from '../assets/spain.svg'
import portugal from '../assets/portugal.svg'
import { EquipaContext } from "../context/EquipaContext";
import './Layout.css'
import {
  Avatar,
  Menu,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import Footer from "./Footer";
import Reloj from "./Reloj";
import MenuLateral from "./Menu";
import { useNavigate } from "react-router-dom";

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { handleChangeLanguage, authenticated, logout, getAuth, permisos, permisosMenu} = React.useContext(EquipaContext);
  const navigate = useNavigate()
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const nombre = localStorage.getItem('nombre')
  const rol = localStorage.getItem('rol')
  const handleLogout = ()=>{
    logout()
  }
  
  React.useEffect(() => {
    getAuth();
    let token = sessionStorage.getItem('token')
    let data = {
      "token": token
    }
    permisosMenu(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const language = localStorage.getItem('language');

  const permisosHabilitados = permisos?.filter(permiso => permiso.ver_opcion === '1');
  const menuItems = permisosHabilitados?.reduce((menu, permiso) => {
    const labelKey = `padre_${language}`;
    const subLabelKey = `hijo_${language}`;
  
    const menuItemIndex = menu.findIndex(item => item.label === permiso[labelKey]);
    if (menuItemIndex === -1) {
      // Si no existe un menuItem con el mismo padre, lo creamos
      const menuItem = {
        label: permiso[labelKey],
        subItems: [{ label: permiso[subLabelKey], path: permiso.path }]
      };
      menu.push(menuItem);
    } else {
      // Si ya existe un menuItem con el mismo padre, agregamos el subItem
      menu[menuItemIndex].subItems.push({ label: permiso[subLabelKey], path: permiso.path });
    }
    return menu;
  }, []);

    
  return authenticated ? (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="d-flex align-items-center">
                <Typography variant="h6" noWrap component="div">
                  Equipasis v2
                </Typography>
                <Select
                  value={localStorage.getItem("language") || "en"}
                  onChange={(e) => handleChangeLanguage(e.target.value)}
                  sx={{ marginLeft: 5 }}
                  className="text-white"
                >
                  <MenuItem value={"en"}>
                    EN <img src={ingles} className="icono-lang ps-2" />
                  </MenuItem>
                  <MenuItem value={"es"}>
                    ES <img src={spain} className="icono-lang ps-2" />
                  </MenuItem>
                  <MenuItem value={"por"}>
                    POR <img src={portugal} className="icono-lang ps-2" />
                  </MenuItem>
                </Select>
              </div>
              <div>
                <p
                  className="m-0 px-2 nombreNavbar"
                  style={{ fontSize: ".71rem" }}
                >
                  {nombre}
                </p>
                <p
                  className="m-0 px-2 nombreNavbar"
                  style={{ fontSize: ".61rem" }}
                >
                  {rol}
                </p>
                <Reloj />
              </div>
            </div>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={nombre} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => navigate('/perfil')}>
                  <Typography textAlign="center">Perfil</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Lougout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <MenuLateral menuItems={menuItems} open={open} setOpen={setOpen}/>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
      <Footer />
    </>
  ) : (
    <>
      {children}
      <Footer />
    </>
  );
}
