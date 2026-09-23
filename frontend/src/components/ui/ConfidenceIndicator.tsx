export function ConfidenceIndicator({ score }: { score: number }) {
  let colorClass = "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
  if (score >= 90) colorClass = "text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
  else if (score >= 70) colorClass = "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800";

  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Confidence:</span>
      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold border ${colorClass}`}>
        {score}%
      </span>
    </div>
  );
}
