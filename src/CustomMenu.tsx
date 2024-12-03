// CustomMenu.tsx
import * as React from 'react';
import { Menu, MenuItemLink, MenuProps } from 'react-admin';
import HomeIcon from '@mui/icons-material/Home';

const CustomMenu: React.FC<MenuProps> = (props) => (
    <Menu {...props}>
        <MenuItemLink to="/home" primaryText="Home" leftIcon={<HomeIcon />} />
        {/* Existing menu items can be added here as needed */}
    </Menu>
);

export default CustomMenu;