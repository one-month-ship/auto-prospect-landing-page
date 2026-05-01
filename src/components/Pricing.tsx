import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { usePlans } from "../hooks/usePlans";
import type { TPlan } from "../types/plan";

function formatPrice(cents: number) {
  return (cents / 100).toFixed(2).replace(".", ",");
}

function PlanCard({ plan, featured }: { plan: TPlan; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`relative flex flex-col rounded-2xl border p-8 ${
        featured
          ? "border-accent/50 bg-accent/5 shadow-xl shadow-accent/10"
          : "border-[#27272A] bg-[#141416]"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-[#0A0A0B]">
          Populaire
        </span>
      )}
      <h3 className="text-xl font-bold">{plan.name}</h3>
      <p className="mt-1 text-sm text-[#9CA3AF]">{plan.description}</p>
      <div className="mt-6">
        <span className="text-4xl font-extrabold">{formatPrice(plan.priceEur)}€</span>
        <span className="text-sm text-[#9CA3AF]">
          {plan.type === "subscription" ? " /mois" : ""}
        </span>
      </div>
      {plan.quotaPerMonth && (
        <p className="mt-2 text-sm text-[#9CA3AF]">
          {plan.quotaPerMonth === -1 ? "Prospects illimités" : `${plan.quotaPerMonth} prospects/mois`}
        </p>
      )}
      {!plan.quotaPerMonth && plan.type === "subscription" && (
        <p className="mt-2 text-sm text-[#9CA3AF]">Prospects illimités</p>
      )}
      <ul className="mt-6 flex-1 space-y-3">
        <li className="flex items-center gap-2 text-sm">
          <Check size={16} className="text-accent" /> Recherche automatique
        </li>
        <li className="flex items-center gap-2 text-sm">
          <Check size={16} className="text-accent" /> Détection temps réel
        </li>
        <li className="flex items-center gap-2 text-sm">
          <Check size={16} className="text-accent" /> Pipeline de vente
        </li>
        {featured && (
          <li className="flex items-center gap-2 text-sm">
            <Check size={16} className="text-accent" /> Support prioritaire
          </li>
        )}
      </ul>
      <a
        href="#"
        className={`mt-8 block rounded-xl py-3 text-center text-sm font-semibold transition-colors ${
          featured
            ? "bg-accent text-[#0A0A0B] hover:bg-[#D97706]"
            : "border border-[#27272A] text-[#F9FAFB] hover:border-[#9CA3AF] hover:bg-[#141416]"
        }`}
      >
        Essai gratuit — 15 jours
      </a>
    </motion.div>
  );
}

function ChannelCard({ plan }: { plan: TPlan }) {
  const channelLabels: Record<string, string> = {
    sms: "SMS",
    voicemail: "Vocal",
    whatsapp_voice: "WhatsApp",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-[#27272A] bg-[#141416] p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {plan.channel ? channelLabels[plan.channel] ?? plan.channel : "Crédit"}
          </span>
          <h4 className="mt-3 text-lg font-semibold">{plan.name}</h4>
          <p className="mt-1 text-sm text-[#9CA3AF]">{plan.description}</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold">{formatPrice(plan.priceEur)}€</span>
          {plan.quotaPerMonth && (
            <p className="text-xs text-[#9CA3AF]">{plan.quotaPerMonth} crédits</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const { mainPlans, channelPlans, loading } = usePlans();

  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Tarifs
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Choisissez votre plan
          </h2>
          <p className="mt-4 text-[#9CA3AF]">
            Tous les plans incluent 15 jours d'essai gratuit. Sans engagement.
          </p>
        </div>

        {loading ? (
          <div className="mt-14 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : (
          <>
            {/* Main plans */}
            <div
              className={`mt-14 grid gap-8 ${
                mainPlans.length === 3
                  ? "lg:grid-cols-3"
                  : mainPlans.length === 2
                    ? "lg:grid-cols-2 max-w-3xl mx-auto"
                    : "lg:grid-cols-1 max-w-md mx-auto"
              }`}
            >
              {mainPlans.map((plan, i) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  featured={mainPlans.length === 3 ? i === 1 : i === 0}
                />
              ))}
            </div>

            {/* Channel add-ons */}
            {channelPlans.length > 0 && (
              <div className="mt-16">
                <h3 className="text-center text-xl font-bold">
                  Crédits de contact
                </h3>
                <p className="mt-2 text-center text-sm text-[#9CA3AF]">
                  Ajoutez des crédits pour contacter les vendeurs
                </p>
                <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
                  {channelPlans.map((plan) => (
                    <ChannelCard key={plan.id} plan={plan} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
