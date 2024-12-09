// MyLayout.tsx
import React from 'react';
import { Layout, LayoutProps } from 'react-admin';
import MyMenu from './MyMenu'; // Import your custom menu
import { MyAppBar } from './MyAppBar';
import EmptyAppBar from './EmptyAppBar';

const MyLayout: React.FC<LayoutProps> = (props) => (
   // <Layout {...props} menu={MyMenu} appBar={MyAppBar} />
   <Layout {...props} menu={MyMenu} appBar={EmptyAppBar} /> // Use EmptyAppBar
);

export default MyLayout;