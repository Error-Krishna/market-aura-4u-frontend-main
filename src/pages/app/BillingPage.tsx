import { useState } from "react";
import { useAuth } from "@/features/auth";
import { useCreateOrder, useVerifyPayment } from "@/features/billing";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const plans = [
  {
    name: "Starter",
    price: "Free",
    features: ["100 credits/month", "Basic analytics", "Email support"],
    planId: "starter" as const,
  },
  {
    name: "Pro",
    price: "$29/mo",
    features: ["500 credits/month", "Advanced analytics", "Priority support", "Custom branding"],
    planId: "pro" as const,
  },
  {
    name: "Enterprise",
    price: "$99/mo",
    features: ["Unlimited credits", "Dedicated account manager", "API access", "SLA"],
    planId: "enterprise" as const,
  },
];

export default function BillingPage() {
  const { user } = useAuth();
  const createOrder = useCreateOrder();
  const verifyPayment = useVerifyPayment();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleUpgrade = async (planId: string) => {
    setSelectedPlan(planId);
    try {
      const order = await createOrder.mutateAsync({
        plan: planId as "starter" | "pro" | "enterprise",
      });
      const paymentId = "sim_payment_123";
      await verifyPayment.mutateAsync({
        orderId: order.orderId,
        paymentId,
        signature: "sim_signature",
      });
      alert("Upgrade successful! Your plan has been updated.");
      window.location.reload();
    } catch {
      alert("Payment failed. Please try again.");
    } finally {
      setSelectedPlan(null);
    }
  };

  const currentPlan = user?.isPremium ? "Premium" : "Free";

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="mt-1 text-text-secondary">
          Current plan: <span className="font-semibold text-primary">{currentPlan}</span>
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const isCurrent = plan.planId === "starter" && currentPlan === "Free";
          const isUpgrade = plan.planId !== "starter";
          return (
            <div
              key={plan.planId}
              className={cn(
                "glass-card rounded-2xl bg-surface/30 p-6 backdrop-blur-sm transition-all",
                isCurrent && "border-primary/50 ring-1 ring-primary",
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                {isCurrent && <Check className="size-5 text-primary" />}
              </div>
              <p className="mt-1 text-3xl font-extrabold text-primary">{plan.price}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-secondary" />
                    {feature}
                  </li>
                ))}
              </ul>
              {isUpgrade && (
                <Button
                  className="mt-6 w-full"
                  variant={isCurrent ? "secondary" : "primary"}
                  onClick={() => handleUpgrade(plan.planId)}
                  isLoading={selectedPlan === plan.planId && createOrder.isPending}
                  disabled={isCurrent}
                >
                  {isCurrent ? "Current Plan" : `Upgrade to ${plan.name}`}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
