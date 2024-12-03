// // src/Layout/MyAppBar.tsx
// import React from 'react';
// import { AppBar, AppBarProps } from 'react-admin';

// const MyAppBar: React.FC<AppBarProps> = (props) => {
//     return <AppBar {...props} color="primary" position="sticky" />;
// };

// export default MyAppBar;


// in src/MyAppBar.js
import { AppBar } from 'react-admin';
import { Typography } from '@mui/material';

const MyAppBar = () => <AppBar color="primary" position="sticky" />;