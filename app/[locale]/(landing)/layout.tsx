import LandingFooter from "../../../components/landing/landing-footer";
import LandingHeader from "../../../components/landing/landing-header";

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
      <LandingHeader />
      {children}
      <LandingFooter />
    </section>
  );
}
