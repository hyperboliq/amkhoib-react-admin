// Layout.tsx
import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import CustomMenu from './CustomMenu';  // Import the custom menu

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout menu={CustomMenu}> {/* Pass the custom menu */}
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);