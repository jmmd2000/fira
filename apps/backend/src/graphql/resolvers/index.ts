import { GraphQLObjectType, GraphQLString } from "graphql";
import { userResolvers } from "./user";

export const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello, world!",
    },
    ...userResolvers,
  },
});
