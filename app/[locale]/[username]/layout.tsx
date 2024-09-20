import AsideMenu from "@/components/aside-menu";
import BottomTabNavigation from "@/components/bottom-tab-navigation";
import { getCurrentUser } from "@/lib/auth/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //Check if user is authenticated
  const user = await getCurrentUser();

  return (
    <section>
      <div className="flex min-h-screen w-full">
        {user && <AsideMenu />}
        <div className="flex flex-1 flex-col relative">
          <main className="flex-1 p-4 md:p-6">{children}</main>
          {user && <BottomTabNavigation isBottomTab={true} />}
        </div>
      </div>
    </section>
  );
}
