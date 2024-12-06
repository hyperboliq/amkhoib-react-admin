// // theme.ts
// import { defaultLightTheme, defaultDarkTheme } from 'react-admin';
// import { indigo, pink } from '@mui/material/colors';
// import { deepmerge } from '@mui/utils';

// // Define a custom light theme if needed
// const lightTheme = {
//     ...defaultLightTheme,
//     palette: {
//         primary: indigo,
//         secondary: pink,
//     },
// };

// // Define a custom dark theme
// const darkTheme = deepmerge(defaultDarkTheme, {
//     palette: {
//         primary: indigo,
//         secondary: pink,
//         mode: 'dark',
//     },
// });

// export { lightTheme, darkTheme };

// import { radiantLightTheme, radiantDarkTheme } from "react-admin";

// export default {
//     lightTheme: radiantLightTheme,
//     darkTheme: radiantDarkTheme
// }

// themes.ts
import { RaThemeOptions } from 'react-admin';
import { deepmerge } from '@mui/utils';
import { Theme } from '@mui/material/styles';

const defaultThemeInvariants = {
    typography: {
        h6: { fontWeight: 400 },
    },
    sidebar: {
        width: 240,
        closedWidth: 50,
    },
    components: {
        MuiAutocomplete: {
            defaultProps: { fullWidth: true },
            variants: [{
                props: {},
                style: ({ theme }: { theme: Theme }) => ({
                    [theme.breakpoints.down('sm')]: { width: '100%' },
                }),
            }],
        },
        MuiTextField: {
            defaultProps: { variant: 'filled', margin: 'dense', size: 'small', fullWidth: true },
            variants: [{
                props: {},
                style: ({ theme }: { theme: Theme }) => ({
                    [theme.breakpoints.down('sm')]: { width: '100%' },
                }),
            }],
        },
        MuiFormControl: {
            defaultProps: { variant: 'filled', margin: 'dense', size: 'small', fullWidth: true },
        },
        RaSimpleFormIterator: { defaultProps: { fullWidth: true } },
        RaTranslatableInputs: { defaultProps: { fullWidth: true } },
    },
};

export const defaultLightTheme: RaThemeOptions = deepmerge(
    defaultThemeInvariants,
    {
        palette: {
            background: { default: '#f1f4fb' },
            primary: { main: '#045ea1' },
            secondary: { light: '#6ec6ff', main: '#071135', dark: '#0069c0', contrastText: '#fff' },
        },
        components: {
            MuiFilledInput: {
                styleOverrides: {
                    root: { backgroundColor: '#f1f4fb' },
                    '&$disabled': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                },
            },
        },
    }
);

export const defaultDarkTheme: RaThemeOptions = deepmerge(
    defaultThemeInvariants,
    {
        palette: {
            mode: 'dark',
            primary: { main: '#005fa3' },
            background: { default: '#071135' },
        },
    }
);

export const defaultTheme = defaultLightTheme;