// app.tsx
import './global.css';
import React from 'react';
import { Admin, Resource, CustomRoutes, CreateParams } from 'react-admin';
import { BrowserRouter, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { CreateGuesser, EditGuesser, ForgotPasswordPage, ListGuesser, LoginPage, SetPasswordPage, ShowGuesser, defaultI18nProvider, supabaseDataProvider, supabaseAuthProvider, AdminGuesser} from 'ra-supabase'; 
import { CustomForgotPasswordPage } from './Auth-Components/CustomForgotPassword';
import { Category_documentList } from './Supabase-Components/Category_documentList';
import { Placeholder_typeList } from './Supabase-Components/Placeholder_typeList';
import { Document_placeholderList } from './Supabase-Components/Document_placeholderList';
import { PlaceholderList } from './Supabase-Components/PlaceholderList';
import { ClientList } from './Supabase-Components/ClientList';
import { Zzz_documentList } from './Supabase-Components/Zzz_documentList';
import { ContractorList } from './Supabase-Components/ContractorList';
import { ProjectList } from './Supabase-Components/ProjectList';
import { Field_typeList } from './Supabase-Components/Field_typeList';
import { User_roleList } from './Supabase-Components/User_roleList';
import { Contractor_disciplineList } from './Supabase-Components/Contractor_disciplineList';
import { Contractor_typeList } from './Supabase-Components/Contractor_typeList';
import { DocumentCreate, DocumentEdit, DocumentList, DocumentShow } from './Supabase-Components/DocumentList';
import { StatusList } from './Supabase-Components/StatusList';
import { UserList } from './Supabase-Components/UserList';
import { Project_documentList } from './Supabase-Components/Project_documentList';
import { DisciplineEdit, DisciplineList, DisciplineShow } from './Supabase-Components/DisciplineList';
import { Discipline_documentList } from './Supabase-Components/Discipline_documentList';
import { CategoryList } from './Supabase-Components/CategoryList';
import { NotificationList } from './Supabase-Components/NotificationList';
import { DisciplineCreate } from './Supabase-Components/DisciplineList';
import { defaultLightTheme, defaultDarkTheme } from './themes';
// import ThemeToggler from './Layout-Components/ThemeToggler';
import MyLayout from './Layout-Components/MyLayout';
import { Dashboard } from './Supabase-Components/Dashboard';
import Settings from './Supabase-Components/Settings';
import CustomLogin from './Auth-Components/CustomLogin';
import DocumentsListCreate from './Supabase-Components/DocumentsListCreate';


const instanceUrl = "https://api.amkhoib.org";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzMwOTMwNDAwLAogICJleHAiOiAxODg4Njk2ODAwCn0.maA2KzOXlgqKagXyoq6OnJOYSEm8Em206VS3NFRPEk8";
const supabaseClient = createClient(instanceUrl, apiKey);
const dataProvider = supabaseDataProvider({ instanceUrl, apiKey, supabaseClient });
const authProvider = supabaseAuthProvider(supabaseClient, {});

export const App: React.FC = () => (
    <BrowserRouter>
    {/* <ThemeToggler /> */}
        <Admin
            layout={MyLayout}  // Use your custom layout
            theme={defaultLightTheme}  // Start theme
            // darkTheme={defaultDarkTheme}
            dataProvider={dataProvider}
            authProvider={authProvider}
            i18nProvider={defaultI18nProvider}
            loginPage={CustomLogin}
            dashboard={Dashboard}
        >

            <Resource name="documents" list={DocumentList} edit={DocumentEdit} create={DocumentsListCreate} show={DocumentShow} />
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
            {/* <Resource name="manyToMany" create={ManyToMany} /> */}
            <CustomRoutes>
                <Route path="/settings" element={<Settings />} /> {/* Add the route for settings */}
                {/* <Route path="/manyToMany" element={<ManyToMany />} /> Add the route for settings */}
            </CustomRoutes>

            <CustomRoutes noLayout>
                <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
                {/* <Route path={ForgotPasswordPage.path} element={<ForgotPasswordPage />} /> */}
                <Route path={CustomForgotPasswordPage.path} element={<CustomForgotPasswordPage />} />
                {/* <Route path="/settings" element={<Settings />} /> */}
            </CustomRoutes>
        </Admin>
    </BrowserRouter>
);

export default App;