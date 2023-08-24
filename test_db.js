import { sql } from './db.js'

await sql`
   select
   Id
   from books
   `.execute()
