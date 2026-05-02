import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchJSON } from "../lib/api";
import type { TPlan } from "../types/plan";

// ===========================================================================
// MULTI-PLAN DESIGN (commenté — à réactiver quand on aura plusieurs plans)
// ===========================================================================
// import { usePlans } from "../hooks/usePlans";
// import type { TPlan } from "../types/plan";
//
// function formatPrice(cents: number) {
//   return (cents / 100).toFixed(2).replace(".", ",");
// }
//
// function PlanCard({ plan, featured }: { plan: TPlan; featured?: boolean }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4 }}
//       className={`relative flex flex-col rounded-2xl border p-8 ${
//         featured
//           ? "border-accent/50 bg-accent/5 shadow-xl shadow-accent/10"
//           : "border-[#27272A] bg-[#141416]"
//       }`}
//     >
//       {featured && (
//         <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-[#0A0A0B]">
//           Populaire
//         </span>
//       )}
//       <h3 className="text-xl font-bold">{plan.name}</h3>
//       <p className="mt-1 text-sm text-[#9CA3AF]">{plan.description}</p>
//       <div className="mt-6">
//         <span className="text-4xl font-extrabold">{formatPrice(plan.priceEur)}€</span>
//         <span className="text-sm text-[#9CA3AF]">
//           {plan.type === "subscription" ? " /mois" : ""}
//         </span>
//       </div>
//       {plan.quotaPerMonth && (
//         <p className="mt-2 text-sm text-[#9CA3AF]">
//           {plan.quotaPerMonth === -1 ? "Prospects illimités" : `${plan.quotaPerMonth} prospects/mois`}
//         </p>
//       )}
//       {!plan.quotaPerMonth && plan.type === "subscription" && (
//         <p className="mt-2 text-sm text-[#9CA3AF]">Prospects illimités</p>
//       )}
//       <ul className="mt-6 flex-1 space-y-3">
//         <li className="flex items-center gap-2 text-sm">
//           <Check size={16} className="text-accent" /> Recherche automatique
//         </li>
//         <li className="flex items-center gap-2 text-sm">
//           <Check size={16} className="text-accent" /> Détection temps réel
//         </li>
//         <li className="flex items-center gap-2 text-sm">
//           <Check size={16} className="text-accent" /> Pipeline de vente
//         </li>
//         {featured && (
//           <li className="flex items-center gap-2 text-sm">
//             <Check size={16} className="text-accent" /> Support prioritaire
//           </li>
//         )}
//       </ul>
//       <a
//         href="#"
//         className={`mt-8 block rounded-xl py-3 text-center text-sm font-semibold transition-colors ${
//           featured
//             ? "bg-accent text-[#0A0A0B] hover:bg-[#D97706]"
//             : "border border-[#27272A] text-[#F9FAFB] hover:border-[#9CA3AF] hover:bg-[#141416]"
//         }`}
//       >
//         Essai gratuit — 15 jours
//       </a>
//     </motion.div>
//   );
// }
//
// function ChannelCard({ plan }: { plan: TPlan }) {
//   const channelLabels: Record<string, string> = {
//     sms: "SMS",
//     voicemail: "Vocal",
//     whatsapp_voice: "WhatsApp",
//   };
//
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4 }}
//       className="rounded-2xl border border-[#27272A] bg-[#141416] p-6"
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
//             {plan.channel ? channelLabels[plan.channel] ?? plan.channel : "Crédit"}
//           </span>
//           <h4 className="mt-3 text-lg font-semibold">{plan.name}</h4>
//           <p className="mt-1 text-sm text-[#9CA3AF]">{plan.description}</p>
//         </div>
//         <div className="text-right">
//           <span className="text-2xl font-bold">{formatPrice(plan.priceEur)}€</span>
//           {plan.quotaPerMonth && (
//             <p className="text-xs text-[#9CA3AF]">{plan.quotaPerMonth} crédits</p>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// }
//
// -- MULTI-PLAN EXPORT --
// export default function Pricing() {
//   const { mainPlans, channelPlans, loading } = usePlans();
//
//   return (
//     <section id="pricing" className="py-20 sm:py-28">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <span className="text-sm font-semibold uppercase tracking-widest text-accent">
//             Tarifs
//           </span>
//           <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
//             Un plan pour chaque ambition
//           </h2>
//           <p className="mt-4 text-[#9CA3AF]">
//             Tous les plans incluent 15 jours d'essai gratuit. Sans engagement.
//           </p>
//         </div>
//
//         {loading ? (
//           <div className="mt-14 flex justify-center">
//             <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
//           </div>
//         ) : (
//           <>
//             <div
//               className={`mt-14 grid gap-8 ${
//                 mainPlans.length === 3
//                   ? "lg:grid-cols-3"
//                   : mainPlans.length === 2
//                     ? "lg:grid-cols-2 max-w-3xl mx-auto"
//                     : "lg:grid-cols-1 max-w-md mx-auto"
//               }`}
//             >
//               {mainPlans.map((plan, i) => (
//                 <PlanCard
//                   key={plan.id}
//                   plan={plan}
//                   featured={mainPlans.length === 3 ? i === 1 : i === 0}
//                 />
//               ))}
//             </div>
//
//             {channelPlans.length > 0 && (
//               <div className="mt-16">
//                 <h3 className="text-center text-xl font-bold">
//                   Crédits de contact
//                 </h3>
//                 <p className="mt-2 text-center text-sm text-[#9CA3AF]">
//                   Ajoutez des crédits pour contacter les vendeurs
//                 </p>
//                 <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
//                   {channelPlans.map((plan) => (
//                     <ChannelCard key={plan.id} plan={plan} />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </section>
//   );
// }
// ===========================================================================

const FALLBACK_PLAN: TPlan = {
  id: 1,
  name: "Pro",
  type: "subscription",
  channel: null,
  stripePriceId: "price_pro",
  priceEur: 4900,
  quotaPerMonth: null,
  overageUnitPrice: null,
  description: "Toutes les fonctionnalités pour prospecter efficacement",
  isActive: true,
  sortOrder: 1,
};

const FALLBACK_VOCAL_PACKS: TPlan[] = [
  {
    id: 10,
    name: "Pack 100 vocaux",
    type: "pack",
    channel: "voicemail",
    stripePriceId: "price_vocal_100",
    priceEur: 2000,
    quotaPerMonth: 100,
    overageUnitPrice: null,
    description: "100 crédits messagerie vocale",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 11,
    name: "Pack 500 vocaux",
    type: "pack",
    channel: "voicemail",
    stripePriceId: "price_vocal_500",
    priceEur: 8000,
    quotaPerMonth: 500,
    overageUnitPrice: null,
    description: "500 crédits messagerie vocale",
    isActive: true,
    sortOrder: 2,
  },
];

const includes = [
  "Recherches automatiques illimitées",
  "Détection temps réel des annonces",
  "Analyse prix vs marché — repérez les bonnes affaires",
  "Contact vocal automatique",
  "Pipeline de vente (CRM Kanban)",
  "Templates de messages",
  "Travail en équipe",
  "Support prioritaire",
];

function formatPrice(cents: number) {
  const euros = Math.floor(cents / 100);
  const rest = cents % 100;
  return rest === 0 ? `${euros}` : `${euros},${String(rest).padStart(2, "0")}`;
}

export default function Pricing() {
  const [monthlyPlan, setMonthlyPlan] = useState<TPlan>(FALLBACK_PLAN);
  const [yearlyPlan, setYearlyPlan] = useState<TPlan | null>(null);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [vocalPacks, setVocalPacks] = useState<TPlan[]>(FALLBACK_VOCAL_PACKS);
  const [loading, setLoading] = useState(true);

  const plan = billing === "yearly" && yearlyPlan ? yearlyPlan : monthlyPlan;

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetchJSON<{ plans: TPlan[] }>("/api/plans/main"),
      fetchJSON<{ plans: TPlan[] }>("/api/plans/channel").catch(() => ({ plans: [] })),
    ])
      .then(([mainData, channelData]) => {
        if (cancelled) return;
        if (mainData.plans?.length > 0) {
          setMonthlyPlan(mainData.plans[0]);
        }
        if (mainData.plans?.length > 1) {
          setYearlyPlan(mainData.plans[1]);
        }
        const vocal = channelData.plans?.filter((p) => p.channel === "voicemail") ?? [];
        if (vocal.length > 0) {
          setVocalPacks(vocal);
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Tarifs
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Tout inclus. Sans surprise.
          </h2>
          <p className="mt-4 text-[#9CA3AF]">
            Un seul plan, toutes les fonctionnalités. Essayez gratuitement pendant 15 jours.
          </p>

          {/* Toggle mensuel / annuel */}
          {yearlyPlan && (
            <div className="mt-8 inline-flex items-center rounded-full border border-[#27272A] bg-[#141416] p-1">
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
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    billing === "yearly"
                      ? "bg-[#0A0A0B]/30 text-[#0A0A0B]"
                      : "bg-accent/20 text-accent"
                  }`}>
                    -{Math.round(100 - (yearlyPlan.priceEur / (monthlyPlan.priceEur * 12)) * 100)}%
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="mt-14 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mt-14 overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-b from-accent/5 to-transparent p-10 sm:p-12"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/10 blur-[80px]" />

            <div className="relative flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-between">
              {/* Left — price */}
              <div className="text-center sm:text-left">
                <span className="inline-block rounded-full bg-accent px-4 py-1 text-xs font-bold text-[#0A0A0B]">
                  15 jours gratuits
                </span>
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
                    ? ""
                    : "Sans engagement · Annulable à tout moment"}
                </p>
                <button
                  onClick={() => (window as any).Calendly?.initPopupWidget({url:'https://calendly.com/autoprospect54/call-demo?hide_landing_page_details=1&hide_gdpr_banner=1'})}
                  className="mt-8 inline-block rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-[#0A0A0B] shadow-lg shadow-accent/25 transition-all hover:bg-[#D97706] hover:shadow-accent/40 cursor-pointer"
                >
                  Commencer l'essai gratuit
                </button>
              </div>

              {/* Right — features list */}
              <ul className="space-y-4">
                {includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <Check size={18} className="shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* Packs crédits vocaux */}
        {!loading && vocalPacks.length > 0 && (
          <div className="mt-16">
            <h3 className="text-center text-xl font-bold">
              Packs crédits vocaux
            </h3>
            <p className="mt-2 text-center text-sm text-[#9CA3AF]">
              Décrochez plus de deals en contactant les vendeurs directement par vocal
            </p>
            <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
              {vocalPacks.map((pack) => (
                <motion.div
                  key={pack.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl border border-[#27272A] bg-[#141416] p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                        Vocal
                      </span>
                      <h4 className="mt-3 text-lg font-semibold">{pack.name}</h4>
                      <p className="mt-1 text-sm text-[#9CA3AF]">{pack.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold">{formatPrice(pack.priceEur)}€</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
