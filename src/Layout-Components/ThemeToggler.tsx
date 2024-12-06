// // ThemeToggler.tsx
// import React from 'react';
// import { Button } from '@mui/material';
// import { useTheme } from 'react-admin';

// const ThemeToggler: React.FC = () => {
//     const [theme, setTheme] = useTheme();

//     const handleToggleTheme = () => {
//         setTheme(theme === 'dark' ? 'light' : 'dark');
//     };

//     return (
//         <Button onClick={handleToggleTheme}>
//             {theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
//         </Button>
//     );
// };

// export default ThemeToggler;