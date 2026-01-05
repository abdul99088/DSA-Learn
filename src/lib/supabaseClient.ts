import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aoberzpjfvgllvkyarfl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvYmVyenBqZnZnbGx2a3lhcmZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NDUwNTksImV4cCI6MjA4MzAyMTA1OX0.GYdcoorJxJATB2T2aTLE5xlm8ahTHxNX1FadsPLt5VU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


