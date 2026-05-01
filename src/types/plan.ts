export type TPlan = {
  id: number;
  name: string;
  type: "subscription" | "pack";
  channel: "sms" | "voicemail" | "whatsapp_voice" | null;
  stripePriceId: string;
  priceEur: number;
  quotaPerMonth: number | null;
  overageUnitPrice: number | null;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
};
