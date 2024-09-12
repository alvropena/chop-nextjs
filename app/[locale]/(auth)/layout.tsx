import LandingFooter from "@/components/landing/landing-footer";
import LandingHeader from "@/components/landing/landing-header";

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
        <div className="max-w-6xl w-full space-y-8">{children}</div>
      </div>
      <LandingFooter />
    </section>
  );
}
