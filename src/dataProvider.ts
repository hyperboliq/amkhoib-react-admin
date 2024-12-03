import { createClient } from '@supabase/supabase-js';
import { supabaseDataProvider } from 'ra-supabase';

// Initialize Supabase client with environment variables or secure keys
const instanceUrl = import.meta.env.VITE_SUPABASE_URL || "https://api.amkhoib.org";
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzMwOTMwNDAwLAogICJleHAiOiAxODg4Njk2ODAwCn0.maA2KzOXlgqKagXyoq6OnJOYSEm8Em206VS3NFRPEk8";

const supabaseClient = createClient(instanceUrl, apiKey);

// Configure Supabase data provider
export const dataProvider = supabaseDataProvider({ instanceUrl, apiKey, supabaseClient });