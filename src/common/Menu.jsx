/* eslint-disable react/prop-types */
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
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

const MenuLateral = ({menuItems, open}) => {
    const navigate = useNavigate()
    const redirigir = (ruta) => {
        navigate(ruta);
    };
    const [openLists, setOpenLists] = useState({});
    
    const handleClick = (label) => {
        setOpenLists(prevState => ({
            ...prevState,
            [label]: !prevState[label]
        }));
    };
    const ultimoItem = menuItems[menuItems.length - 1];
    ultimoItem.subItems.sort((a, b) => {
    // Comparar los subItems por su label
    return a.label.localeCompare(b.label);
    });

    const mapearIcono = (nombreOpcion) => {
        switch (nombreOpcion) {
            case 'PANEL DE GESTION':
                return <LeaderboardIcon />;
            case 'ACTIVOS':
                return <ComputerIcon />;
            case 'SOLICITUDES':
                return <ChecklistRtlIcon />;
            case 'CALENDARIO':
                return <GroupsIcon />;
            case 'GESTION TECNICA':
                return <DescriptionIcon />;
            case 'REPORTES':
                return <FlagIcon />;
            case 'CONFIGURACION':
                return <SettingsIcon />;
            default:
                return <HomeIcon />;
        }
    };

    return (
        <>
            <List>
                <ListItem disablePadding sx={{ display: "block" }}>
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
                            }}
                        >
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={"INICIO"}
                            onClick={() => redirigir(`/inicio`)}
                            sx={{opacity: open ? 1 : 0}}
                        />
                    </ListItemButton>
                </ListItem>
                {menuItems?.map((item, index) => (
                    <div
                        key={index}
                        className="d-flex justify-content-between w-100 flex-column m-0"
                    >
                        {/* Elemento del menú */}
                        <ListItemButton sx={{
                            minHeight: 48,
                            px: 2.5
                        }} onClick={() => handleClick(item.label)}>
                            <ListItemIcon sx={{
                                minWidth: 0,
                                justifyContent: "left",
                            }}>{mapearIcono(item.label)}</ListItemIcon>
                            <ListItemText primary={item.label} sx={{opacity: open ? 1 : 0}}/>
                            {item.subItems &&
                                (openLists[item.label] ? <ExpandLess sx={{opacity: open ? 1 : 0}}/> : <ExpandMore sx={{opacity: open ? 1 : 0}}/>)}
                        </ListItemButton>

                        {/* Sub-elementos del menú si existen */}
                        {item.subItems && (
                            <Collapse
                                in={openLists[item.label]}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List component="div">
                                    {item.subItems.map((subItem, subIndex) => (
                                        <ListItemButton
                                            key={subIndex}
                                            component="a"
                                            className="w-100"
                                            >
                                            <ListItemText
                                                primary={subItem.label}
                                                onClick={() => redirigir(`/${subItem.path}`)}
                                                sx={{opacity: open ? 1 : 0}}
                                            />
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
