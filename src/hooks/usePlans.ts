import { useState, useEffect } from "react";
import type { TPlan } from "../types/plan";
import { fetchJSON } from "../lib/api";

const FALLBACK_MAIN: TPlan[] = [
  {
    id: 1,
    name: "Starter",
    type: "subscription",
    channel: null,
    stripePriceId: "price_starter",
    priceEur: 4900,
    quotaPerMonth: 50,
    overageUnitPrice: null,
    description: "Idéal pour démarrer",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 2,
    name: "Pro",
    type: "subscription",
    channel: null,
    stripePriceId: "price_pro",
    priceEur: 9900,
    quotaPerMonth: 200,
    overageUnitPrice: null,
    description: "Pour les professionnels",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 3,
    name: "Business",
    type: "subscription",
    channel: null,
    stripePriceId: "price_business",
    priceEur: 19900,
    quotaPerMonth: null,
    overageUnitPrice: null,
    description: "Volume illimité",
    isActive: true,
    sortOrder: 3,
  },
];

const FALLBACK_CHANNEL: TPlan[] = [
  {
    id: 10,
    name: "Pack SMS 100",
    type: "pack",
    channel: "sms",
    stripePriceId: "price_sms_100",
    priceEur: 1500,
    quotaPerMonth: 100,
    overageUnitPrice: null,
    description: "100 crédits SMS",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 11,
    name: "Pack Vocal 100",
    type: "pack",
    channel: "voicemail",
    stripePriceId: "price_vocal_100",
    priceEur: 2000,
    quotaPerMonth: 100,
    overageUnitPrice: null,
    description: "100 crédits messagerie vocale",
    isActive: true,
    sortOrder: 2,
  },
];

export function usePlans() {
  const [mainPlans, setMainPlans] = useState<TPlan[]>(FALLBACK_MAIN);
  const [channelPlans, setChannelPlans] = useState<TPlan[]>(FALLBACK_CHANNEL);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [main, channel] = await Promise.all([
          fetchJSON<TPlan[]>("/api/plans/main"),
          fetchJSON<TPlan[]>("/api/plans/channel"),
        ]);
        if (!cancelled) {
          setMainPlans(main);
          setChannelPlans(channel);
        }
      } catch {
        // keep fallback data
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { mainPlans, channelPlans, loading };
}
