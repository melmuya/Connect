import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ijfqqybkvpmhcbilaccn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZnFxeWJrdnBtaGNiaWxhY2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwMjA5MDgsImV4cCI6MjA0MDU5NjkwOH0.SU7vHN7uMB7Y90cl6oepNavmfNvYXcBxEn30Re3jLnw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
