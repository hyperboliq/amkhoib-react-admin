// supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Initialize Supabase client
const instanceUrl = 'https://api.amkhoib.org';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogImFub24iLAogICJpc3MiOiAic3VwYWJhc2UiLAogICJpYXQiOiAxNzMwOTMwNDAwLAogICJleHAiOiAxODg4Njk2ODAwCn0.maA2KzOXlgqKagXyoq6OnJOYSEm8Em206VS3NFRPEk8';

const supabaseClient: SupabaseClient = createClient(instanceUrl, apiKey);

export default supabaseClient;