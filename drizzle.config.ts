

import { defineConfig } from "drizzle-kit"
export default defineConfig({
    dialect: "postgresql",
    schema: './src/lib/db.ts',
    out: './drizzle',
    dbCredentials: {
        url: 'postgresql://neondb_owner:6dp7AQTIgCVP@ep-ancient-sun-a5ovaik2.us-east-2.aws.neon.tech/neondb?sslmode=require',
      }
    
})