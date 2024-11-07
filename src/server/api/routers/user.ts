import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        first_name: z.string().or(z.null()),
        last_name: z.string().or(z.null()),
        profile_picture_url: z.string().or(z.undefined()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.currentUser;
      console.log("currentUser", currentUser);

      if (!currentUser) {
        throw new Error("User is not authenticated");
      }

      // Check if a user with this google_id already exists
      const existingUser = await ctx.db.user.findUnique({
        where: { google_id: currentUser },
      });

      if (existingUser) {
        return {
          exists: true,
          user: existingUser,
        };
      }

      try {
        const newUser = await ctx.db.user.create({
          data: {
            google_id: currentUser,
            first_name: input.first_name,
            last_name: input.last_name,
            profile_picture_url: input.profile_picture_url,
          },
        });

        return {
          exists: false,
          user: newUser,
        };
      } catch (e) {
        console.error(e);
        throw new Error("Failed to create user");
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
});
