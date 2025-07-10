import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from "graphql";
import { GraphQLContext } from "../context";
import { UserService } from "@/src/services/user.service";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    image: { type: GraphQLString },
  },
});

export const userResolvers = {
  me: {
    type: UserType,
    resolve: async (_: any, __: any, context: GraphQLContext) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      return context.user;
    },
  },
  users: {
    type: new GraphQLList(UserType),
    resolve: async (_: any, __: any, context: GraphQLContext) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      return UserService.getAllUsers();
    },
  },
};
