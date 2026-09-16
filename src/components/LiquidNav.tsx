'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const ITEMS = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/members', label: 'Members', icon: '👥' },
  { href: '/gallery', label: 'Gallery', icon: '📷' },
  { href: '/agenda', label: 'Agenda', icon: '📅' },
  { href: '/projects', label: 'Projects', icon: '💻' },
];

export function LiquidNav() {
  const path = usePathname();

  // Cari index yang aktif
  const activeIndex = ITEMS.findIndex((item) =>
    item.href === '/' ? path === '/' : path.startsWith(item.href)
  );

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pt-2 pointer-events-none">
      <div className="relative mx-auto max-w-md rounded-2xl border border-border bg-surface/80 backdrop-blur-xl shadow-2xl shadow-black/30 pointer-events-auto">
        <div className="grid grid-cols-5 relative">
          {ITEMS.map((item, i) => {
            const active = i === activeIndex;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center justify-center py-3 gap-0.5"
              >
                {active && (
                  <motion.div
                    layoutId="liquid-bubble"
                    className="absolute inset-x-2 top-1.5 bottom-1.5 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 text-lg transition-transform ${
                    active ? 'scale-110' : 'scale-100 opacity-60'
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  className={`relative z-10 text-[10px] font-medium transition-colors ${
                    active ? 'text-cyan-400' : 'text-muted'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
