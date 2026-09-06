import type { ReactNode } from "react";
import { FiShield, FiTag, FiTruck } from "react-icons/fi";

const DEFAULT_HIGHLIGHTS = [
  { icon: <FiTag />, label: "Topdan qiymətlər" },
  { icon: <FiTruck />, label: "Sürətli çatdırılma" },
  { icon: <FiShield />, label: "Etibarlı tərəfdaşlıq" },
];

interface Props {
  eyebrow?: string;
  title: string;
  subtitle: string;
  highlights?: { icon: ReactNode; label: string }[];
}

export default function PageHero({
  eyebrow = "Hürrem B2B",
  title,
  subtitle,
  highlights = DEFAULT_HIGHLIGHTS,
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-brand-sand/60 mb-8">
      <img
        src="/logo-png.png"
        alt=""
        aria-hidden
        className="absolute -right-4 -bottom-8 h-36 sm:h-44 w-auto object-contain opacity-[0.07] pointer-events-none select-none"
      />
      <div className="relative px-6 py-8 sm:px-10 sm:py-9">
        <p className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
          {eyebrow}
        </p>
        <h2 className="text-brand-dark font-bold text-2xl sm:text-3xl leading-tight mb-2 max-w-xl">
          {title}
        </h2>
        <p className="text-brand-muted text-sm sm:text-base max-w-xl mb-5">{subtitle}</p>

        {highlights.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {highlights.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm font-medium text-brand-dark">
                <span className="text-brand-gold text-base">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
