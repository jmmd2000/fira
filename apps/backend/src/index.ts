import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import { createYoga } from "graphql-yoga";
import { GraphQLSchema } from "graphql";
import { auth } from "@/src/utils/auth";
import { Query } from "@/src/graphql/resolvers";
import { createContext } from "@/src/graphql/context";

export const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

// BetterAuth routes, handles /api/auth/sign-in, /api/auth/sign-up, etc.
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

const schema = new GraphQLSchema({
  query: Query,
});

app.get("/health", (_, res) => res.send("OK"));

// GraphQL endpoint with Yoga
const yoga = createYoga({
  schema,
  context: createContext,
  graphqlEndpoint: "/graphql",
  // Enable GraphiQL in development
  graphiql: process.env.NODE_ENV !== "production",
});

app.use("/graphql", yoga);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
