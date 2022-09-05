import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { __cookie__, __prod__ } from './consts';

import { MyContext } from './types/MyContext';
import { HelloResolver } from './resolvers/Hello';
import { DeleteNoteResolver } from './resolvers/note/Delete';
import { GetNoteResolver } from './resolvers/note/Get';
import { UpdateNoteResolver } from './resolvers/note/Update';
import { WriteResolver } from './resolvers/note/Write';
import { GetUserResolver } from './resolvers/user/Get';
import { LoginResolver } from './resolvers/user/Login';
import { MeResolver } from './resolvers/user/Me';
import { RegisterResolver } from './resolvers/user/Register';

const main = async () => {
   if (__prod__) {
      await createConnection({
         type: 'postgres',
         url: process.env.DATABASE_URL,
         entities: ['dist/entity/*.*'],
         ssl: { rejectUnauthorized: false },
         synchronize: true
      });
   } else {
      await createConnection();
   }

   const schema = await buildSchema({
      resolvers: [
         HelloResolver,
         GetUserResolver,
         MeResolver,
         RegisterResolver,
         LoginResolver,
         WriteResolver,
         GetNoteResolver,
         UpdateNoteResolver,
         DeleteNoteResolver
      ]
   });

   const app = Express();

   const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }: MyContext) => ({ req, res }),
      playground: true,
      introspection: true
   });

   apolloServer.applyMiddleware({
      app,
      cors: {
         origin: process.env.PROD_FRONTEND_URL
      }
   });

   app.listen(process.env.PORT || 3001, () => {
      console.log(`server started on http://localhost:3001/graphql`);
   });
};

main();
