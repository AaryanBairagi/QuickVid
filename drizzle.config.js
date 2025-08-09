/** @type { import("drizzle-kit").Config } */

export default{
    schema: "./configs/schema.js",
    dialect:'postgresql',
    dbCredentials:{
        url: 'postgresql://neondb_owner:npg_G7jJFuMfT3qI@ep-lively-sky-aedwoj5q-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
    }
}