export interface Developer {
  name: string;
  role: string;
  avatar: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  accent: string;
  badge: string;
  badgeText: string;
  nim: string;
  prodi: string;
  university: string;
  bio: string;
  skills: string[];
  socials: DeveloperSocials;
}

export interface DeveloperSocials {
  github: string;
  linkedin: string;
  instagram: string;
  twitter: string;
  email: string;
}

export type SocialType = keyof DeveloperSocials;

export interface Feature {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  color: string;
}

export interface TechStack {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  name: string;
  category: string;
}

export interface Stat {
  num: string;
  label: string;
}

export interface FeatureColorMap {
  bg: string;
  icon: string;
  border: string;
}
