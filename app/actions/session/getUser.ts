"use server";
import { auth0 } from "@/lib/auth0";

export interface SearchOptions {
  pageSize: number;
  page: number;
  appid?: number;
  exterior?: string[];
  name?: string;
}
export const getUser = async () => {
  const session = await auth0.getSession();
  return session?.user;
};
