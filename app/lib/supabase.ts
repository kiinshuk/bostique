import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nodzwyjqipsvkqszlwww.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vZHp3eWpxaXBzdmtxc3psd3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2OTIxMDEsImV4cCI6MjA5MjI2ODEwMX0.E8tf5WsJJtlBfj6JFX57ThneFY0Cdu5jii8HDlDLt2I';

export const supabase = createClient(supabaseUrl, supabaseKey);
