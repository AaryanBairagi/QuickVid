import { pgTable , serial  , varchar , boolean } from "drizzle-orm/pg-core"; 

//Creating a SQL database 'users' 

export const Users = pgTable('users' , {
    id:serial('id').primaryKey(),   //incremental id
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    imageUrl:varchar('imageUrl'),
    subscription:boolean('subscription').default(false)
});