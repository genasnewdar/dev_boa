import { UserHome } from "@/views/users/home";
import { getUserInfo } from "@/app/actions/user";
import { Suspense } from "react";

export default async function UserHomePage() {
  const userInfo = await getUserInfo();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserHome userInfo={userInfo} />
    </Suspense>
  );
}
