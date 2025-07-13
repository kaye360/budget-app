import { createClient } from '@supabase/supabase-js';

const db = createClient(
  "https://cicspmzvopyopqcybnno.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpY3NwbXp2b3B5b3BxY3libm5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MzA3ODEsImV4cCI6MjA2NTUwNjc4MX0.JE8-m7y5wO3xNOTTNVbAaTTPgLFXHurP7D8hO1UldbM"
);

export { db as d };
