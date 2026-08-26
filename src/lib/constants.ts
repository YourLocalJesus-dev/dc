export const AVATAR_COLORS: Record<
  string,
  { bg: string; ring: string; text: string; soft: string }
> = {
  emerald: {
    bg: 'bg-sage-500',
    ring: 'ring-sage-300',
    text: 'text-sage-50',
    soft: 'bg-sage-100',
  },
  saffron: {
    bg: 'bg-saffron-500',
    ring: 'ring-saffron-300',
    text: 'text-saffron-50',
    soft: 'bg-saffron-100',
  },
  terracotta: {
    bg: 'bg-terracotta-500',
    ring: 'ring-terracotta-300',
    text: 'text-terracotta-50',
    soft: 'bg-terracotta-100',
  },
  teal: {
    bg: 'bg-teal-500',
    ring: 'ring-teal-300',
    text: 'text-teal-50',
    soft: 'bg-teal-100',
  },
  plum: {
    bg: 'bg-plum-500',
    ring: 'ring-plum-300',
    text: 'text-plum-50',
    soft: 'bg-plum-100',
  },
  ink: {
    bg: 'bg-ink-700',
    ring: 'ring-ink-300',
    text: 'text-ink-50',
    soft: 'bg-ink-100',
  },
};

export const COLOR_KEYS = Object.keys(AVATAR_COLORS);

export function avatarColor(key: string) {
  return AVATAR_COLORS[key] ?? AVATAR_COLORS.emerald;
}

export function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export const CATEGORIES = [
  'Design',
  'Music',
  'Photography',
  'Writing',
  'Cooking',
  'Crafts',
  'Technology',
  'Languages',
  'Wellness',
  'Business',
  'General',
] as const;

export type Category = (typeof CATEGORIES)[number];
