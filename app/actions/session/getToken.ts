"use server";
import { auth0 } from "@/lib/auth0";

export interface SearchOptions {
  pageSize: number;
  page: number;
  appid?: number;
  exterior?: string[];
  name?: string;
}
export const getToken = async () => {
  const session = await auth0.getSession();

  return session?.tokenSet.accessToken;
};
