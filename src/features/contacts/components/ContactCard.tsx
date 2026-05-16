import React from "react";
import { Mail } from "lucide-react";

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number; className?: string };

type Props = {
  title: string;
  value: string;
  description: string;
  icon?: React.ComponentType<IconProps>;
  iconClass?: string;
};

const ContactCard: React.FC<Props> = ({ title, value, description, icon: Icon, iconClass }) => {
  const renderValue = () => {
    const v = value || "";
    const lower = title.toLowerCase();

    const linkClass =
      "text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline underline-offset-2 transition-colors break-all leading-snug";

    // Email
    if (v.includes("@") && !v.startsWith("@")) {
      return (
        <a href={`mailto:${v}`} className={linkClass}>
          {v}
        </a>
      );
    }

    // WhatsApp — strip spaces/dashes, use wa.me
    if (v.startsWith("+") || lower.includes("telepon") || lower.includes("whatsapp")) {
      const waNumber = v.replace(/[\s\-]/g, "");
      return (
        <a
          href={`https://wa.me/${waNumber}`}
          target="_blank"
          rel="noreferrer"
          className={linkClass}
        >
          {v}
        </a>
      );
    }

    // Instagram
    if (v.startsWith("@") || lower.includes("instagram")) {
      const handle = v.replace(/^@/, "");
      return (
        <a
          href={`https://instagram.com/${handle}`}
          target="_blank"
          rel="noreferrer"
          className={linkClass}
        >
          {v}
        </a>
      );
    }

    // Plain text (e.g. Lokasi)
    return <span className="text-sm font-semibold text-blue-600 leading-snug">{v}</span>;
  };

  return (
    <div className="group rounded-2xl border border-blue-100 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-blue-100 hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200 p-5 flex flex-col gap-4">
      {/* Icon */}
      <div className="h-11 w-11 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors flex items-center justify-center flex-shrink-0">
        {Icon ? (
          <Icon className={iconClass || "text-sky-500"} size={20} />
        ) : (
          <Mail size={20} className="text-sky-500" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 min-w-0">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</h4>
        <div className="min-w-0">{renderValue()}</div>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ContactCard;