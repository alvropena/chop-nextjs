import CurrentPlanCard from "./_components/current-plan-card";
import UpgradePlanCard from "./_components/upgrade-plan-card";
import PaymentMethodCard from "./_components/payment-method.card";
import InvoicesCard from "./_components/invoices-card";

export default function BillingPage() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center gap-4">
                <h1 className="font-semibold text-lg md:text-xl">Billing</h1>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CurrentPlanCard />
                <UpgradePlanCard />
                <PaymentMethodCard />
                <InvoicesCard />
            </div>
        </main>
    );
}
