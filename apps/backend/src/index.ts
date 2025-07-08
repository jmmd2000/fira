import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

export const app = express();

app.use(express.json());

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => "Hello, world!",
      },
    },
  }),
});

app.get("/health", (_, res) => res.send("OK"));
app.use("/graphql", createHandler({ schema }));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
