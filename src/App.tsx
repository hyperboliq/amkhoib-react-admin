// app.tsx
import './global.css';
import React from 'react';
import { Admin, Resource, CustomRoutes } from 'react-admin';
import { BrowserRouter, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { CreateGuesser, EditGuesser, ForgotPasswordPage, ListGuesser, LoginPage, SetPasswordPage, ShowGuesser, defaultI18nProvider, supabaseDataProvider, supabaseAuthProvider, AdminGuesser} from 'ra-supabase'; 
import { CustomForgotPasswordPage } from './Auth-Components/CustomForgotPassword';
import { Category_documentList } from './Supabase-Pages/Category_documentList';
import { Placeholder_typeList } from './Supabase-Pages/Placeholder_typeList';
import { Document_placeholderList } from './Supabase-Pages/Document_placeholderList';
import { PlaceholderList } from './Supabase-Pages/PlaceholderList';
// import { ClientList } from './Supabase-Components/ClientList';
import { ClientList } from './Pages/Clients/ClientList';
import { Zzz_documentList } from './Supabase-Pages/Zzz_documentList';
import { ContractorList } from './Supabase-Pages/ContractorList';
// import { ProjectList } from './Supabase-Pages/ProjectList';
import { Field_typeList } from './Supabase-Pages/Field_typeList';
import { User_roleList } from './Supabase-Pages/User_roleList';
import { Contractor_disciplineList } from './Supabase-Pages/Contractor_disciplineList';
import { Contractor_typeList } from './Supabase-Pages/Contractor_typeList';
import { DocumentList, DocumentShow } from './Supabase-Pages/DocumentList';
import { StatusList } from './Supabase-Pages/StatusList';
import { UserList } from './Supabase-Pages/UserList';
import { Project_documentList } from './Supabase-Pages/Project_documentList';
import { DisciplineList, DisciplineShow } from './Supabase-Pages/DisciplineList';
import { Discipline_documentList } from './Supabase-Pages/Discipline_documentList';
import { CategoryList } from './Supabase-Pages/CategoryList';
import { NotificationList } from './Supabase-Pages/NotificationList';
import { defaultLightTheme, defaultDarkTheme } from './themes';
// import ThemeToggler from './Layout-Components/ThemeToggler';
import CustomLayout from './Components/CustomLayout';
// import { Dashboard } from './Supabase-Components/Dashboard';
import Home from './Pages/Home/Home';
import CustomLogin from './Auth-Components/CustomLogin';
import DocumentsListCreate from './Pages/Documents/DocumentCreate';
import ContractorCreate from './Pages/Contractors/ContractorCreate';
import { DisciplineCreate } from './Pages/Disciplines/DisciplinCreate';
import DocumentsListEdit from './Pages/Documents/DocumentEdit';
import { DisciplineEdit } from './Pages/Disciplines/DisciplinEdit';
import ContractorEdit from './Pages/Contractors/ContractorEdit';
// import { ClientCreate } from './Supabase-Components/ClientList';
import ClientCreate from './Pages/Clients/ClientCreate';
import { ProjectCreate } from './Pages/Projects/ProjectCreate';
import {ProjectList} from './Pages/Projects/ProjectList';
import { ToastProvider } from './Components/Toast/ToastContext';


const instanceUrl = "https://api.amkhoib.org";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzMwOTMwNDAwLAogICJleHAiOiAxODg4Njk2ODAwCn0.maA2KzOXlgqKagXyoq6OnJOYSEm8Em206VS3NFRPEk8";
const supabaseClient = createClient(instanceUrl, apiKey);
const dataProvider = supabaseDataProvider({ instanceUrl, apiKey, supabaseClient });
const authProvider = supabaseAuthProvider(supabaseClient, {});

export const App: React.FC = () => (
    <BrowserRouter>
    {/* <ThemeToggler /> */}
    <ToastProvider>
        <Admin
            layout={CustomLayout} // Use custom layout  // Use your custom layout
            theme={defaultLightTheme}  // Start theme
            // darkTheme={defaultDarkTheme}
            dataProvider={dataProvider}
            authProvider={authProvider}
            i18nProvider={defaultI18nProvider}
            loginPage={CustomLogin}
            dashboard={Home}
        >

            <Resource name="documents" list={DocumentList} edit={DocumentsListEdit} create={DocumentsListCreate} show={DocumentShow} />
            <Resource name="categories" list={CategoryList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="category_documents" list={Category_documentList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="placeholder_types" list={Placeholder_typeList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="document_placeholders" list={Document_placeholderList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="placeholders" list={PlaceholderList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="clients" list={ClientList} edit={EditGuesser} create={ClientCreate} show={ShowGuesser} />
            <Resource name="zzz_documents" list={Zzz_documentList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="contractors" list={ContractorList} edit={ContractorEdit} create={ContractorCreate} show={ShowGuesser} />
            <Resource name="projects" list={ProjectList} edit={EditGuesser} create={ProjectCreate} show={ShowGuesser} />
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
            {/* <Resource name="manyToMany" create={ManyToMany} /> */}

            {/* <CustomRoutes>
            </CustomRoutes> */}

            <CustomRoutes noLayout>
                <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
                <Route path={CustomForgotPasswordPage.path} element={<CustomForgotPasswordPage />} />
            </CustomRoutes>

            
        </Admin>
    </ToastProvider>
    </BrowserRouter>
);

export default App;