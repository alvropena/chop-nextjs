import LandingFooter from "../../../components/landing-footer";
import LandingHeader from "../../../components/landing-header";

export const metadata = {
    title: 'Chop',
    description: 'Learn quicker.',
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col min-h-screen">
            <LandingHeader />
            <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="max-w-4xl w-full space-y-8">
                    {children}
                </div>
            </div>
            <LandingFooter />
        </section>
    );
}
