import express from "express";
import mongoose from "mongoose";
import { ApolloServer, gql} from "apollo-server-express";
import {resolvers} from "./resolver";
import {typeDefs} from "./schema";

const server = async () => {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })
    require ('dotenv').config();
    server.applyMiddleware({app});
    try{
    await mongoose.connect(process.env.DB_SERVER, { user: process.env.DB_USER, pass: process.env.DB_PASS, useNewUrlParser: true, useUnifiedTopology: true })
    }
    catch(err){
        console.log(err)
    }

    app.get('/', (req, res) => res.send('Server Running'))
    app.listen({port: process.env.PORT}, ()=> {
        console.log('connected')
    })
}

server();