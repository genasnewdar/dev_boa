"use server";
import { auth0 } from "@/lib/auth0";

export interface SearchOptions {
  pageSize: number;
  page: number;
  appid?: number;
  exterior?: string[];
  name?: string;
}
export const list = async () => {
  const session = await auth0.getSession();

  const user = session?.user;

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }
  return session;
};
