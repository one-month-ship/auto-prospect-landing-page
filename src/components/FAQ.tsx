import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Concrètement, Auto-Prospect c'est quoi ?",
    a: "Auto-Prospect est un assistant de prospection automatisé. Il détecte les annonces de véhicules sur les principaux sites français et contacte les vendeurs particuliers à votre place, par message vocal ou texte personnalisé.",
  },
  {
    q: "Comment fonctionnent les messages envoyés aux vendeurs ?",
    a: "Vous rédigez vos messages personnalisés qui sont envoyés automatiquement à chaque vendeur. L'objectif : les inciter à vous rappeler. Vous pouvez aussi envoyer des messages manuellement pour plus de flexibilité.",
  },
  {
    q: "Je peux cibler précisément les annonces qui m'intéressent ?",
    a: "Absolument. Filtrez par marque, modèle, prix, kilométrage, département, code postal… Par exemple, ciblez uniquement les véhicules au-dessus de 30 000 € ou en dessous de 100 000 km, sur autant de zones géographiques que vous le souhaitez.",
  },
  {
    q: "Qu'est-ce que je dois faire une fois mes critères définis ?",
    a: "Plus rien. Auto-Prospect contacte les vendeurs à votre place en continu. Vous n'avez plus qu'à répondre aux appels des particuliers intéressés.",
  },
  {
    q: "Ma zone de prospection est-elle limitée ?",
    a: "Non, aucune limite. Prospectez sur autant de départements et de codes postaux que vous le souhaitez, partout en France.",
  },
  {
    q: "Les messages sont-ils facturés à l'unité ?",
    a: "Non. Les messages automatiques et manuels sont inclus dans votre abonnement, sans surcoût.",
  },
  {
    q: "Comment fonctionne l'essai gratuit ?",
    a: "Inscrivez-vous et accédez à toutes les fonctionnalités pendant 15 jours, sans engagement. À la fin de la période, choisissez le plan qui vous convient.",
  },
  {
    q: "Puis-je annuler mon abonnement à tout moment ?",
    a: "Oui, si vous êtes sur l'abonnement mensuel, vous pouvez annuler à tout moment et ne serez plus prélevé. Pour l'abonnement annuel, l'engagement court jusqu'à la fin de la période souscrite.",
  },
  {
    q: "Mes paiements sont-ils sécurisés ?",
    a: "Oui, tous les paiements passent par Stripe, plateforme mondialement reconnue qui respecte les plus hauts standards de sécurité.",
  },
  {
    q: "Vous proposez un support client ?",
    a: "Bien sûr. Un chat intégré est à votre disposition pour toute question, et vous pouvez aussi nous joindre par email à tout moment.",
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
