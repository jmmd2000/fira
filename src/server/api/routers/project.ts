import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  create: privateProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.currentUser;

      if (!currentUser) {
        throw new Error("User is not authenticated");
      }

      try {
        const newProject = await ctx.db.project.create({
          data: {
            name: input,
            user: {
              connect: {
                google_id: currentUser,
              },
            },
          },
        });

        return newProject;
      } catch (e) {
        console.error(e);
        throw new Error("Failed to create project");
      }
    }),
  getCurrentUser: privateProcedure.query(async ({ ctx }) => {
    const currentUser = ctx.currentUser;
    console.log("currentUser", currentUser);

    if (!currentUser) {
      throw new Error("User is not authenticated");
    }

    // Check if a user with this google_id exists
    const existingUser = await ctx.db.user.findUnique({
      where: { google_id: currentUser },
    });

    if (existingUser) {
      return {
        exists: true,
        user: existingUser,
      };
    }

    throw new Error("User not found");
  }),
  getAllProjects: publicProcedure.query(async ({ ctx }) => {
    const projects = await ctx.db.project.findMany({});
    return projects;
  }),
  getAllProjectsForUser: privateProcedure
    .input(z.number().or(z.null()))
    .query(async ({ ctx, input }) => {
      if (!input) {
        throw new Error("User ID is required");
      }
      const projects = await ctx.db.project.findMany({
        where: {
          user: {
            id: input,
          },
        },
      });

      return projects;
    }),
});
