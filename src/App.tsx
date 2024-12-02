// import {
//   Admin,
//   Resource,
//   ListGuesser,
//   EditGuesser,
//   ShowGuesser,
// } from "react-admin";
// import { Layout } from "./Layout";
// import { dataProvider } from "./dataProvider";

// export const App = () => (
//   <Admin layout={Layout} dataProvider={dataProvider}></Admin>
// );




import { Admin, Resource, CustomRoutes } from 'react-admin';
import { BrowserRouter, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import {
    CreateGuesser,
    EditGuesser,
    ForgotPasswordPage,
    ListGuesser,
    LoginPage,
    SetPasswordPage,
    ShowGuesser,
    defaultI18nProvider,
    supabaseDataProvider,
    supabaseAuthProvider
} from 'ra-supabase';   
import { Placeholder_typeList } from './Components/Placeholder_typeList';
import { Document_placeholderList } from './Components/Document_placeholderList';
import { PlaceholderList } from './Components/PlaceholderList';
import { ClientList } from './Components/ClientList';
import { Zzz_documentList } from './Components/Zzz_documentList';
import { ContractorList } from './Components/ContractorList';
import { ProjectList } from './Components/ProjectList';
import { Field_typeList } from './Components/Field_typeList';
import { User_roleList } from './Components/User_roleList';
import { Contractor_typeList } from './Components/Contractor_typeList';
import { DocumentList } from './Components/DocumentList';
import { StatusList } from './Components/StatusList';
import { UserList } from './Components/UserList';
import { Project_documentList } from './Components/Project_documentList';
import { NotificationList } from './Components/NotificationList';

const instanceUrl = "https://api.amkhoib.org";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzMwOTMwNDAwLAogICJleHAiOiAxODg4Njk2ODAwCn0.maA2KzOXlgqKagXyoq6OnJOYSEm8Em206VS3NFRPEk8";
const supabaseClient = createClient(instanceUrl, apiKey);
const dataProvider = supabaseDataProvider({ instanceUrl, apiKey, supabaseClient });
const authProvider = supabaseAuthProvider(supabaseClient, {});

export const App = () => (
    <BrowserRouter>
        <Admin
            dataProvider={dataProvider}
            authProvider={authProvider}
            i18nProvider={defaultI18nProvider}
            loginPage={LoginPage}
        >
            <Resource name="placeholder_types" list={Placeholder_typeList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="document_placeholders" list={Document_placeholderList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="placeholders" list={PlaceholderList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="clients" list={ClientList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="zzz_documents" list={Zzz_documentList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="contractors" list={ContractorList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="projects" list={ProjectList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="field_types" list={Field_typeList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="user_roles" list={User_roleList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="contractor_types" list={Contractor_typeList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="documents" list={DocumentList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="statuses" list={StatusList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="UserList" list={UserList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="project_documents" list={Project_documentList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="notifications" list={NotificationList} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <CustomRoutes noLayout>
                <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
                <Route path={ForgotPasswordPage.path} element={<ForgotPasswordPage />} />
            </CustomRoutes>
        </Admin>
    </BrowserRouter>
);

export default App;