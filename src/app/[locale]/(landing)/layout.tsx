import LandingFooter from "@/components/landing-footer"
import LandingHeader from "@/components/landing-header"

export const metadata = {
    title: 'Chop',
    description: 'Learn quicker.',
}

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex flex-col h-screen">
            <LandingHeader />
            {children}
            <LandingFooter />
        </section>
    )
}