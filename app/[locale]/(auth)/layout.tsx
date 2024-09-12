import LandingFooter from "@/components/landing/landing-footer";
import LandingHeader from "@/components/landing/landing-header";
import Logo from "@/components/logo";

export const metadata = {
  title: "Chop",
  description: "Learn quicker.",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-6xl w-full space-y-8">
          <section className="flex justify-between">
            <div className="w-1/2 flex items-center justify-center h-[inherit]">
              <Logo height={400} width={400} className="w-[25rem] h-[25rem]" />
            </div>
            <div className="flex items-center justify-center py-6">
              <div className="mx-auto max-w-[22.375rem] space-y-4">
                {children}
              </div>
            </div>
          </section>
        </div>
      </div>
      <LandingFooter />
    </section>
  );
}
