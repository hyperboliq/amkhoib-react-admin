import React, { useState } from 'react';
import { useLogout } from 'react-admin';
import { Box, Divider, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

import logo from '../media/A-icon.png';

type MenuItemProps = {
    to: string;
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
    isSelected: boolean;
};

const MyMenu = () => {
    const logout = useLogout();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        logout();
        handleClose();
    };

    return (
        <Box
            sx={{
                width: 100,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#071135',
                color: '#fff',
                py: 2,
            }}
        >
            <Box>
                {/* Logo Section */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px',
                    }}
                >
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                        }}
                    />
                </Box>

                {/* Divider */}
                <Divider sx={{ width: '80%', backgroundColor: '#1e284d', margin: '10px 0' }} />

                {/* Menu Items */}
                <MenuItem to="/" icon={<HomeIcon />} text="Home" isSelected={location.pathname === '/'} />
                <MenuItem to="/clients" icon={<ContactMailIcon />} text="Clients" isSelected={location.pathname === '/clients'} />
                <MenuItem to="/projects" icon={<DeveloperBoardIcon />} text="Projects" isSelected={location.pathname === '/projects'} />
                <MenuItem to="/users" icon={<GroupIcon />} text="People" isSelected={location.pathname === '/users'} />
                <MenuItem to="/contractors" icon={<BusinessCenterIcon />} text="Contractors" isSelected={location.pathname === '/contractors'} />
                <MenuItem to="/documents" icon={<DescriptionIcon />} text="Documents" isSelected={location.pathname === '/documents'} />
                {/* <MenuItem to="/manyToMany" icon={<DescriptionIcon />} text="ManyToMany" isSelected={location.pathname === '/manyToMany'} /> */}
                <MenuItem to="/disciplines" icon={<AccountTreeIcon />} text="Disciplines" isSelected={location.pathname === '/disciplines'} />
            </Box>

            {/* Logout Item */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px 0',
                    cursor: 'pointer',
                    '& svg': {
                        color: '#fff',
                    },
                    '& .MuiTypography-caption': {
                        color: '#fff',
                    },
                }}
                onClick={handleClickOpen}
            >
                <MeetingRoomIcon />
                <Typography variant="caption" sx={{ marginTop: 1 }}>
                    Logout
                </Typography>
            </Box>

            {/* Confirm Logout Dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
                <DialogContent>
                    {<MeetingRoomIcon />}
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLogout} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

const MenuItem = ({ to, icon, text, onClick, isSelected }: MenuItemProps) => (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }} onClick={onClick}>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px 0',
                '& svg': {
                    color: isSelected ? '#ff4d00' : '#fff', // icon color
                },
                '& .MuiTypography-caption': {
                    color: isSelected ? '#ff4d00' : '#fff', // text color
                },
            }}
        >
            {icon}
            <Typography variant="caption" sx={{ marginTop: 1 }}>
                {text}
            </Typography>
        </Box>
    </Link>
);

export default MyMenu;