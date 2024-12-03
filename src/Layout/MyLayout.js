// // src/Layout/MyLayout.tsx
// import React from 'react';
// import { Layout, LayoutProps } from 'react-admin';
// import MyAppBar from './MyAppBar';

// // Ensure `MyLayout` is exported as a default export
// const MyLayout: React.FC<LayoutProps> = (props) => {
//     return <Layout {...props} appBar={MyAppBar} />;
// };

// export default MyLayout; // Exporting as default


// in src/MyLayout.js
import { Layout } from 'react-admin';
import { MyAppBar } from './MyAppBar';

export const MyLayout = ({ children }) => (
    <Layout appBar={MyAppBar}>
        {children}
    </Layout>
);