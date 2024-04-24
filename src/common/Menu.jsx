/* eslint-disable react/prop-types */
import { Collapse, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material"
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ComputerIcon from '@mui/icons-material/Computer';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import GroupsIcon from '@mui/icons-material/Groups';
import DescriptionIcon from '@mui/icons-material/Description';
import FlagIcon from '@mui/icons-material/Flag';
import SettingsIcon from '@mui/icons-material/Settings';

const MenuLateral = ({ menuItems, open, setOpen }) => {
    const navigate = useNavigate()
    const redirigir = (ruta) => {
        navigate(ruta);
    };
    const [openLists, setOpenLists] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [openSubMenu, setOpenSubMenu] = useState(null);

    const handleClick = (label) => {
        setOpen(true);
        setOpenSubMenu(label); // Actualiza el submenú abierto actualmente

        // Cierra cualquier otro submenú que esté abierto
        Object.keys(openLists).forEach((key) => {
            if (key !== label) {
                setOpenLists((prevState) => ({
                    ...prevState,
                    [key]: false,
                }));
            }
        });

        setOpenLists((prevState) => ({
            ...prevState,
            [label]: !prevState[label]
        }));
    };

    // if (Array.isArray(menuItems)) {
    //     // Verificar si menuItems es un array
    //     const ultimoItem = menuItems[menuItems.length - 1];
    //     if (ultimoItem && Array.isArray(ultimoItem.subItems) && ultimoItem.subItems.length > 0) {
    //         // Verificar si el último elemento tiene subItems y no está vacío
    //         ultimoItem.subItems.sort((a, b) => {
    //             // Comparar las etiquetas de los elementos a y b
    //             const labelA = a.label.toUpperCase(); // Convertir las etiquetas a mayúsculas para una comparación sin distinción entre mayúsculas y minúsculas
    //             const labelB = b.label.toUpperCase();
    //             if (labelA < labelB) {
    //                 return -1;
    //             }
    //             if (labelA > labelB) {
    //                 return 1;
    //             }
    //             return 0; // Los elementos son iguales
    //         });
    //     } else {
    //         console.log('El último elemento no tiene subItems o está vacío');
    //     }
    // } else {
    //     console.log('menuItems no es un array');
    // }

    const mapearIcono = (nombreOpcion) => {
        switch (nombreOpcion) {
            case 'PANEL DE GESTION':
                return <LeaderboardIcon />;
            case 'MANAGEMENT PANEL':
                return <LeaderboardIcon />;
            case 'PAINEL DE GESTÃO':
                return <LeaderboardIcon />;
            case 'ACTIVOS':
                return <ComputerIcon />;
            case 'ASSETS':
                return <ComputerIcon />;
            case 'ATIVOS':
                return <ComputerIcon />;
            case 'SOLICITUDES':
                return <ChecklistRtlIcon />;
            case 'APPLICATIONS':
                return <ChecklistRtlIcon />;
            case 'FORMULÁRIOS':
                return <ChecklistRtlIcon />;
            case 'CALENDARIO':
                return <GroupsIcon />;
            case 'CALENDAR':
                return <GroupsIcon />;
            case 'CALENDÁRIO':
                return <GroupsIcon />;
            case 'GESTION TECNICA':
                return <DescriptionIcon />;
            case 'TECHNICAL MANAGEMENT':
                return <DescriptionIcon />;
            case 'GESTÃO TÉCNICA':
                return <DescriptionIcon />;
            case 'REPORTES':
                return <FlagIcon />;
            case 'REPORTS':
                return <FlagIcon />;
            case 'RELATÓRIOS':
                return <FlagIcon />;
            case 'CONFIGURACION':
                return <SettingsIcon />;
            case 'CONFIGURATION':
                return <SettingsIcon />;
            case 'CONFIGURAÇÃO':
                return <SettingsIcon />;
            default:
                return <HomeIcon />;
        }
    };

    return (
        <>
            <List>
                <ListItem disablePadding sx={{ display: "block", padding: 0 }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                justifyContent: "center",
                                paddingRight: 2
                            }}
                        >
                            <HomeIcon />
                        </ListItemIcon>
                        {/* <ListItemText
                            primary={"INICIO"}
                            onClick={() => redirigir(`/inicio`)}
                            sx={{ opacity: open ? 1 : 0 }}
                        /> */}
                        <span
                            onClick={() => redirigir(`/inicio`)}
                            style={{ opacity: open ? 1 : 0, fontSize: '0.8rem' }}
                        >
                            INICIO
                        </span>
                    </ListItemButton>
                </ListItem>
                {menuItems?.map((item, index) => (
                    <div key={index}>
                        {/* Elemento del menú */}
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                px: 2.5
                            }}
                            onClick={() => handleClick(item.label)}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    justifyContent: "left",
                                    paddingRight: 2
                                }}
                            >
                                {mapearIcono(item.label)}
                            </ListItemIcon>
                            {/* <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} /> */}
                            <span
                            style={{ opacity: open ? 1 : 0, fontSize: '0.8rem' }}
                        >
                            {item.label}
                        </span>
                            {item.subItems && (openLists[item.label] ? <ExpandLess sx={{ opacity: open ? 1 : 0 }} /> : <ExpandMore sx={{ opacity: open ? 1 : 0 }} />)}
                        </ListItemButton>

                        {/* Sub-elementos del menú si existen */}
                        {item.subItems && (
                            <Collapse in={openLists[item.label]} timeout="auto" unmountOnExit>
                                <List component="div">
                                    {item.subItems.map((subItem, subIndex) => (
                                        <ListItemButton
                                            key={subIndex}
                                            component="a"
                                            className="w-100"
                                            sx={{ paddingY: 0 }}
                                            onClick={() => redirigir(`/${subItem.path}`)}
                                        >
                                            {/* <ListItemText primary={subItem.label} sx={{ opacity: open ? 1 : 0, paddingLeft: 5, }} /> */}
                                            <span  style={{ opacity: open ? 1 : 0, paddingLeft: 50, paddingTop: 5, fontSize: '0.8rem'}}>{subItem.label}</span>
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </div>
                ))}
            </List>

        </>
    )
}

export default MenuLateral;
