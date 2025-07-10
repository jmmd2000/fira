import { auth } from "@/src/utils/auth";

export interface GraphQLContext {
  user?: any; // BetterAuth user type
}

export const createContext = async (ctx: any): Promise<GraphQLContext> => {
  const { request } = ctx;

  try {
    // Convert request headers to Web API Headers for Better Auth
    const headers = new Headers();
    request.headers.forEach((value: string, key: string) => {
      headers.set(key, value);
    });

    // Get session from BetterAuth
    const session = await auth.api.getSession({
      headers,
    });

    return {
      user: session?.user || null,
    };
  } catch (error) {
    console.error("Error creating GraphQL context:", error);
    return {
      user: null,
    };
  }
};
