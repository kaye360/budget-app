import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'

export const db = createClient<Database>(
    import.meta.env.DB_URL,
    import.meta.env.DB_KEY,
)