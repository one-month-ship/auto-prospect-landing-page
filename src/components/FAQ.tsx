import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Comment fonctionne l'essai gratuit de 15 jours ?",
    a: "Inscrivez-vous et accédez à toutes les fonctionnalités pendant 15 jours, sans carte bancaire. À la fin de la période, choisissez un plan pour continuer.",
  },
  {
    q: "Est-ce que Auto-Prospect est légal ?",
    a: "Oui. Auto-Prospect consulte les annonces publiques de LeBonCoin et contacte les vendeurs avec des messages personnalisés et respectueux. Nous respectons le RGPD.",
  },
  {
    q: "Quels canaux de contact sont disponibles ?",
    a: "Actuellement, le contact se fait par message vocal automatique (voicemail). Les canaux SMS et WhatsApp sont en cours de développement.",
  },
  {
    q: "Puis-je travailler en équipe ?",
    a: "Oui, Auto-Prospect permet de partager des hunts (recherches) et des prospects entre membres d'une même équipe.",
  },
  {
    q: "Comment sont détectées les nouvelles annonces ?",
    a: "Notre moteur scrute LeBonCoin en continu avec vos critères de recherche et vous alerte dès qu'une nouvelle annonce correspondante est publiée.",
  },
  {
    q: "Puis-je annuler mon abonnement à tout moment ?",
    a: "Oui, vous pouvez annuler votre abonnement à tout moment depuis votre espace client. Aucun engagement, aucun frais caché.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#27272A]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-sm font-medium sm:text-base">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} className="text-[#9CA3AF]" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-[#9CA3AF] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Questions fréquentes
          </h2>
        </div>
        <div className="mt-12">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
