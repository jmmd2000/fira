import db from "@/db";
import { user as users } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export class UserService {
  static async getAllUsers() {
    // return await db.select().from(users);
    return [
      { id: "1", name: "John Doe", email: "john@example.com" },
      { id: "2", name: "Jane Smith", email: "jane@example.com" },
    ];
  }

  static async getUserById(id: string) {
    // const result = await db.select().from(users).where(eq(users.id, id));
    // return result[0];
    return { id, name: "John Doe", email: "john@example.com" };
  }

  static async createUser(userData: any) {
    // return await db.insert(users).values(userData).returning();
    return { id: "3", ...userData };
  }
}
