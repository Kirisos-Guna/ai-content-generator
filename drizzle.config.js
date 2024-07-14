/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:3ZRMNiEUIzp2@ep-crimson-waterfall-a5g04ccd.us-east-2.aws.neon.tech/AI-Content-Generator?sslmode=require',
    }
  };
  