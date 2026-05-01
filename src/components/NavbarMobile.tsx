import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  links: { href: string; label: string }[];
};

export default function NavbarMobile({ links }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="text-text-secondary hover:text-text"
        aria-label="Menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full border-b border-border bg-bg/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1 p-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm text-text-secondary transition-colors hover:bg-card hover:text-text"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-accent px-4 py-3 text-center text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
              >
                Essai gratuit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
