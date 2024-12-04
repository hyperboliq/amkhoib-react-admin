// MyAppBar.tsx
import React from 'react';
import { AppBar, ToggleThemeButton } from 'react-admin';

const MyAppBar: React.FC = (props) => (
    <AppBar {...props}>
        <ToggleThemeButton />
    </AppBar>
);

export default MyAppBar;  // default export