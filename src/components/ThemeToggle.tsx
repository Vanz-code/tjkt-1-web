'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;
  const current = theme === 'system' ? resolvedTheme : theme;
  return (
    <button
      aria-label="Ubah tema"
      className="w-9 h-9 rounded-lg border border-border bg-surface hover:bg-surface/70 transition grid place-items-center"
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
    >
      {current === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
