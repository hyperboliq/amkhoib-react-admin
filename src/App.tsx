// app.tsx
import React from 'react';
import { Admin, Resource, CustomRoutes, AppBar, ToggleThemeButton, nanoLightTheme, nanoDarkTheme, DashboardMenuItem } from 'react-admin';
import { BrowserRouter, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { CreateGuesser, EditGuesser, ForgotPasswordPage, ListGuesser, LoginPage, SetPasswordPage, ShowGuesser, defaultI18nProvider, supabaseDataProvider, supabaseAuthProvider, AdminGuesser} from 'ra-supabase'; 
// import { lightTheme, darkTheme } from './themes';
import themes from "./themes"
import CustomLayout from './Layout/MyLayout';
import { Category_documentList } from './Components/Category_documentList';
import { Placeholder_typeList } from './Components/Placeholder_typeList';
import { Document_placeholderList } from './Components/Document_placeholderList';
import { PlaceholderList } from './Components/PlaceholderList';
import { ClientList } from './Components/ClientList';
import { Zzz_documentList } from './Components/Zzz_documentList';
import { ContractorList } from './Components/ContractorList';
import { ProjectList } from './Components/ProjectList';
import { Field_typeList } from './Components/Field_typeList';
import { User_roleList } from './Components/User_roleList';
import { Contractor_disciplineList } from './Components/Contractor_disciplineList';
import { Contractor_typeList } from './Components/Contractor_typeList';
import { DocumentCreate, DocumentList, DocumentShow } from './Components/DocumentList';
import { StatusList } from './Components/StatusList';
import { UserList } from './Components/UserList';
import { Project_documentList } from './Components/Project_documentList';
import { DisciplineEdit, DisciplineList, DisciplineShow } from './Components/DisciplineList';
import { Discipline_documentList } from './Components/Discipline_documentList';
import { CategoryList } from './Components/CategoryList';
import { NotificationList } from './Components/NotificationList';
import { DisciplineCreate } from './Components/DisciplineList';
import { Dashboard } from './Components/dashboard';

const instanceUrl = "https://api.amkhoib.org";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzMwOTMwNDAwLAogICJleHAiOiAxODg4Njk2ODAwCn0.maA2KzOXlgqKagXyoq6OnJOYSEm8Em206VS3NFRPEk8";
const supabaseClient = createClient(instanceUrl, apiKey);
const dataProvider = supabaseDataProvider({ instanceUrl, apiKey, supabaseClient });
const authProvider = supabaseAuthProvider(supabaseClient, {});

// // Custom AppBar with Theme Toggle
// const MyAppBar: React.FC = (props) => (
//     <AppBar {...props}>
//         <ToggleThemeButton />
//     </AppBar>
// );

export const App: React.FC = () => (
    <BrowserRouter>
        <Admin
            dataProvider={dataProvider}
            authProvider={authProvider}
            i18nProvider={defaultI18nProvider}
            loginPage={LoginPage}
            // theme={lightTheme}
            // darkTheme={darkTheme}
            dashboard={Dashboard}
            {...themes}
            // layout={CustomLayout} // Set custom layout
        >
            <Resource name="documents" list={DocumentList} edit={EditGuesser} create={DocumentCreate} show={DocumentShow} />
            <Resource name="categories" list={CategoryList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="category_documents" list={Category_documentList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="placeholder_types" list={Placeholder_typeList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="document_placeholders" list={Document_placeholderList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="placeholders" list={PlaceholderList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="clients" list={ClientList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="zzz_documents" list={Zzz_documentList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="contractors" list={ContractorList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="projects" list={ProjectList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="field_types" list={Field_typeList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="user_roles" list={User_roleList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="contractor_disciplines" list={Contractor_disciplineList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="contractor_types" list={Contractor_typeList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="statuses" list={StatusList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="users" list={UserList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="project_documents" list={Project_documentList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="disciplines" list={DisciplineList} edit={DisciplineEdit} create={DisciplineCreate} show={DisciplineShow} />
            <Resource name="discipline_documents" list={Discipline_documentList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="notifications" list={NotificationList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />

            <CustomRoutes noLayout>
                <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
                <Route path={ForgotPasswordPage.path} element={<ForgotPasswordPage />} />
            </CustomRoutes>
        </Admin>
    </BrowserRouter>
);

export default App;