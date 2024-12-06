import React from 'react';
import { Menu, MenuItemLink, useLogout } from 'react-admin';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import CategoryIcon from '@mui/icons-material/Category';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import BuildIcon from '@mui/icons-material/Build';
import HomeIcon from '@mui/icons-material/Home';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GroupIcon from '@mui/icons-material/Group';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Logout icon
import { Box } from '@mui/material';
import logo from '../media/A-icon.png';

const MyMenu = () => {
    const logout = useLogout();
    
    return (
        <Box display="flex" flexDirection="column" height="100vh">
            {/* Top Section of the Menu */}
            <Box flexGrow={1}>
                {/* Add the logo at the top */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                    <img src={logo} alt="Logo" style={{ width: '50px', height: '50px', borderRadius: '50%', marginBottom: '0px', marginTop: '0px' }} />
                </Box>

                {/* Include Resource links with custom icons */}
                <MenuItemLink to="/" primaryText="Home" leftIcon={<HomeIcon />} />
                <MenuItemLink to="/clients" primaryText="Clients" leftIcon={<ContactMailIcon />} />
                <MenuItemLink to="/projects" primaryText="Projects" leftIcon={<DeveloperBoardIcon />} />
                <MenuItemLink to="/users" primaryText="People" leftIcon={<GroupIcon />} />
                <MenuItemLink to="/contractors" primaryText="Contractors" leftIcon={<BusinessCenterIcon />} />
                <MenuItemLink to="/documents" primaryText="Documents" leftIcon={<DescriptionIcon />} />
                <MenuItemLink to="/settings" primaryText="Settings" leftIcon={<SettingsIcon />} />
                <MenuItemLink primaryText="Logout" leftIcon={<MeetingRoomIcon />} onClick={logout} to={'login'}/>
                {/* <MenuItemLink to="/categories" primaryText="Categories" leftIcon={<CategoryIcon />} />
                <MenuItemLink to="/category_documents" primaryText="Category Documents" leftIcon={<InsertDriveFileIcon />} />
                <MenuItemLink to="/placeholder_types" primaryText="Placeholder Types" leftIcon={<ViewColumnIcon />} />
                <MenuItemLink to="/document_placeholders" primaryText="Document Placeholders" leftIcon={<InsertDriveFileIcon />} />
                <MenuItemLink to="/placeholders" primaryText="Placeholders" leftIcon={<TextFieldsIcon />} />
                <MenuItemLink to="/zzz_documents" primaryText="ZZZ Documents" leftIcon={<InsertDriveFileIcon />} />
                <MenuItemLink to="/field_types" primaryText="Field Types" leftIcon={<TextFieldsIcon />} />
                <MenuItemLink to="/user_roles" primaryText="User Roles" leftIcon={<VerifiedUserIcon />} />
                <MenuItemLink to="/contractor_disciplines" primaryText="Contractor Disciplines" leftIcon={<CorporateFareIcon />} />
                <MenuItemLink to="/contractor_types" primaryText="Contractor Types" leftIcon={<BuildIcon />} />
                <MenuItemLink to="/statuses" primaryText="Statuses" leftIcon={<VerifiedUserIcon />} /> */}
                {/* <MenuItemLink to="/project_documents" primaryText="Project Documents" leftIcon={<DeveloperBoardIcon />} /> */}
                {/* <MenuItemLink to="/disciplines" primaryText="Disciplines" leftIcon={<CorporateFareIcon />} /> */}
                {/* <MenuItemLink to="/discipline_documents" primaryText="Discipline Documents" leftIcon={<InsertDriveFileIcon />} /> */}
                {/* <MenuItemLink to="/notifications" primaryText="Notifications" leftIcon={<NotificationImportantIcon />} /> */}

                {/* Add Settings Link */}
            </Box>

            {/* Bottom Section of the Menu */}
            {/* <MenuItemLink
                primaryText="Logout"
                leftIcon={<ExitToAppIcon />}
                onClick={logout} to={'login'}/> */}
        </Box>
    );
};

export default MyMenu;