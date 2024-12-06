// MyLayout.tsx
import React from 'react';
import { Layout, LayoutProps } from 'react-admin';
import MyMenu from './MyMenu'; // Import your custom menu
import { MyAppBar } from './MyAppBar';

const MyLayout: React.FC<LayoutProps> = (props) => (
    <Layout {...props} menu={MyMenu} appBar={MyAppBar} />
);

export default MyLayout;