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

import { radiantLightTheme, radiantDarkTheme } from "react-admin";

export default {
    lightTheme: radiantLightTheme,
    darkTheme: radiantDarkTheme
}