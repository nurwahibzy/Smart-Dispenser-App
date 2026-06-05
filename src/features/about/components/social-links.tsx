import { socialIcons } from "@/features/about/constants/social-icons";
import type { SocialType } from "@/features/about/types";

interface SocialLinkProps {
  type: SocialType;
  href: string;
}

export default function SocialLink({ type, href }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={type}
      className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
    >
      {socialIcons[type]}
    </a>
  );
}
