import { createClient } from '@supabase/supabase-js'
import { DB_KEY, DB_URL } from '../../config'
import type { Database } from '../types/supabase'

export const db = createClient<Database>(DB_URL, DB_KEY)