import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Send } from "lucide-react";
import { useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");

    try {
      const res = await fetch(`${import.meta.env.PUBLIC_WORKER_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Erreur");
      setState("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <section id="contact" className="py-20 sm:py-28">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-green-500/30 bg-green-500/5 p-10 text-center"
          >
            <CheckCircle size={48} className="mx-auto text-green-500" />
            <h3 className="mt-4 text-xl font-bold">Message envoyé !</h3>
            <p className="mt-2 text-sm text-[#9CA3AF]">
              Nous reviendrons vers vous dans les plus brefs délais.
            </p>
            <button
              onClick={() => setState("idle")}
              className="mt-6 text-sm text-accent hover:underline cursor-pointer"
            >
              Envoyer un autre message
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Contact
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Une question ? Écrivez-nous
          </h2>
          <p className="mt-4 text-[#9CA3AF]">
            Notre équipe vous répond sous 24h. Vous pouvez aussi nous écrire
            directement à{" "}
            <a
              href="mailto:contact@auto-prospect.fr"
              className="text-accent hover:underline"
            >
              contact@auto-prospect.fr
            </a>
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          className="mt-10 space-y-5 rounded-2xl border border-[#27272A] bg-[#141416] p-8"
        >
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
              Nom
            </label>
            <input
              id="name"
              type="text"
              required
              maxLength={200}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-[#27272A] bg-[#0A0A0B] px-4 py-2.5 text-sm text-[#F9FAFB] placeholder-[#9CA3AF] outline-none transition-colors focus:border-accent"
              placeholder="Votre nom"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-[#27272A] bg-[#0A0A0B] px-4 py-2.5 text-sm text-[#F9FAFB] placeholder-[#9CA3AF] outline-none transition-colors focus:border-accent"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-1.5 block text-sm font-medium"
            >
              Téléphone{" "}
              <span className="text-[#9CA3AF] font-normal">(optionnel)</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-lg border border-[#27272A] bg-[#0A0A0B] px-4 py-2.5 text-sm text-[#F9FAFB] placeholder-[#9CA3AF] outline-none transition-colors focus:border-accent"
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              maxLength={5000}
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full resize-none rounded-lg border border-[#27272A] bg-[#0A0A0B] px-4 py-2.5 text-sm text-[#F9FAFB] placeholder-[#9CA3AF] outline-none transition-colors focus:border-accent"
              placeholder="Décrivez votre besoin..."
            />
          </div>

          {state === "error" && (
            <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              <AlertCircle size={16} />
              Une erreur est survenue. Réessayez ou écrivez-nous directement.
            </div>
          )}

          <button
            type="submit"
            disabled={state === "sending"}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-[#0A0A0B] transition-colors hover:bg-[#D97706] disabled:opacity-50 cursor-pointer"
          >
            {state === "sending" ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0A0A0B] border-t-transparent" />
            ) : (
              <Send size={16} />
            )}
            {state === "sending" ? "Envoi en cours..." : "Envoyer le message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
