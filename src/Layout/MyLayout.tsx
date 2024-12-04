// CustomLayout.tsx
import React from 'react';
import { Layout, LayoutProps } from 'react-admin';
import MyAppBar from './MyAppBar'; // or, define MyAppBar right here

const CustomLayout: React.FC<LayoutProps> = (props) => <Layout {...props} appBar={MyAppBar} />;
export default CustomLayout;