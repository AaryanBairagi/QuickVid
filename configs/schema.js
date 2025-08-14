import { pgTable,serial,varchar,boolean,text,jsonb,timestamp,json,integer} from "drizzle-orm/pg-core"; 

//Creating a SQL database 'users' 

export const Users = pgTable('users' , {
    id:serial('id').primaryKey(),   //incremental id
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    imageUrl:varchar('imageUrl'),
    subscription:boolean('subscription').default(false),
    tier: varchar("tier", { length: 50 }).default("Basic").notNull(),
    credits: integer("credits").default(0).notNull(),
    stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
});

export const UserSettings = pgTable("user_settings", {
    user_id: text("user_id").primaryKey(),
    settings: jsonb("settings").notNull(),
});


export const VideoData = pgTable("videoData", {
    id: serial("id").primaryKey(),
    scenes: jsonb("scenes").notNull(), // stores full setVideoData array
    createdBy: varchar("createdBy").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    videoUrl: varchar("videoUrl"),
});

export const UserFeedback = pgTable("user_feedback", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
