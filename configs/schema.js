import { pgTable,serial,varchar,boolean,text,jsonb,json} from "drizzle-orm/pg-core"; 

//Creating a SQL database 'users' 

export const Users = pgTable('users' , {
    id:serial('id').primaryKey(),   //incremental id
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    imageUrl:varchar('imageUrl'),
    subscription:boolean('subscription').default(false)
});

export const UserSettings = pgTable("user_settings", {
    user_id: text("user_id").primaryKey(),
    settings: jsonb("settings").notNull(),
});

export const VideoData = pgTable("videoData",{
    id:serial('id').primaryKey(),
    script:json('script').notNull(),
    audioFileUrl:varchar('audioFileUrl').notNull(),
    captions:json('captions').notNull(),
    imageList:varchar('imageList').array(),
    createdBy:varchar('createdBy').notNull()
});