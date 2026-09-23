import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={twMerge(clsx("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700", className))}>
      {children}
    </span>
  );
}
