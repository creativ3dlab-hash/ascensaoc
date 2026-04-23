import { cn } from "@/lib/utils";
import logo from "@/assets/logo-optimized.png";

interface LogoProps {
  className?: string;
  withWordmark?: boolean;
}

export const Logo = ({ className, withWordmark = false }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img src={logo} alt="Logo" className="h-9 w-9 object-contain" />
      {withWordmark && (
        <span className="font-display font-semibold text-foreground tracking-wide-2 text-lg">
          ASCENSÃO CRIATIVA
        </span>
      )}
    </div>
  );
};
