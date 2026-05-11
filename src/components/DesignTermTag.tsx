import { DesignTerm } from '../types';
import { getCategoryStyles, getCategoryLabel } from '../utils';

interface Props {
  term: DesignTerm;
  size?: 'sm' | 'md';
}

export function DesignTermTag({ term, size = 'sm' }: Props) {
  const styles = getCategoryStyles(term.category);
  const sizeClasses = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded border font-medium ${styles.bg} ${styles.text} ${styles.border} ${sizeClasses} transition-all duration-150 hover:shadow-sm`}
    >
      <span className={`w-1 h-1 rounded-full ${styles.dot} flex-shrink-0`} />
      <span className="opacity-50 text-[9px]">{getCategoryLabel(term.category)}</span>
      <span>{term.label}</span>
    </span>
  );
}
