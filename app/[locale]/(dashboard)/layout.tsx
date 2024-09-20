import AsideMenu from "@/components/aside-menu";
import BottomTabNavigation from "@/components/bottom-tab-navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex min-h-screen w-full">
        <AsideMenu />
        <div className="flex flex-1 flex-col relative">
          <main className="flex-1 p-4 md:p-6">{children}</main>
          <BottomTabNavigation isBottomTab={true} />
        </div>
      </div>
    </section>
  );
}
