import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://maumdlobimeggmhwxcxk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hdW1kbG9iaW1lZ2dtaHd4Y3hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5OTY1NDksImV4cCI6MjA3NjU3MjU0OX0.ep3OIgHvRK84spSetKK3bZb6PQeCQa4KAuMcwgKmoS4';
export const supabase = createClient(supabaseUrl, supabaseKey);