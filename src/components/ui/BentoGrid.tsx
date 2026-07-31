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

import { CardSpotlight } from "./CardSpotlight";

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
        "row-span-1 min-h-[310px] sm:min-h-[380px] md:min-h-[420px] rounded-3xl overflow-hidden",
        className
      )}
    >
      <CardSpotlight className="h-full flex flex-col justify-between">
        {header}
        
        <div className="group-hover/spotlight:translate-x-1.5 transition duration-300 ease-out text-left relative z-10 mt-auto">
          <div className="p-2 rounded-xl bg-slate-900/60 border border-card-border w-fit mb-4 text-slate-350 group-hover/spotlight:border-secondary/40 transition-colors">
            {icon}
          </div>
          <div className="font-display font-bold text-white text-lg sm:text-xl mb-2 mt-2 group-hover/spotlight:text-secondary transition-colors">
            {title}
          </div>
          <div className="font-sans font-normal text-slate-400 text-xs sm:text-sm leading-relaxed">
            {description}
          </div>
        </div>
      </CardSpotlight>
    </div>
  );
};
