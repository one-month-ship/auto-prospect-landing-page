import { useEffect, useState } from "react";
import { fetchJSON } from "../lib/api";
import type { TPlan } from "../types/plan";

// Bloc prix de la page /tarifs : rendu statique avec les prix fallback
// (visible des crawlers qui n'exécutent pas le JS), puis hydraté avec les prix
// réels de l'API — même logique mensuel/annuel que le composant Pricing de la home.
// L'annuel (69 € HT/mois) est sélectionné par défaut, le mensuel (89 € HT) via le toggle.
const FALLBACK_MONTHLY: TPlan = {
  id: 1,
  name: "Pro",
  type: "subscription",
  channel: null,
  stripePriceId: "price_pro",
  priceEur: 8900,
  quotaPerMonth: null,
  overageUnitPrice: null,
  description: "Toutes les fonctionnalités pour prospecter efficacement",
  isActive: true,
  sortOrder: 1,
};

const FALLBACK_YEARLY: TPlan = {
  ...FALLBACK_MONTHLY,
  id: 2,
  stripePriceId: "price_pro_yearly",
  priceEur: 82800,
  sortOrder: 2,
};

function formatPrice(cents: number) {
  const euros = Math.floor(cents / 100);
  const rest = cents % 100;
  return rest === 0 ? `${euros}` : `${euros},${String(rest).padStart(2, "0")}`;
}

export default function TarifsPriceBox() {
  const [monthlyPlan, setMonthlyPlan] = useState<TPlan>(FALLBACK_MONTHLY);
  const [yearlyPlan, setYearlyPlan] = useState<TPlan | null>(FALLBACK_YEARLY);
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");

  const plan = billing === "yearly" && yearlyPlan ? yearlyPlan : monthlyPlan;

  useEffect(() => {
    fetchJSON<{ plans: TPlan[] }>("/api/plans/main")
      .then((data) => {
        if (data.plans?.length > 0) {
          setMonthlyPlan(data.plans[0]);
          // Si l'API ne renvoie pas de plan annuel, on retire le fallback annuel
          setYearlyPlan(data.plans.length > 1 ? data.plans[1] : null);
          if (data.plans.length <= 1) setBilling("monthly");
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="text-center sm:text-left">
      <span className="inline-block rounded-full bg-accent px-4 py-1 text-xs font-bold text-[#0A0A0B]">
        5 jours gratuits
      </span>

      {/* Toggle annuel / mensuel (annuel sélectionné par défaut) */}
      {yearlyPlan && (
        <div className="mt-6 inline-flex items-center rounded-full border border-[#27272A] bg-[#141416] p-1">
          <button
            onClick={() => setBilling("yearly")}
            className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all cursor-pointer ${
              billing === "yearly"
                ? "bg-accent text-[#0A0A0B]"
                : "text-[#9CA3AF] hover:text-[#F9FAFB]"
            }`}
          >
            Annuel
            {monthlyPlan.priceEur > 0 && (
              <span
                className={`ml-2 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  billing === "yearly"
                    ? "bg-[#0A0A0B]/30 text-[#0A0A0B]"
                    : "bg-accent/20 text-accent"
                }`}
              >
                -{Math.round(100 - (yearlyPlan.priceEur / (monthlyPlan.priceEur * 12)) * 100)}%
              </span>
            )}
          </button>
          <button
            onClick={() => setBilling("monthly")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all cursor-pointer ${
              billing === "monthly"
                ? "bg-accent text-[#0A0A0B]"
                : "text-[#9CA3AF] hover:text-[#F9FAFB]"
            }`}
          >
            Mensuel
          </button>
        </div>
      )}

      <div className="mt-6">
        <span className="text-5xl font-extrabold sm:text-6xl">
          {billing === "yearly"
            ? formatPrice(Math.round(plan.priceEur / 12))
            : formatPrice(plan.priceEur)}€
        </span>
        <span className="text-lg text-[#9CA3AF]"> HT /mois</span>
        {billing === "yearly" && (
          <p className="mt-1 text-sm text-[#9CA3AF]">
            Facturé {formatPrice(plan.priceEur)}€ HT/an
          </p>
        )}
      </div>

      {plan.description && (
        <p className="mt-2 text-sm text-[#9CA3AF]">{plan.description}</p>
      )}
      <p className="mt-1 text-sm text-[#9CA3AF]">
        {billing === "yearly"
          ? `Ou ${formatPrice(monthlyPlan.priceEur)}€ HT/mois sans engagement`
          : "Sans engagement · Annulable à tout moment"}
      </p>

      <button
        onClick={() =>
          (window as any).Calendly?.initPopupWidget({
            url: "https://calendly.com/autoprospect54/call-demo?hide_landing_page_details=1&hide_gdpr_banner=1",
          })
        }
        className="mt-8 inline-block rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-[#0A0A0B] shadow-lg shadow-accent/25 transition-all hover:bg-[#D97706] hover:shadow-accent/40 cursor-pointer"
      >
        Commencer l'essai gratuit
      </button>
    </div>
  );
}
