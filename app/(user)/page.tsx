import Categories from "@/components/Home/Categories";
import Landing from "@/components/Home/Landing";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (session.userType == "merchant") {
    return redirect("/merchant_dashboard");
  }

  return (
    <>
      <Landing />
      <Categories />
    </>
  );
}
