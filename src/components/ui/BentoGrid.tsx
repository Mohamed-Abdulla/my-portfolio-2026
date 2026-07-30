import { cn } from "../../lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto w-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 min-h-[310px] sm:min-h-[380px] md:min-h-[420px] rounded-3xl group/bento hover:shadow-2xl hover:shadow-primary-accent/[0.03] transition duration-300 p-6 sm:p-8 bg-[#090f1d]/45 border border-card-border/60 hover:border-slate-800 justify-between flex flex-col space-y-4 relative overflow-hidden",
        className
      )}
    >
      {/* Decorative hover grid panel glow */}
      <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-linear-to-br from-primary-accent/5 to-accent-teal/5 blur-2xl opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {header}
      
      <div className="group-hover/bento:translate-x-1.5 transition duration-300 ease-out text-left relative z-10">
        <div className="p-2 rounded-xl bg-slate-900/60 border border-card-border w-fit mb-4 text-slate-300 group-hover/bento:border-accent-teal/40 transition-colors">
          {icon}
        </div>
        <div className="font-display font-bold text-white text-lg sm:text-xl mb-2 mt-2 group-hover/bento:text-accent-teal transition-colors">
          {title}
        </div>
        <div className="font-sans font-normal text-slate-400 text-xs sm:text-sm leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};
