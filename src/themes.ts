import { RaThemeOptions } from 'react-admin';
import { deepmerge } from '@mui/utils';
import { Theme } from '@mui/material/styles';

const defaultThemeInvariants = {
    typography: {
        h6: { fontWeight: 400 },
    },
    components: {
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: '#00B6E4', // Selected menu text color
                    },
                    '&.Mui-selected:hover': {
                        color: '#00B6E4',
                        backgroundColor: 'transparent', // No background color change
                    },
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: '#00B6E4', // Selected text color
                    },
                },
            },
        },
    },
};

export const defaultLightTheme: RaThemeOptions = deepmerge(defaultThemeInvariants, {
    palette: {
        background: { default: '#f1f4fb' },
        primary: { main: '#045ea1' },
        text: { primary: '#FFFFFF' },
    },
    components: {
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&.RaMenuItemLink-active': {
                        color: '#00B6E4', // Selected link color
                        fontWeight: 'bold',
                    },
                    '&:hover': {
                        color: '#00B6E4',
                    },
                },
            },
        },
    },
});

export const defaultDarkTheme: RaThemeOptions = deepmerge(defaultThemeInvariants, {
    palette: {
        mode: 'dark',
        primary: { main: '#005fa3' },
        background: { default: '#071135' },
    },
});

export const defaultTheme = defaultLightTheme;
