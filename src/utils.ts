import { DesignCategory } from './types';

const categoryStyles: Record<DesignCategory, { bg: string; text: string; border: string; dot: string }> = {
  layout:      { bg: 'bg-sky-50',     text: 'text-sky-700',     border: 'border-sky-200',     dot: 'bg-sky-400' },
  component:   { bg: 'bg-teal-50',    text: 'text-teal-700',    border: 'border-teal-200',    dot: 'bg-teal-400' },
  typography:  { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   dot: 'bg-amber-400' },
  color:       { bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200',    dot: 'bg-rose-400' },
  material:    { bg: 'bg-stone-50',   text: 'text-stone-600',   border: 'border-stone-200',   dot: 'bg-stone-400' },
  hierarchy:   { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' },
  interaction: { bg: 'bg-cyan-50',    text: 'text-cyan-700',    border: 'border-cyan-200',    dot: 'bg-cyan-400' },
  spacing:     { bg: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-200',  dot: 'bg-orange-400' },
};

export function getCategoryStyles(category: DesignCategory) {
  return categoryStyles[category];
}

const categoryLabels: Record<DesignCategory, string> = {
  layout: 'Layout',
  component: 'Component',
  typography: 'Type',
  color: 'Color',
  material: 'Material',
  hierarchy: 'Hierarchy',
  interaction: 'Interaction',
  spacing: 'Spacing',
};

export function getCategoryLabel(category: DesignCategory): string {
  return categoryLabels[category];
}
