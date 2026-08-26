import { avatarColor, initials } from '@/lib/constants';

type Props = {
  name: string;
  colorKey?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-2xl',
};

export function Avatar({ name, colorKey = 'emerald', size = 'md', className = '' }: Props) {
  const c = avatarColor(colorKey);
  return (
    <div
      className={`${sizes[size]} ${c.bg} ${c.text} rounded-full ring-2 ${c.ring} flex items-center justify-center font-display font-semibold shrink-0 ${className}`}
    >
      {initials(name) || '?'}
    </div>
  );
}
